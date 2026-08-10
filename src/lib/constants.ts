export const ORG_NAME = "AVENUE JAM";
export const ORG_LEGAL_NAME = "AVENUE JAM CORPORATION";
export const ORG_TAGLINE = "Civic Education. Legal Rights. Human Rights. Youth Leadership.";
export const ORG_MISSION =
  "AVENUE JAM advances civic education, legal rights literacy, human rights education, and youth leadership through accessible, nonpartisan educational programming.";

export const ZEFFY_FORM_URL = "https://www.zeffy.com/embed/donation-form/REPLACE-WITH-ZEFFY-FORM-ID";

export const NAV_LINKS: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About AVENUE JAM", href: "/about" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "History", href: "/about/history" },
      { label: "Impact", href: "/about/impact" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Civic Education", href: "/programs/civic-education" },
      { label: "Human Rights Education", href: "/programs/human-rights-education" },
      { label: "Legal Rights Literacy", href: "/programs/legal-rights-literacy" },
      { label: "Youth Leadership", href: "/programs/youth-leadership" },
    ],
  },
  {
    label: "Chapters",
    href: "/chapters",
    children: [
      { label: "Chapter Directory", href: "/chapters" },
      { label: "Start a Chapter", href: "/chapters/start" },
    ],
  },
  {
    label: "News & Events",
    href: "/news",
    children: [
      { label: "News", href: "/news" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Join AVENUE JAM", href: "/get-involved" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Become a Partner", href: "/partner" },
      { label: "Request a Speaker", href: "/speakers" },
    ],
  },
];

export const FOOTER_PROGRAM_LINKS = [
  { label: "Civic Education", href: "/programs/civic-education" },
  { label: "Human Rights Education", href: "/programs/human-rights-education" },
  { label: "Legal Rights Literacy", href: "/programs/legal-rights-literacy" },
  { label: "Youth Leadership", href: "/programs/youth-leadership" },
];

export const FOOTER_ORG_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Chapter Directory", href: "/chapters" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];
