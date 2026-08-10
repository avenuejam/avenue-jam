import Link from "next/link";
import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { ProgramCard } from "@/components/ProgramCard";
import { StatCard } from "@/components/StatCard";
import { CivicIcon, HumanRightsIcon, LegalIcon, LeadershipIcon } from "@/components/icons";
import { getActiveChapters } from "@/lib/data/chapters";
import { getLatestNews } from "@/lib/data/news";
import { getUpcomingEvents } from "@/lib/data/events";
import { ORG_MISSION } from "@/lib/constants";

export default async function HomePage() {
  const [chapters, news, events] = await Promise.all([
    getActiveChapters(),
    getLatestNews(3),
    getUpcomingEvents(3),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 70%, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <Container className="relative py-24 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-100">
            A National Youth-Led Nonprofit
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
            Educating the next generation of civic and human rights leaders.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">
            {ORG_MISSION}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/donate" variant="secondary" size="lg">
              Donate
            </Button>
            <Button href="/chapters/start" variant="onDark" size="lg">
              Start a Chapter
            </Button>
            <Button href="/get-involved" variant="onDarkOutline" size="lg">
              Join AVENUE JAM
            </Button>
            <Button href="/partner" variant="onDarkOutline" size="lg">
              Become a Partner
            </Button>
          </div>
        </Container>
      </section>

      {/* Mission statement */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          <SectionHeading eyebrow="Our Mission" title="Nonpartisan education. Real civic power." />
          <p className="text-lg leading-relaxed text-neutral-600 lg:col-span-2">
            AVENUE JAM believes every young person deserves to understand how government works, what
            rights they hold, and how to use their voice effectively. We build that understanding
            through student-led chapters, national curriculum, and hands-on leadership
            opportunities — reaching students where they already are: in their schools and
            communities.
          </p>
        </div>
      </Section>

      {/* Featured programs */}
      <Section tone="neutral">
        <SectionHeading
          eyebrow="What We Do"
          title="Four programs. One mission."
          description="Every AVENUE JAM chapter builds its work around our national program areas."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          <ProgramCard
            icon={<LeadershipIcon />}
            title="Youth Leadership"
            description="Developing the next generation of student leaders through mentorship and hands-on practice."
            href="/programs/youth-leadership"
          />
        </div>
      </Section>

      {/* Chapter model overview */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="How We're Organized"
              title="A national network of student-led chapters"
              description="Students and communities establish local AVENUE JAM chapters that operate under shared national standards, curriculum, and branding — with the flexibility to serve their own community's needs."
            />
            <ul className="mt-6 space-y-3 text-neutral-700">
              {[
                "National curriculum and program standards",
                "Elected chapter officers and a faculty/community advisor",
                "Local programming, events, and community partnerships",
                "Ongoing training and support from national staff",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/chapters/start">Start a Chapter</Button>
              <Button href="/chapters" variant="outline">
                View Chapter Directory
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-navy-600">
              Featured Chapters
            </p>
            <ul className="mt-4 divide-y divide-neutral-200">
              {chapters.slice(0, 4).map((chapter) => (
                <li key={chapter.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link
                      href={`/chapters/${chapter.slug}`}
                      className="font-medium text-navy-900 hover:underline"
                    >
                      {chapter.name}
                    </Link>
                    <p className="text-sm text-neutral-500">
                      {chapter.city}, {chapter.state}
                    </p>
                  </div>
                  <span className="rounded-full bg-navy-100 px-2.5 py-1 text-xs font-semibold text-navy-800">
                    {chapter.region}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Impact statistics */}
      <Section tone="navy">
        <SectionHeading
          eyebrow="Our Impact"
          title="Growing every year"
          center
        />
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <StatCard value="50+" label="Active Chapters" />
          <StatCard value="12,000+" label="Students Reached" />
          <StatCard value="4" label="National Program Areas" />
          <StatCard value="30" label="States Represented" />
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
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-600">Latest News</h3>
            {news.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="block rounded-xl border border-neutral-200 bg-white p-5 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {article.category}
                </p>
                <h4 className="mt-1.5 font-semibold text-navy-950">{article.title}</h4>
                <p className="mt-1.5 text-sm text-neutral-600 line-clamp-2">{article.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-600">
              Upcoming Events
            </h3>
            {events.map((event) => (
              <div key={event.id} className="rounded-xl border border-neutral-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">
                  {event.scope === "NATIONAL"
                    ? "National Event"
                    : event.scope === "REGIONAL"
                    ? "Regional Event"
                    : "Chapter Event"}
                </p>
                <h4 className="mt-1.5 font-semibold text-navy-950">{event.title}</h4>
                <p className="mt-1.5 text-sm text-neutral-600">
                  {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(event.startsAt)} ·{" "}
                  {event.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Partners */}
      <Section>
        <SectionHeading
          eyebrow="Our Partners"
          title="Working alongside schools, universities, and civic organizations"
          center
        />
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {["School Districts", "Universities", "Legal Aid Organizations", "Civic Foundations"].map(
            (partner) => (
              <div
                key={partner}
                className="flex h-24 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 px-4 text-center text-sm font-medium text-neutral-500"
              >
                {partner}
              </div>
            ),
          )}
        </div>
        <div className="mt-8 text-center">
          <Button href="/partner" variant="outline">
            Become a Partner
          </Button>
        </div>
      </Section>

      {/* Donation CTA */}
      <Section tone="navy" className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Help us reach the next generation of leaders.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-navy-100">
          Your gift funds curriculum development, chapter grants, and national training for student
          leaders across the country.
        </p>
        <div className="mt-8">
          <Button href="/donate" variant="secondary" size="lg">
            Donate Now
          </Button>
        </div>
      </Section>
    </>
  );
}
