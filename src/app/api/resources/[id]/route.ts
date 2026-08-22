import type { NextRequest } from "next/server";
import { get } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requireResourceLibrarySession } from "@/lib/auth";

/**
 * The actual access-control boundary for lesson files: Lesson.fileUrl (the
 * private Vercel Blob URL) never reaches the client. This route checks the
 * session, then fetches the blob server-side (authenticated via
 * BLOB_READ_WRITE_TOKEN) and streams it back — a copied link to this route
 * still requires being logged in with a resource-library role, and the blob
 * itself can't be read without the token even if the URL leaked.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireResourceLibrarySession();

  const { id } = await params;
  const lesson = await prisma.lesson.findUnique({ where: { id } });
  if (!lesson) {
    return new Response("Not found", { status: 404 });
  }

  const result = await get(lesson.fileUrl, { access: "private" });
  if (!result || !result.stream) {
    return new Response("File unavailable", { status: 502 });
  }

  const mode = request.nextUrl.searchParams.get("mode");
  const disposition = mode === "view" ? "inline" : "attachment";
  const safeFileName = lesson.fileName.replace(/"/g, "");

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Content-Disposition": `${disposition}; filename="${safeFileName}"`,
    },
  });
}
