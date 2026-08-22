export const ORG_NAME = "AVENUE JAM";
export const ORG_LEGAL_NAME = "AVENUE JAM CORPORATION";
export const ORG_TAGLINE = "Civic Education. Legal Rights Literacy. Human Rights Education.";
export const ORG_MISSION =
  "AVENUE JAM is a youth-led, accredited, nonpartisan, not-for-profit organization, focused on curating and delivering educational programming to America's youth, through a proprietary chapter-based model. Our work centers on human rights education, basic legal rights literacy, and civic education and awareness, equipping young people with the knowledge and tools needed to understand their rights, responsibilities, and role in public life.";
export const ORG_MISSION_SECONDARY =
  "Through grassroots, on-the-ground education and in-school curriculum delivery, AVENUE JAM supports informed participation, critical thinking, and youth empowerment, from a completely non-partisan perspective.";

export const ORG_501C3_RECOGNIZED_DATE = "August 14, 2026";
export const ORG_EIN = "41-4501295";

export const ORG_LEGAL_BLURB =
  'The AVENUE JAM CORPORATION, D.B.A. "AVENUE JAM" is a recognized 501(c)(3) tax-exempt nonprofit corporation in the State of Delaware, in and for the pursuance of the public knowledge within the context of nonpartisan civics, legal rights, and humanities. Any displayed "partnership" with political candidates, campaigns, or otherwise partisan entities ONLY constitutes commendation for their demonstrated general support of our aforementioned purpose. It does NOT and will never constitute support for election or otherwise partisan endorsement.';

export const ORG_CONTACT = {
  email: "hello@avenuejam.com",
  instagram: "https://instagram.com/avenuejam",
  getInvolvedFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSce0QLOVmqbE9Q5D3YrFDoiGB6L8UJv_2iFdSM9eFZHXR64Gw/viewform",
};

export const ZEFFY_FORM_URL = "https://www.zeffy.com/embed/donation-form/avenue-jam";

// Flips on automatically once ZEFFY_FORM_URL above is set to a real Zeffy
// form URL. Until then, the /donate page shows a "coming soon" message and
// every "Donate" button/link sitewide is hidden — nothing else to update.
export const DONATIONS_LIVE = !ZEFFY_FORM_URL.includes("REPLACE-WITH-ZEFFY-FORM-ID");

export const PEOPLE: {
  name: string;
  role: string;
  department: string;
  explanation: string;
  bio?: string;
  photo?: string;
}[] = [
  {
    name: "Haïm Marrache",
    role: "Executive Director",
    department: "Office of the Executive Director",
    explanation:
      "Leads AVENUE JAM's national organization, strategic direction, and executive operations.",
    photo: "/team/haim-marrache.jpg",
  },
  {
    name: "Maurits Acosta",
    role: "Lead Discretionary Advisor",
    department: "Office of the National Executive Board",
    explanation:
      "Provides senior advisory support and guidance to the organization's leadership.",
    photo: "/team/maurits-acosta.jpg",
  },
  {
    name: "Alita Eagleman",
    role: "Executive Board Member",
    department: "Office of the National Executive Board",
    explanation:
      "Serves in her designated national executive leadership capacity within AVENUE JAM.",
    photo: "/team/alita-eagleman.jpg",
  },
  {
    name: "Charani Vejandla",
    role: "Texas State Lead, Executive Board Member",
    department: "Office of the National Executive Board",
    explanation:
      "Serves in her designated national executive leadership capacity within AVENUE JAM, representing the State of Texas within the national organizational structure and contributing to the National Executive Board.",
    photo: "/team/charani-vejandla.jpg",
  },
  {
    name: "Gretchen Fletcher",
    role: "Executive Board Member",
    department: "Office of the National Executive Board",
    explanation:
      "Serves on the Executive Board and acts as a responsible adult representative for organizational banking and 501(c)(3) representation.",
    photo: "/team/gretchen-fletcher.jpg",
  },
];

// Currently unfilled national positions per the Directory's Department of
// National Central Operations and Geographic Leadership offices. Update this
// list directly as positions are filled or new ones open.
export const OPEN_POSITIONS = [
  "Director of National Central Operations",
  "Curriculum Liaison",
  "Communications Officer",
  "Fundraising Officer",
  "Recruitment Officer",
  "Special Regional Coordinator",
  "State Lead",
  "Other / Not Listed",
];

export const PARTNERS = [
  { name: "Amnesty International", logo: "/partners/amnesty-international.jpg" },
  { name: "Virtutem Populo", logo: "/partners/virtutem-populo.png" },
  { name: "City of Miami, Florida", logo: "/partners/city-of-miami.png" },
  { name: "Gulliver Prep", logo: "/partners/gulliver-prep.png" },
];

export const NAV_LINKS: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About AVENUE JAM", href: "/about" },
      { label: "Our Story", href: "/about/our-story" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Directory", href: "/about/directory" },
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
];

export const FOOTER_ORG_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Chapter Directory", href: "/chapters" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];
