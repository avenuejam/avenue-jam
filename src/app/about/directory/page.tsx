import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { EmployeeDirectory } from "@/components/EmployeeDirectory";

export const metadata: Metadata = {
  title: "Directory",
  description: "AVENUE JAM's leadership directory and national organizational structure.",
};

const departments: {
  office: string;
  leadership: string;
  description: string;
  positions?: string[];
  note?: string;
}[] = [
  {
    office: "Office of the Executive Director",
    leadership: "Executive Director",
    description:
      "The chief executive office of AVENUE JAM. It provides overall organizational leadership, executes the policies and strategic direction of the organization, coordinates the national structure, and oversees the organization's growth and development.",
    positions: ["Executive Director"],
  },
  {
    office: "Office of the National Executive Board",
    leadership: "Executive Board Members",
    description:
      "Provides executive governance, oversight, institutional guidance, and strategic leadership for AVENUE JAM. Executive Board Members may also hold specific portfolios or additional organizational responsibilities assigned by the organization.",
    note: "Additional portfolio titles may be assigned to individual Executive Board Members as determined by AVENUE JAM.",
  },
];

const ncodRoles = [
  {
    title: "Director of National Central Operations",
    body: "Leads the officers of the Department of National Central Operations and reports on departmental activity to the Executive Director and Executive Board.",
  },
  {
    title: "Curriculum Liaison",
    body: "Serves as the chief correspondent between chapter leadership and the national organization, maintaining communication through the applicable State Lead or Special Regional Coordinator and ultimately to the National Executive Board.",
  },
  {
    title: "Communications Officer",
    body: "Coordinates AVENUE JAM's national communications, public messaging, announcements, written materials, and communications standards across the organization.",
  },
  {
    title: "Fundraising Officer",
    body: "Supports AVENUE JAM's fundraising operations, donor outreach, fundraising initiatives, sponsorship development, and other approved resource-development activities.",
  },
  {
    title: "Recruitment Officer",
    body: "Coordinates national recruitment efforts for volunteers, officers, chapter leaders, and other organizational personnel while supporting the development of a strong national leadership pipeline.",
  },
];

const geoOffices = [
  {
    office: "Office of the Special Regional Coordinator",
    leadership: "Special Regional Coordinators",
    description:
      "Provides geographic coordination for regions that require a structure beyond the standard state-level model, or that have been designated as special regions by the national organization. Special Regional Coordinators connect the national organization with chapters and local leadership within their assigned region and ensure that national standards are implemented while allowing appropriate local adaptation.",
    note: "A Special Regional Coordinator may oversee a designated metropolitan area, multi-state region, territory, or other special geographic area established by AVENUE JAM.",
  },
  {
    office: "Office of the State Lead",
    leadership: "State Leads",
    description:
      "Provides state-level geographic leadership. State Leads coordinate chapters within their assigned state, support chapter development, communicate national guidance, and help ensure consistency with AVENUE JAM's organizational standards.",
    note: "State Leads may coordinate directly with Special Regional Coordinators when their state falls within a designated special region.",
  },
];

const hierarchy = [
  "Office of the Executive Director",
  "Office of the National Executive Board",
  "Department of National Central Operations",
  "Office of the Special Regional Coordinator / Office of the State Lead",
  "AVENUE JAM Student Chapters",
];

export default function DirectoryPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Directory"
        description="Every listed role links to a short explanation of what that position is responsible for. As AVENUE JAM's national staff and geographic leadership grow, they'll appear here too."
      />

      <Section>
        <EmployeeDirectory />
      </Section>

      <Section tone="neutral">
        <SectionHeading eyebrow="National Structure" title="Department Groupings" />
        <div className="mt-8 space-y-6">
          {departments.map((dept) => (
            <div key={dept.office} className="rounded-xl border border-neutral-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                Leadership: {dept.leadership}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-brand-950">{dept.office}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{dept.description}</p>
              {dept.positions && (
                <ul className="mt-4 space-y-1 text-sm text-neutral-700">
                  {dept.positions.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
              {dept.note && <p className="mt-3 text-xs text-neutral-500">{dept.note}</p>}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Central Operations"
          title="Department of National Central Operations"
          description="AVENUE JAM's central functional department. It coordinates the organization's national systems and supports curriculum, communications, fundraising, recruitment, and other core operational functions under the direction of the Executive Director and in coordination with the National Executive Board."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ncodRoles.map((role) => (
            <div key={role.title} className="rounded-xl border border-neutral-200 p-6">
              <h3 className="font-semibold text-brand-950">{role.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{role.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          These are the core Department of National Central Operations positions. Additional
          positions may be created as AVENUE JAM&apos;s operational needs develop.
        </p>
      </Section>

      <Section tone="neutral">
        <SectionHeading eyebrow="Geographic Leadership" title="Regional Offices" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {geoOffices.map((office) => (
            <div key={office.office} className="rounded-xl border border-neutral-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                Leadership: {office.leadership}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-brand-950">{office.office}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{office.description}</p>
              <p className="mt-3 text-xs text-neutral-500">{office.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Org Chart" title="Directory Hierarchy" />
        <div className="mx-auto mt-8 max-w-xl">
          <ol className="space-y-0">
            {hierarchy.map((level, i) => (
              <li key={level}>
                <div className="rounded-lg border border-neutral-200 bg-white px-5 py-3 text-center font-medium text-brand-950">
                  {level}
                </div>
                {i < hierarchy.length - 1 && (
                  <div className="flex justify-center py-1 text-brand-400" aria-hidden="true">
                    ↓
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-neutral-600">
          The structure is intentionally centralized at the national level while maintaining
          geographic leadership and meaningful youth ownership at the chapter level. Central
          Operations provides functional support, while Special Regional Coordinators and State
          Leads provide geographic coordination.
        </p>
      </Section>
    </>
  );
}
