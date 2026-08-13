import type { EducationItem, Project, SkillGroup } from "@/types/portfolio";

export const profile = {
  name: "Oshadha Wijayarathne",
  initials: "OW",
  title: "Software Engineering Portfolio",
  email: "oshadhaw.23@cse.mrt.ac.lk",
  location: "Galle, Sri Lanka",
  university: "University of Moratuwa",
  degree: "B.Sc. Engineering (Hons) in Computer Science & Engineering",
  github: "https://github.com/oshadhaw63",
  linkedin: "https://www.linkedin.com/in/oshadha-wijayarathne-2a631734a/",
  cv: "/oshadha-wijayarathne-cv.pdf",
  introduction:
    "Computer Science and Engineering undergraduate building full-stack applications, backend systems, developer tools, and systems-oriented academic projects.",
  focus:
    "Seeking a software engineering internship focused on reliable products, backend engineering, developer tooling, or full-stack systems.",
} as const;

export const projects: Project[] = [
  {
    slug: "repolens",
    order: 1,
    title: "RepoLens",
    shortTitle: "RepoLens",
    eyebrow: "Developer tooling",
    problem:
      "Unfamiliar JavaScript and TypeScript repositories are slow to understand when structure, symbols, and dependencies must be traced by hand.",
    description:
      "An AST-based repository explorer that turns source files into an interactive dependency map with searchable symbols, onboarding guidance, and lightweight risk signals.",
    contribution:
      "Designed and implemented the full project, from repository scanning and TypeScript AST traversal to graph construction, search ranking, heuristics, and the React Flow interface.",
    decision:
      "Use the TypeScript Compiler API instead of text matching so imports, exports, named functions, arrow functions, and classes are extracted from syntax nodes.",
    difficulty:
      "Resolving local import specifiers to real files while keeping folder relationships and dependency edges understandable on one graph.",
    learning:
      "Static analysis becomes more useful when its heuristics are transparent and its limitations are visible to the user.",
    status: "In progress",
    workMode: "Individual",
    technologies: [
      "Next.js",
      "TypeScript",
      "TypeScript Compiler API",
      "React Flow",
      "Tailwind CSS",
    ],
    repository: "https://github.com/oshadhaw63/RepoLens",
    pipeline: [
      "Repository",
      "File scanner",
      "TypeScript parser",
      "Symbol extraction",
      "Dependency graph",
      "Search, risk & visualisation",
    ],
    implemented: [
      "Scans the current local workspace or a public GitHub repository for JavaScript and TypeScript source files.",
      "Extracts imports, exports, functions, arrow functions, and classes with the TypeScript Compiler API.",
      "Builds folder containment and resolvable local-import edges, then renders them with React Flow.",
      "Ranks repository search matches across filenames, paths, summaries, symbols, and imports.",
      "Generates a six-file onboarding path, external dependency list, and rule-based file-risk hotspots.",
    ],
    limitations: [
      "Public GitHub scans are unauthenticated and limited to the first 80 supported files.",
      "Import resolution handles relative paths and the @/ alias, not every tsconfig path mapping.",
      "Risk and onboarding results are explainable heuristics, not semantic complexity analysis.",
      "The repository currently has lint and build checks but no automated test suite.",
    ],
    evidenceNote:
      "Verified against the public repository’s scanner, parser, graph, search, and heuristic modules. All 51 repository commits share Oshadha’s author identity.",
    tone: "blue",
    featured: true,
  },
  {
    slug: "uniattend",
    order: 2,
    title: "UniAttend",
    shortTitle: "UniAttend",
    eyebrow: "Mobile & identity",
    problem:
      "University attendance needs a student workflow that can preserve identity sessions securely while coordinating several verification steps.",
    description:
      "An ongoing university attendance platform with a React Native student application and web and backend services maintained by a four-person team.",
    contribution:
      "Established the Expo mobile foundation and delivered the merged Keycloak login, PKCE session lifecycle, secure token storage, logout, authenticated routing, profile workflow, mobile tests, and CI foundation.",
    decision:
      "Use OpenID Connect Authorization Code Flow with PKCE and device secure storage, restoring or refreshing sessions before allowing access to student routes.",
    difficulty:
      "Coordinating browser-based identity redirects with native app routing, token expiry, restoration, refresh, cancellation, and local logout states.",
    learning:
      "Authentication is a state machine, not a login screen; recovery paths and route boundaries deserve first-class design and tests.",
    status: "In progress",
    workMode: "Team of 4",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Keycloak",
      "OpenID Connect",
      "PostgreSQL",
      "GitHub Actions",
    ],
    repository: "https://github.com/Smart-Attendance-Group-27/smart-attendance-platform",
    pipeline: [
      "Expo app",
      "Keycloak discovery",
      "Authorization code + PKCE",
      "SecureStore",
      "Session restoration",
      "Protected student routes",
    ],
    implemented: [
      "Merged mobile foundation with shared UI, typed feature services, and Expo Router navigation.",
      "Merged Keycloak realm bootstrap plus OpenID Connect login using Authorization Code Flow with PKCE.",
      "Merged secure token persistence, expiry margin, session restoration, token refresh, local/Keycloak logout, and failure states.",
      "Merged authentication-based student route protection and a tested student profile workflow.",
      "Established Jest, React Native Testing Library, and GitHub Actions checks for types, lint, and mobile tests.",
      "Active feature-branch work adds Keycloak token validation, user mapping, profile endpoints, and geofence validation; it is not presented as merged functionality.",
    ],
    limitations: [
      "This is an ongoing team project, not a finished production attendance system.",
      "The student-role-specific guard is present on an unmerged branch; main currently checks authentication rather than the Keycloak student role.",
      "Face verification, geofence UI, QR, notification, lecturer, and administrator features are team-owned and are not attributed here.",
    ],
    evidenceNote:
      "Verified from merged commit history and current source. The repository also contains newer Oshadha-authored backend/database work on active feature branches, clearly separated above.",
    tone: "violet",
    featured: true,
  },
  {
    slug: "pharma-control-tower",
    order: 3,
    title: "Pharma Availability Control Tower",
    shortTitle: "Pharma Control Tower",
    eyebrow: "Backend & operations",
    problem:
      "Pharma planners must coordinate shortage pressure, inbound clearance, fleet constraints, approvals, and physical stock movements without losing auditability.",
    description:
      "A working competition MVP that combines shortage forecasting, inbound prioritisation, candidate dispatch planning, planner approval, reports, and operational simulation.",
    contribution:
      "Built substantial FastAPI route groups for inputs, orchestration, planner workflows, reports, dashboard data, and demo operations; also added simulation scripts, deployment configuration, and responsive shell improvements.",
    decision:
      "Keep planner approval separate from physical execution so approval creates reservations and transfers while explicit business events change stock.",
    difficulty:
      "Exposing a multi-stage planning pipeline as coherent, database-backed operations with state transitions that remain reviewable and repeatable.",
    learning:
      "Operational software needs explicit state boundaries and audit trails as much as it needs a correct model output.",
    status: "Working MVP",
    workMode: "Team of 4",
    technologies: [
      "FastAPI",
      "Next.js",
      "SQLAlchemy",
      "MySQL",
      "Docker",
      "Render",
    ],
    repository: "https://github.com/JPabasara/pharma-availability-control-tower",
    liveUrl: "https://pharma-availability-control-tower.vercel.app",
    image: {
      src: "/projects/pharma-dashboard.png",
      alt: "Pharma Availability Control Tower dashboard showing planning stages and fleet status",
      caption: "Actual planner dashboard from the project repository.",
    },
    pipeline: [
      "Operational inputs",
      "Shortage forecast",
      "Inbound priority",
      "Dispatch candidates",
      "Planner approval",
      "Execution events & reports",
    ],
    implemented: [
      "Working FastAPI and Next.js MVP with database-backed planner state and audit records.",
      "Oshadha-authored endpoints for dashboard data, inputs, orchestration, plan review, demo operations, mock ETA, and reports remain substantially present in main.",
      "Oshadha-authored vessel and lorry arrival simulators exercise operational state transitions.",
      "Oshadha updated the Render deployment manifest and made the planner shell responsive on smaller screens.",
      "The team’s runtime includes mathematical prioritisation, XGBoost shortage forecasting, and OR-Tools candidate dispatch planning; those models are not claimed as Oshadha’s work.",
    ],
    limitations: [
      "The seeded scenario is a compact competition demonstration rather than a live supply-chain deployment.",
      "The local documented database is MySQL; Oshadha’s PostgreSQL seed-compatibility commit remains outside main.",
      "Model ownership belongs to the team and is intentionally not attributed to Oshadha.",
    ],
    evidenceNote:
      "Verified through main-branch file blame and commit history, including the Phase B API work, Phase C simulators, Render configuration, and responsive frontend change.",
    tone: "teal",
    featured: true,
  },
  {
    slug: "disaster-response-system",
    order: 4,
    title: "Disaster Response System",
    shortTitle: "Disaster Response",
    eyebrow: "Distributed team system",
    problem:
      "Emergency command teams need one interface for incidents, alerts, resource coordination, permissions, and data arriving from distributed services.",
    description:
      "A distributed academic platform organised across device, data, interaction, and platform-security subgroups, with a web command centre as its operational interface.",
    contribution:
      "Built the initial command-centre experience, including dashboard pages, the interactive incident map, resource and report workflows, authentication context, route guards, permissions, shared contracts, mock datasets, and focused unit tests.",
    decision:
      "Centralise typed roles and permission checks so navigation, protected routes, and actions use the same access model.",
    difficulty:
      "Keeping a broad operational UI testable and resilient while its upstream services and integration contracts were evolving across a large team.",
    learning:
      "Shared contracts and graceful failure states reduce integration friction in a distributed, multi-team system.",
    status: "Completed",
    workMode: "Team of 20",
    technologies: [
      "Next.js",
      "TypeScript",
      "Socket.IO",
      "Kafka",
      "PostgreSQL",
      "Docker",
      "Vitest",
    ],
    repository: "https://github.com/Disaster-Response-System-Group-J/disaster-response-system",
    pipeline: [
      "Device & data services",
      "Kafka events",
      "Event bridge",
      "Command centre",
      "Incident map",
      "Role-aware actions",
    ],
    implemented: [
      "Oshadha-authored command-centre pages cover alerts, analytics, incoming reports, resources, and the initial incident-map experience.",
      "Authentication context, reusable route guards, typed permissions, and role-aware navigation are supported by his commit history.",
      "Unit tests cover permissions, filters, validation, and dashboard statistics.",
      "Later Oshadha work improved unavailable-database behavior, alerts, audit access, and resource-plan interactions.",
      "The current map receives Socket.IO updates, but that live integration was added later by a teammate and is not claimed as Oshadha’s contribution.",
    ],
    limitations: [
      "This was a 20-person academic project, so platform-wide features are team outcomes.",
      "Some early Kafka and Socket layers in Oshadha’s contribution were documented stubs while other team members completed the live bridge.",
      "The repository includes local demonstration credentials that must never be reused in production.",
    ],
    evidenceNote:
      "Verified with author-filtered history and file blame. The wording intentionally separates Oshadha’s initial map and command-centre work from a teammate’s later Socket.IO integration.",
    tone: "rose",
    featured: false,
  },
  {
    slug: "flower-exchange",
    order: 5,
    title: "Flower Exchange",
    shortTitle: "Flower Exchange",
    eyebrow: "C++ systems exercise",
    problem:
      "A trading simulation needs deterministic validation, price-time matching, partial fills, and a way to expose engine results to a browser.",
    description:
      "An educational flower-order exchange simulator with a C++ matching engine, batch CSV mode, TCP server, Node.js bridge, and React dashboard.",
    contribution:
      "Implemented the repository individually: matching and validation logic, order books, execution reports, concurrent TCP handling, WebSocket bridge, and browser dashboard.",
    decision:
      "Represent each price level with an ordered map and FIFO queue, then protect each order book with a mutex so concurrent client threads preserve matching state.",
    difficulty:
      "Keeping partial-fill reports and remaining quantities correct for both aggressing and resting orders across batch and network modes.",
    learning:
      "Data-structure choice, ordering guarantees, and I/O boundaries directly shape the behavior of stateful systems.",
    status: "Completed",
    workMode: "Individual",
    technologies: ["C++", "STL", "TCP/IP", "Multithreading", "Node.js", "WebSockets", "React"],
    repository: "https://github.com/oshadhaw63/Flower-Exchange-LSEG",
    pipeline: [
      "CSV or browser order",
      "Validation",
      "Instrument order book",
      "Price-time matching",
      "Execution reports",
      "CSV or live dashboard",
    ],
    implemented: [
      "Validates required fields, supported instruments, side, positive price, and quantity rules.",
      "Maintains price-sorted buy and sell maps with FIFO queues at each price level.",
      "Supports full and partial executions at the resting order’s price.",
      "Provides batch CSV processing plus a multithreaded Windows TCP server.",
      "Streams browser orders and execution reports through a Node.js Socket.IO-to-TCP bridge.",
    ],
    limitations: [
      "This is an educational exchange simulation, not a production or high-frequency trading platform.",
      "The repository contains scenario CSV inputs and expected outputs but no automated unit-test framework.",
      "The TCP server is Windows-specific and the protocol is a simple delimiter-based text format.",
    ],
    evidenceNote:
      "Verified from the C++ order book, validator, TCP server, Node bridge, React client, CSV scenarios, and single-author repository history.",
    tone: "amber",
    featured: false,
  },
  {
    slug: "rpal-interpreter",
    order: 6,
    title: "RPAL Interpreter",
    shortTitle: "RPAL Interpreter",
    eyebrow: "Programming languages",
    problem:
      "Executing RPAL requires transforming source text through lexical, syntactic, structural, and runtime representations.",
    description:
      "A Java interpreter that tokenises RPAL, builds and standardises an abstract syntax tree, then evaluates it with a Control-Stack-Environment machine.",
    contribution:
      "Co-developed as a two-person Programming Languages project. The repository and report verify the complete pipeline but do not allocate individual components, so the work is presented as team-owned.",
    decision:
      "Standardise high-level syntax into a smaller set of core tree forms before evaluation, keeping the CSE machine focused on a compact runtime model.",
    difficulty:
      "Maintaining correct tree relationships and lexical environments through standardisation, closures, recursion, tuples, and conditional evaluation.",
    learning:
      "Interpreters become easier to reason about when parsing, representation transformation, and evaluation are separate stages.",
    status: "Completed",
    workMode: "Team of 2",
    technologies: ["Java", "Lexical analysis", "Recursive-descent parsing", "AST", "Functional programming", "CSE machine"],
    repository: "https://github.com/oshadhaw63/rpal-interpreter",
    pipeline: ["RPAL source", "Scanner", "Recursive-descent parser", "AST", "Standardised tree", "CSE evaluation"],
    implemented: [
      "Regex-backed lexical scanner for identifiers, integers, strings, operators, punctuation, and comments.",
      "Recursive-descent parser following the RPAL grammar and producing a child-sibling AST.",
      "Tree-standardisation rules for constructs including let, where, within, functions, simultaneous definitions, and recursion.",
      "CSE evaluation with control and value stacks, environments, closures, tuples, conditionals, operators, and built-ins.",
      "A collection of RPAL programs and expected AST or output fixtures for manual verification.",
    ],
    limitations: [
      "The included report names two group members but does not map implementation areas to either person.",
      "The repository is a single squashed commit, so Git history cannot provide finer attribution.",
      "Test programs are fixtures rather than an automated test harness.",
    ],
    evidenceNote:
      "Verified from the Java source and the included 15-page Group ABYSS report. Team ownership is stated explicitly to avoid overstating individual contribution.",
    tone: "slate",
    featured: false,
  },
];

export const skillGroups: SkillGroup[] = [
  { category: "Languages", skills: ["C++", "Java", "Python", "TypeScript", "JavaScript", "SQL"] },
  { category: "Backend", skills: ["FastAPI", "Node.js", "Express", "REST APIs", "SQLAlchemy", "Spring Boot"] },
  { category: "Frontend & mobile", skills: ["React", "Next.js", "React Native", "Expo", "Redux Toolkit", "Tailwind CSS"] },
  { category: "Data & messaging", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka"] },
  { category: "Authentication", skills: ["Keycloak", "OAuth 2.0", "OpenID Connect", "PKCE", "JWT", "Spring Security"] },
  { category: "Cloud & DevOps", skills: ["AWS", "Docker", "Git", "GitHub Actions"] },
  { category: "Testing", skills: ["Jest", "React Native Testing Library", "Pytest", "Vitest"] },
  { category: "CS fundamentals", skills: ["Data structures & algorithms", "Operating systems", "Computer networks", "Computer architecture", "Software engineering"] },
];

export const education: EducationItem[] = [
  {
    institution: "University of Moratuwa, Sri Lanka",
    credential: "B.Sc. Engineering (Hons) in Computer Science & Engineering",
    period: "2024 — Present",
    detail: "CGPA: 3.76 / 4.00",
    highlights: [
      "Dean’s List — Semesters 3 and 4",
      "Coursework: Data Structures & Algorithms, Database Systems, Operating Systems, Computer Networks, Software Engineering, Computer Architecture, and Advanced Software Engineering",
    ],
  },
  {
    institution: "Institute of Java and Software Engineering",
    credential: "Comprehensive Master Java Developer Diploma",
    period: "2023 · 8 months",
    detail: "Java, OOP, MySQL, application architecture, design patterns, web development, React, Spring Boot, and JavaFX",
    highlights: [],
  },
  {
    institution: "Richmond College, Galle",
    credential: "G.C.E. Advanced Level",
    period: "2022",
    detail: "3 A passes",
    highlights: [],
  },
];

export const certifications = [
  "High-Performance and Mission-Critical Software Development Using C++ — LSEG",
  "AWS Academy Graduate: Cloud Foundations — Amazon Web Services",
  "AWS Academy Graduate: Microservices and CI/CD Pipeline Builder — Amazon Web Services",
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
