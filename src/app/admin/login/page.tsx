import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Portal",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16">
      <h1 className="text-2xl font-bold text-neutral-900">Portal</h1>
      <p className="mt-1 text-sm text-neutral-500">Sign in to the AVENUE JAM portal.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
