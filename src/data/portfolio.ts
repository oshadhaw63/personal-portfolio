import type { Achievement, Activity, Certification, EducationItem, Project, SkillGroup } from "@/types/portfolio";

export const profile = {
  name: "Oshadha Wijayarathne",
  role: "Software Engineering Undergraduate",
  email: "oshadhaw.23@cse.mrt.ac.lk",
  location: "Galle, Sri Lanka",
  university: "University of Moratuwa",
  degree: "B.Sc. Engineering (Hons) in Computer Science & Engineering",
  github: "https://github.com/oshadhaw63",
  githubHandle: "oshadhaw63",
  linkedin: "https://www.linkedin.com/in/oshadha-wijayarathne-2a631734a/",
  linkedinHandle: "oshadha-wijayarathne",
  cv: "/oshadha-wijayarathne-cv.pdf",
  intro:
    "I'm a Computer Science and Engineering undergraduate at the University of Moratuwa. I build backend services, full-stack products, and developer tools, and I'm looking for a software engineering internship.",
  availability: "Open to software engineering internships",
  focus: "Backend services, full-stack products, and developer tools",
  interests: "State transitions, service boundaries, and dependency tracing",
  about: [
    "I like the parts of engineering where correctness meets product behaviour: modelling state transitions, drawing sensible service boundaries, tracing dependencies, and making a complicated workflow understandable to the person using it.",
    "Most of my work so far has been in university projects and team builds, ranging from a C++ matching engine to an authenticated mobile app and an operations backend. Each project page here says what is actually implemented, what is not, and which parts were mine.",
    "I am looking for an internship where I can contribute to maintainable software and learn from people who care about it.",
  ],
} as const;

export const projects: Project[] = [
  {
    slug: "repolens",
    title: "RepoLens",
    kind: "Developer tooling",
    summary: "An explorer that turns a JavaScript or TypeScript repository into a searchable dependency map.",
    overview:
      "Reading an unfamiliar codebase usually means tracing imports and symbols by hand. RepoLens parses the source with the TypeScript Compiler API and renders the result as an interactive graph, with search across files and symbols, a suggested reading order for new contributors, and simple risk signals.",
    role: "Solo project",
    status: "In progress",
    technologies: ["Next.js", "TypeScript", "TypeScript Compiler API", "React Flow", "Tailwind CSS"],
    repository: "https://github.com/oshadhaw63/RepoLens",
    highlights: [
      "Scans a local workspace or a public GitHub repository for JavaScript and TypeScript files.",
      "Extracts imports, exports, functions, and classes from the AST instead of matching text.",
      "Builds folder and import edges, then renders the graph with React Flow.",
      "Ranks search results across filenames, paths, summaries, symbols, and imports.",
      "Suggests a six-file reading path and flags files with rule-based risk signals.",
    ],
    notes: [
      "GitHub scans are unauthenticated and capped at the first 80 supported files.",
      "Import resolution covers relative paths and the @/ alias, not every tsconfig path mapping.",
      "Risk scoring is a set of transparent heuristics, not semantic complexity analysis.",
    ],
  },
  {
    slug: "uniattend",
    title: "UniAttend",
    kind: "Mobile & identity",
    summary: "A React Native student attendance app where I own the login and session layer.",
    overview:
      "UniAttend is an ongoing university attendance platform built by a team of four. I set up the Expo mobile app and built the identity layer: OpenID Connect login with PKCE, secure token storage, session restoration and refresh, logout, and route protection for student screens.",
    role: "Team of 4",
    status: "In progress",
    technologies: ["React Native", "Expo", "TypeScript", "Keycloak", "OpenID Connect", "PostgreSQL", "GitHub Actions"],
    repository: "https://github.com/Smart-Attendance-Group-27/smart-attendance-platform",
    highlights: [
      "Expo Router app foundation with shared UI components and typed feature services.",
      "Keycloak login using the Authorization Code Flow with PKCE.",
      "Token persistence in device secure storage, with expiry margin, restoration, refresh, and logout.",
      "Authentication-based route protection and a tested student profile flow.",
      "Jest, React Native Testing Library, and GitHub Actions checks for types, lint, and tests.",
    ],
    notes: [
      "This is an ongoing team project, not a finished production system.",
      "Role-specific guards live on an unmerged branch; main checks authentication only.",
      "Face verification, geofencing, QR, and lecturer and admin features belong to teammates.",
    ],
  },
  {
    slug: "pharma-control-tower",
    title: "Pharma Availability Control Tower",
    kind: "Backend & operations",
    summary:
      "A planning tool for pharmaceutical supply: shortage forecasts, dispatch plans, approval, and audit trails.",
    overview:
      "A competition MVP that walks a planner from operational inputs through shortage forecasting and dispatch candidates to approval and execution. I built most of the FastAPI surface — inputs, orchestration, planner review, dashboard data, reports, and demo operations — along with the arrival simulators and deployment configuration.",
    role: "Team of 4",
    status: "Working MVP",
    technologies: ["FastAPI", "Next.js", "SQLAlchemy", "MySQL", "Docker", "Render"],
    repository: "https://github.com/JPabasara/pharma-availability-control-tower",
    liveUrl: "https://pharma-availability-control-tower.vercel.app",
    image: {
      src: "/projects/pharma-dashboard.png",
      alt: "Planner dashboard showing planning stages and fleet status",
    },
    highlights: [
      "FastAPI endpoints for dashboard data, inputs, orchestration, plan review, reports, and demo operations.",
      "Approval creates reservations and transfers, while separate business events move physical stock, so the audit trail stays intact.",
      "Vessel and lorry arrival simulators that exercise the operational state transitions.",
      "Render deployment configuration and a planner shell that works on smaller screens.",
    ],
    notes: [
      "The seeded scenario is a compact competition demo, not a live supply chain deployment.",
      "The forecasting and dispatch optimisation models are my teammates' work.",
    ],
  },
  {
    slug: "disaster-response-system",
    title: "Disaster Response System",
    kind: "Distributed systems",
    summary: "The web command centre for a 20-person platform: incidents, alerts, resources, and role-aware access.",
    overview:
      "An academic platform split across device, data, interaction, and platform-security subgroups. I built the command centre that sits on top of it: the dashboard pages, the interactive incident map, resource and report workflows, and a shared permission model that navigation, route guards, and actions all read from.",
    role: "Team of 20",
    status: "Completed",
    technologies: ["Next.js", "TypeScript", "Socket.IO", "Kafka", "PostgreSQL", "Docker", "Vitest"],
    repository: "https://github.com/Disaster-Response-System-Group-J/disaster-response-system",
    highlights: [
      "Command centre pages for alerts, analytics, incoming reports, resources, and the incident map.",
      "Authentication context, reusable route guards, typed permissions, and role-aware navigation.",
      "Unit tests covering permissions, filters, validation, and dashboard statistics.",
      "Graceful behaviour when the database is unavailable, plus later work on alerts and audit access.",
    ],
    notes: [
      "This was a 20-person project, so platform-wide features are team outcomes.",
      "The live Socket.IO map integration was added later by a teammate.",
      "The repository ships local demonstration credentials that must not be reused anywhere real.",
    ],
  },
  {
    slug: "flower-exchange",
    title: "Flower Exchange",
    kind: "C++ systems",
    summary: "A C++ order matching engine with price-time priority, partial fills, and a live browser dashboard.",
    overview:
      "An order exchange simulator built end to end: a C++ matching engine with validation and execution reports, a batch CSV mode, a multithreaded TCP server, a Node.js bridge, and a React dashboard that shows fills as they happen.",
    role: "Solo project",
    status: "Completed",
    technologies: ["C++", "STL", "TCP/IP", "Multithreading", "Node.js", "WebSockets", "React"],
    repository: "https://github.com/oshadhaw63/Flower-Exchange-LSEG",
    highlights: [
      "Validates required fields, supported instruments, side, price, and quantity before an order reaches the book.",
      "Keeps price-sorted buy and sell maps with a FIFO queue at each price level, guarded by a mutex per book.",
      "Supports full and partial executions at the resting order's price.",
      "Runs either as a batch CSV processor or a multithreaded TCP server.",
      "Streams browser orders and execution reports through a Socket.IO to TCP bridge.",
    ],
    notes: [
      "This is an educational simulation, not a production trading platform.",
      "Scenario CSVs cover the expected outputs, but there is no automated test framework.",
      "The TCP server is Windows-specific and the wire protocol is plain delimited text.",
    ],
  },
  {
    slug: "rpal-interpreter",
    title: "RPAL Interpreter",
    kind: "Programming languages",
    summary: "A Java interpreter for RPAL: scanner, recursive-descent parser, tree standardisation, and a CSE machine.",
    overview:
      "A Programming Languages coursework project that takes RPAL source through every stage of execution. High-level syntax is standardised into a smaller set of core tree forms first, which keeps the Control-Stack-Environment machine focused on a compact runtime model.",
    role: "Team of 2",
    status: "Completed",
    technologies: ["Java", "Lexical analysis", "Recursive-descent parsing", "AST", "CSE machine"],
    repository: "https://github.com/oshadhaw63/rpal-interpreter",
    highlights: [
      "Regex-backed scanner for identifiers, integers, strings, operators, punctuation, and comments.",
      "Recursive-descent parser following the RPAL grammar, producing a child-sibling AST.",
      "Standardisation rules for let, where, within, functions, simultaneous definitions, and recursion.",
      "CSE evaluation with control and value stacks, environments, closures, tuples, and built-ins.",
      "A set of RPAL programs with expected trees and output for manual verification.",
    ],
    notes: [
      "A two-person project, and the report does not split implementation areas between us.",
      "The repository is a single squashed commit, so history cannot attribute work more finely.",
      "The sample programs are fixtures rather than an automated test harness.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    category: "Languages",
    skills: [
      { name: "C++", symbol: "C+" },
      { name: "Java", symbol: "Jv" },
      { name: "Python", symbol: "Py" },
      { name: "TypeScript", symbol: "Ts" },
      { name: "JavaScript", symbol: "Js" },
      { name: "SQL", symbol: "Sq" },
    ],
  },
  {
    id: "backend",
    category: "Backend",
    skills: [
      { name: "FastAPI", symbol: "Fa" },
      { name: "Node.js", symbol: "Nd" },
      { name: "Express", symbol: "Ex" },
      { name: "REST APIs", symbol: "Ra" },
      { name: "SQLAlchemy", symbol: "Sa" },
      { name: "Spring Boot", symbol: "Sb" },
    ],
  },
  {
    id: "frontend",
    category: "Frontend & mobile",
    skills: [
      { name: "React", symbol: "Re" },
      { name: "Next.js", symbol: "Nx" },
      { name: "React Native", symbol: "Rn" },
      { name: "Expo", symbol: "Ep" },
      { name: "Redux Toolkit", symbol: "Rx" },
      { name: "Tailwind CSS", symbol: "Tw" },
    ],
  },
  {
    id: "data",
    category: "Data & messaging",
    skills: [
      { name: "PostgreSQL", symbol: "Pg" },
      { name: "MySQL", symbol: "My" },
      { name: "MongoDB", symbol: "Mg" },
      { name: "Redis", symbol: "Rd" },
      { name: "Kafka", symbol: "Kf" },
    ],
  },
  {
    id: "auth",
    category: "Auth & security",
    skills: [
      { name: "Keycloak", symbol: "Kc" },
      { name: "OAuth 2.0", symbol: "Oa" },
      { name: "OpenID Connect", symbol: "Oi" },
      { name: "PKCE", symbol: "Pk" },
      { name: "JWT", symbol: "Jw" },
      { name: "Spring Security", symbol: "Ss" },
    ],
  },
  {
    id: "cloud",
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", symbol: "Aw" },
      { name: "Docker", symbol: "Dk" },
      { name: "Git", symbol: "Gt" },
      { name: "GitHub Actions", symbol: "Ga" },
    ],
  },
  {
    id: "testing",
    category: "Testing",
    skills: [
      { name: "Jest", symbol: "Je" },
      { name: "React Native Testing Library", symbol: "Rl", label: "RN Testing Library" },
      { name: "Pytest", symbol: "Pt" },
      { name: "Vitest", symbol: "Vt" },
    ],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Richmond College, Galle",
    credential: "G.C.E. Advanced Level",
    period: "2022",
    detail: "Three A passes.",
  },
  {
    institution: "Institute of Java and Software Engineering",
    credential: "Comprehensive Master Java Developer Diploma",
    period: "2023",
    detail: "Java, OOP, MySQL, design patterns, Spring Boot, React, and JavaFX over eight months.",
  },
  {
    institution: "University of Moratuwa",
    credential: "B.Sc. Engineering (Hons) in Computer Science & Engineering",
    period: "2024 — Present",
    detail: "CGPA 3.76 / 4.00. Dean's List in semesters 3 and 4.",
    coursework: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Computer Architecture",
      "Advanced Software Engineering",
    ],
  },
];

export const activities: Activity[] = [
  { role: "Partnership Development Committee Member", organization: "CSESS, University of Moratuwa" },
  { role: "Partnership Development Committee Member", organization: "Hit the Grounds" },
  { role: "Publicity Committee Member", organization: "SLIoT Competition" },
];

export const certifications: Certification[] = [
  { title: "High-Performance and Mission-Critical Software Development Using C++", issuer: "LSEG" },
  { title: "AWS Academy Graduate: Cloud Foundations", issuer: "AWS Academy" },
  { title: "AWS Academy Graduate: Microservices and CI/CD Pipeline Builder", issuer: "AWS Academy" },
];

export const achievements: Achievement[] = [
  {
    value: 3.76,
    decimals: 2,
    suffix: "/ 4.00",
    title: "CGPA",
    caption: "B.Sc. Engineering (Hons) in Computer Science & Engineering, University of Moratuwa.",
    icon: "cap",
  },
  {
    value: 2,
    title: "Dean's List semesters",
    caption: "Named to the Dean's List in semesters 3 and 4.",
    icon: "star",
  },
  {
    value: projects.length,
    title: "Projects built",
    caption: "From a C++ matching engine to an authenticated mobile app and an operations backend.",
    icon: "stack",
  },
  {
    value: 20,
    title: "People on my largest team",
    caption: "The Disaster Response System, where I built the web command centre.",
    icon: "people",
  },
  {
    value: 3,
    title: "A passes at A/Level",
    caption: "G.C.E. Advanced Level at Richmond College, Galle.",
    icon: "letter",
  },
];

export const allSkills = skillGroups.flatMap((group) => group.skills);

/** Projects whose technology list names this skill exactly. */
export function getProjectsUsing(skill: string) {
  return projects.filter((project) => project.technologies.includes(skill));
}

/** Certifications whose title names this skill. */
export function getCertificationsFor(skill: string) {
  return certifications.filter((certification) => certification.title.includes(skill));
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
