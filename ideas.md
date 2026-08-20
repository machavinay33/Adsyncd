# AdSyncd — Design Direction

## Three stylistic approaches

### Theme Name: Signal Console
Very Brief Intro: A dark, editorial growth-tech interface that treats marketing as an operating system: crisp metrics, electric blue signals, and modular sections with an analytical rhythm.
Probability: 0.07

### Theme Name: Electric Ledger
Very Brief Intro: A sharp, high-contrast performance consultancy aesthetic built around revenue notation, underlined claims, and a restrained blue/cyan instrument-panel language.
Probability: 0.03

### Theme Name: Blue Hour Systems
Very Brief Intro: A cinematic near-black brand world with luminous blue diagrams, calm motion, and a premium SaaS sensibility that makes complex growth systems feel legible.
Probability: 0.09

## Chosen approach: Signal Console

### Design Movement
Contemporary Swiss editorial systems design fused with performance-analytics dashboard language.

### Core Principles
1. Treat every section as part of one connected operating system, not a stack of generic agency blocks.
2. Use asymmetric editorial composition, hard alignment lines, and measured whitespace instead of repetitive centered cards.
3. Let electric blue and cyan function as signal colors on a near-black navy canvas; metrics remain legible and restrained.
4. Make every interaction explain the system: hover states reveal, sliders model, and navigation anchors move users through the growth loop.

### Color Philosophy
The interface uses near-black and deep navy as the working surface, evoking a control room without leaning into cyberpunk excess. Electric blue marks action and strategic direction, cyan marks connective tissue, and green is reserved for positive modeled movement rather than unverified proof. Blue should feel precise and confident; cyan should feel like a live signal.

### Layout Paradigm
A long-form editorial control room: a sticky utility nav, split hero with a live-looking dashboard, wide proof rails, staggered problem statements, a circular growth engine, offset service columns, and full-width qualification moments. Sections should feel like consecutive screens in one growth system rather than a uniform card grid.

### Signature Elements
- Thin cyan/electric-blue measurement lines and corner brackets around important modules.
- Monospace micro-labels with section indices, system tags, and metric annotations.
- A circular Growth Engine with a blue signal orbit and the supplied AdSyncd mark at its center.

### Interaction Philosophy
Interactions are useful and quiet. CTAs have a responsive press state; cards lift by a few pixels; the calculator visibly responds to assumptions; filters change the receipts view; and the modal preserves context rather than feeling like a separate page. All motion is gated by prefers-reduced-motion.

### Animation
Use fade-up reveals with short staggered delays, gentle orbit motion on the Growth Engine, slow metric bar movement, and 180–260ms UI transitions. Never animate layout dimensions when transform/opacity can do the work. The page should feel alive while remaining fast and calm.

### Typography System
Use Space Grotesk for high-impact headlines and navigation, with Inter for readable body copy and DM Mono for labels, metrics, and technical annotations. Headlines use tight tracking and clipped line breaks; body text stays at a generous line height; labels are uppercase with expanded tracking.

### Brand Essence
AdSyncd is the growth operating system for revenue-generating clinics, D2C brands, and selected local businesses that want acquisition, conversion, and retention to compound—not operate in silos.
Personality: precise, candid, systems-minded.

### Brand Voice
Headlines are direct and commercially literate. CTAs are specific and low-friction. Microcopy explains assumptions instead of overselling certainty.
Example lines: “More traffic isn't a strategy.” / “Model the upside before you scale the spend.”

### Wordmark & Logo
Use the supplied circular AdSyncd logo as the primary mark. Pair it with a custom-feeling wordmark treatment using Space Grotesk at a tight weight, with the “A” mark and wordmark separated by a narrow signal rule rather than a generic lockup.

### Signature Brand Color
Signal Blue: #2F7BFF — a bright, ownable electric blue used for actions, active states, and growth-system connectors.

## Implementation guardrails

This is a frontend-first Vite React build with a Supabase-ready public insert path represented through a small client adapter and a `supabase/schema.sql` file. No lead data, case-study results, testimonials, or performance metrics will be presented as verified; all unavailable proof is explicitly labeled as placeholder or illustrative. The supplied logo is the only brand asset treated as authoritative.
