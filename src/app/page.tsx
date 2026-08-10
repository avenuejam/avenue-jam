import Link from "next/link";
import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { ProgramCard } from "@/components/ProgramCard";
import { StatCard } from "@/components/StatCard";
import { CivicIcon, HumanRightsIcon, LegalIcon } from "@/components/icons";
import { getActiveChapters } from "@/lib/data/chapters";
import { getLatestNews } from "@/lib/data/news";
import { getUpcomingEvents } from "@/lib/data/events";
import { DONATIONS_LIVE, ORG_MISSION, ORG_MISSION_SECONDARY, PARTNERS } from "@/lib/constants";

export default async function HomePage() {
  const [chapters, news, events] = await Promise.all([
    getActiveChapters(),
    getLatestNews(3),
    getUpcomingEvents(3),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-500">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 70%, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/seal-white.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 hidden h-[360px] w-[360px] -translate-y-1/2 opacity-90 sm:block lg:right-8 lg:h-[520px] lg:w-[520px]"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-white">
              A National Youth-Led Nonprofit
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
              Educating the next generation of civic and human rights leaders.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white sm:text-xl">
              A youth-led, nonpartisan nonprofit delivering civic, legal, and human rights
              education to America&apos;s youth through a national, school-by-school chapter
              model.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {DONATIONS_LIVE && (
                <Button href="/donate" variant="onDarkOutline" size="lg">
                  Donate
                </Button>
              )}
              <Button href="/chapters/start" variant="onDarkOutline" size="lg">
                Start a Chapter
              </Button>
              <Button href="/get-involved" variant="onDarkOutline" size="lg">
                Join AVENUE JAM
              </Button>
              <Button href="/partner" variant="onDarkOutline" size="lg">
                Become a Partner
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission statement */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          <SectionHeading eyebrow="Our Mission" title="Nonpartisan education. Real civic power." />
          <div className="space-y-4 text-lg leading-relaxed text-neutral-600 lg:col-span-2">
            <p>{ORG_MISSION}</p>
            <p>{ORG_MISSION_SECONDARY}</p>
          </div>
        </div>
      </Section>

      {/* Featured programs */}
      <Section tone="neutral">
        <SectionHeading
          eyebrow="What We Do"
          title="Three units. One curriculum."
          description="Every AVENUE JAM chapter builds its work around our national curriculum."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <ProgramCard
            icon={<CivicIcon />}
            title="Civic Education"
            description="Understanding government, democracy, citizenship, and how to participate meaningfully in public life."
            href="/programs/civic-education"
          />
          <ProgramCard
            icon={<HumanRightsIcon />}
            title="Human Rights Education"
            description="Learning human rights principles and international standards, and applying them locally."
            href="/programs/human-rights-education"
          />
          <ProgramCard
            icon={<LegalIcon />}
            title="Legal Rights Literacy"
            description="Understanding legal systems, individual rights and responsibilities, and how to access justice."
            href="/programs/legal-rights-literacy"
          />
        </div>
      </Section>

      {/* Chapter model overview */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="How We're Organized"
              title="A national network of school-based chapters"
              description="Students establish AVENUE JAM chapters school by school, operating under shared national standards, curriculum, and branding — with the flexibility to serve their own school's community."
            />
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: "Curriculum",
                  body: "AVENUE JAM develops a national educational framework across three units: civic education, human rights education, and legal rights literacy.",
                },
                {
                  title: "Leadership",
                  body: "A national executive structure coordinates the organization, supported by the National Executive Board, Central Operations, geographic leadership, and chapter leadership.",
                },
                {
                  title: "Chapters",
                  body: "Student chapters bring the curriculum to life primarily through peer-based discussions, occasional guest speakers, educational events, and youth-led engagement.",
                },
                {
                  title: "Training",
                  body: "Students receive leadership and organizational guidance so chapters can operate consistently while developing meaningful local youth leadership.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <dt className="font-semibold text-brand-950">{item.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-neutral-600">{item.body}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/chapters/start">Start a Chapter</Button>
              <Button href="/chapters" variant="outline">
                View Chapter Directory
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Featured Chapters
            </p>
            {chapters.length > 0 ? (
              <ul className="mt-4 divide-y divide-neutral-200">
                {chapters.slice(0, 4).map((chapter) => (
                  <li key={chapter.id} className="flex items-center justify-between py-3">
                    <div>
                      <Link
                        href={`/chapters/${chapter.slug}`}
                        className="font-medium text-brand-900 hover:underline"
                      >
                        {chapter.name}
                      </Link>
                      <p className="text-sm text-neutral-500">
                        {chapter.city}, {chapter.state}
                      </p>
                    </div>
                    <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-800">
                      {chapter.region}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-brand-200 bg-white p-6 text-center">
                <p className="text-sm text-neutral-600">
                  No chapters have been chartered yet — applications are open.
                </p>
                <Button href="/chapters/start" size="md" className="mt-4">
                  Start the First Chapter
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* At a glance */}
      <Section tone="dark">
        <SectionHeading eyebrow="At a Glance" title="A national organization from day one" center light />
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard value="2026" label="Founded" />
          <StatCard value="3" label="Curriculum Units" />
          <StatCard value="NYC" label="National HQ" />
          <StatCard value="3" label="States" />
          <StatCard value="8" label="Special Regions" />
        </div>
      </Section>

      {/* News / Events */}
      <Section tone="neutral">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Stay Connected" title="News & upcoming events" />
          <div className="flex gap-3">
            <Button href="/news" variant="outline" size="md">
              All News
            </Button>
            <Button href="/events" variant="outline" size="md">
              All Events
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-600">Latest News</h3>
            {news.length > 0 ? (
              news.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="block rounded-xl border border-neutral-200 bg-white p-5 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {article.category}
                  </p>
                  <h4 className="mt-1.5 font-semibold text-brand-950">{article.title}</h4>
                  <p className="mt-1.5 text-sm text-neutral-600 line-clamp-2">{article.excerpt}</p>
                </Link>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-6 text-center text-sm text-neutral-500">
                No news published yet. Check back soon.
              </div>
            )}
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Upcoming Events
            </h3>
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="rounded-xl border border-neutral-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {event.scope === "NATIONAL"
                      ? "National Event"
                      : event.scope === "REGIONAL"
                      ? "Regional Event"
                      : "Chapter Event"}
                  </p>
                  <h4 className="mt-1.5 font-semibold text-brand-950">{event.title}</h4>
                  <p className="mt-1.5 text-sm text-neutral-600">
                    {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(event.startsAt)}{" "}
                    · {event.location}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-6 text-center text-sm text-neutral-500">
                No events scheduled yet. Check back soon.
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Partners */}
      <Section>
        <SectionHeading
          eyebrow="Our Partners"
          title="There are no competitors in education. Working alongside every non-partisan organization and community we can, for a more informed American youth."
          center
        />
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex h-24 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/partner" variant="outline">
            Become a Partner
          </Button>
        </div>
      </Section>

      {/* Donation CTA */}
      {DONATIONS_LIVE && (
        <Section tone="dark" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Help us reach the next generation of leaders.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
            Your gift helps AVENUE JAM develop educational resources, support chapter
            programming, provide leadership training, and expand access to civic, human rights,
            and legal rights education for young people.
          </p>
          <div className="mt-8">
            <Button href="/donate" variant="secondary" size="lg">
              Donate Now
            </Button>
          </div>
        </Section>
      )}
    </>
  );
}
