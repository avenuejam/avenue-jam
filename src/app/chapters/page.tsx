import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { ChapterDirectory } from "@/components/ChapterDirectory";
import { getChapters } from "@/lib/data/chapters";

export const metadata: Metadata = {
  title: "Chapter Directory",
  description: "Find an AVENUE JAM chapter near you.",
};

export default async function ChaptersPage() {
  const chapters = await getChapters();

  return (
    <>
      <PageHero
        eyebrow="Chapter Network"
        title="Chapter Directory"
        description="AVENUE JAM chapters operate school by school nationwide, each led by student officers under national standards and guidance."
      >
        <div className="mt-8">
          <Button href="/chapters/start" variant="secondary" size="lg">
            Start a Chapter
          </Button>
        </div>
      </PageHero>

      <Section>
        <ChapterDirectory chapters={chapters} />
      </Section>
    </>
  );
}
