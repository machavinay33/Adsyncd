/* AdSyncd Signal Console: Swiss editorial systems design, dark navy surfaces, electric-blue signals, DM Mono labels. */
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  FlaskConical,
  Gauge,
  Menu,
  MessageCircleMore,
  MousePointer2,
  RefreshCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const logoUrl = "/adsyncd-logo.png";
const heroTexture = "/adsyncd-hero-network.png";
const dashboardArt = "/adsyncd-dashboard-art.png";
const growthSystemArt = "/adsyncd-growth-system.png";
const conversionArt = "/adsyncd-conversion-editorial.png";
const sectionTexture = "/adsyncd-section-texture.png";

const services = [
  { id: "01", stage: "ACQUIRE", title: "Paid Growth", icon: MousePointer2, copy: "Bring the right people into your funnel with performance campaigns built around profitable customer acquisition.", items: ["Meta + Instagram Ads", "Google Ads", "Retargeting", "Creative testing", "Audience strategy", "Budget optimization"] },
  { id: "02", stage: "CONVERT", title: "Conversion Rate Optimization", icon: Target, copy: "Turn existing demand into more customers through clearer offers, sharper pages, and less funnel leakage.", items: ["Landing pages", "Funnel optimization", "Offer testing", "A/B testing", "UX improvements", "Checkout optimization"] },
  { id: "03", stage: "RETAIN", title: "Retention Marketing", icon: RefreshCcw, copy: "Make the second purchase easier than the first with lifecycle systems that compound customer value.", items: ["Email + WhatsApp", "SMS", "Win-back flows", "Upsells + cross-sells", "Repeat purchase", "Lifecycle automation"] },
  { id: "04", stage: "SCALE", title: "Growth Analytics", icon: BarChart3, copy: "Know which inputs actually drive revenue, then put more capital behind the parts that work.", items: ["CAC + LTV", "ROAS", "Attribution", "Funnel analytics", "Growth experiments", "Budget allocation"] },
];

const caseStudies = [
  { client: "Example clinic", industry: "Clinic / Healthcare", tags: ["Clinics", "CRO"], challenge: "Demand was arriving, but enquiry quality and follow-up were inconsistent.", change: "Illustrative funnel cleanup across offer, landing page, qualification, and follow-up.", metrics: [["+142%", "Revenue"], ["-38%", "CAC"], ["+41%", "Repeat revenue"]] },
  { client: "Example D2C brand", industry: "D2C", tags: ["D2C", "Paid Ads"], challenge: "Paid acquisition scaled faster than the economics could support.", change: "Illustrative creative testing and retention loop built around contribution margin.", metrics: [["+2.1×", "Modeled ROAS"], ["-24%", "Blended CAC"], ["+28%", "LTV"]] },
  { client: "Example service business", industry: "Local service", tags: ["Paid Ads", "Retention"], challenge: "Leads were being counted, but revenue attribution was missing.", change: "Illustrative tracking system connecting campaign, pipeline, close, and repeat value.", metrics: [["+64%", "Qualified leads"], ["+19%", "Close rate"], ["+31%", "Tracked revenue"]] },
];

function Reveal({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={style}>{children}</div>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <a href="#top" className="brand" aria-label="AdSyncd — Headquarters home"><img src={logoUrl} alt="AdSyncd circular blue logo" /><span className={compact ? "sr-only" : "brand-wordmark"}>AdSyncd<span>— HQ</span></span></a>;
}

function AuditModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", industry: "Clinic / Healthcare", revenue: "Under ₹5L", spend: "Under ₹50k", challenge: "Ads aren't profitable" });
  const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("");
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) { setSubmitted(true); return; }
    try {
      const supabase = createClient(url, key);
      const { error } = await supabase.from("growth_audits").insert(form);
      if (error) throw error;
      setSubmitted(true);
    } catch { setStatus("We couldn't send that yet. Please check your Supabase environment variables and try again."); }
  };
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="audit-modal" role="dialog" aria-modal="true" aria-labelledby="audit-title">
    <button className="icon-button modal-close" onClick={onClose} aria-label="Close growth audit"><X size={18} /></button>
    {!submitted ? <><p className="eyebrow">INPUT → DIAGNOSIS</p><h2 id="audit-title">Let's find the constraint.</h2><p className="modal-intro">Share the business context. We'll look for the highest-impact place to improve the system—not just another campaign to run.</p>
      <form onSubmit={submit} className="audit-form">
        <label>Name<input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" /></label>
        <label>Email<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" /></label>
        <label>Company<input required value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company name" /></label>
        <label>Phone / WhatsApp<input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 ..." /></label>
        <label>Industry<select value={form.industry} onChange={(e) => update("industry", e.target.value)}><option>Clinic / Healthcare</option><option>D2C</option><option>Local Service</option><option>Other</option></select></label>
        <label>Monthly revenue<select value={form.revenue} onChange={(e) => update("revenue", e.target.value)}><option>Under ₹5L</option><option>₹5L–₹25L</option><option>₹25L–₹50L</option><option>₹50L–₹1Cr</option><option>₹1Cr+</option></select></label>
        <label>Monthly ad spend<select value={form.spend} onChange={(e) => update("spend", e.target.value)}><option>Under ₹50k</option><option>₹50k–₹2L</option><option>₹2L–₹5L</option><option>₹5L–₹10L</option><option>₹10L+</option></select></label>
        <label>Biggest growth challenge<select value={form.challenge} onChange={(e) => update("challenge", e.target.value)}><option>Ads aren't profitable</option><option>Leads aren't converting</option><option>Website conversion</option><option>Retention</option><option>Scaling</option><option>Tracking / attribution</option></select></label>
        {status && <p className="form-error">{status}</p>}
        <button className="button button-primary full-width" type="submit">Submit growth audit <Send size={15} /></button>
      </form>
      <p className="form-note">No guarantees, no vanity metrics. Just a structured look at the economics.</p>
    </> : <div className="success-state"><div className="success-icon"><Check /></div><p className="eyebrow">REQUEST RECEIVED</p><h2>We'll take it from here.</h2><p>Your context is in the queue. The next conversation will be about constraints, economics, and what to do next.</p><button className="button button-secondary" onClick={onClose}>Back to the system <ArrowRight size={15} /></button></div>}
  </div></div>;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [spend, setSpend] = useState(240000);
  const [conversion, setConversion] = useState(3.4);
  const [value, setValue] = useState(14500);
  const [repeat, setRepeat] = useState(1.35);
  const calc = useMemo(() => { const leads = Math.round(spend / 950); const customers = Math.round(leads * (conversion / 100)); const revenue = Math.round(customers * value * repeat); const cac = customers ? Math.round(spend / customers) : 0; const upside = Math.round(revenue * 0.22); return { leads, customers, revenue, cac, upside }; }, [spend, conversion, value, repeat]);
  const filtered = filter === "All" ? caseStudies : caseStudies.filter((item) => item.tags.includes(filter));
  const money = (number: number) => `₹${(number / 100000).toFixed(2)}L`;
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  return <div className="site-shell" id="top">
    <header className="site-nav"><div className="nav-inner"><Logo /><nav className={mobileOpen ? "nav-links open" : "nav-links"}>{["Services", "Growth Engine", "Results", "Process", "About"].map((link) => <button key={link} onClick={() => scrollTo(link === "Growth Engine" ? "engine" : link.toLowerCase())}>{link}</button>)}<button className="mobile-audit" onClick={() => { setAuditOpen(true); setMobileOpen(false); }}>Get Growth Audit <ArrowUpRight /></button></nav><button className="button button-primary nav-cta" onClick={() => setAuditOpen(true)}>Get Growth Audit <ArrowUpRight size={15} /></button><button className="icon-button mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X /> : <Menu />}</button></div></header>

    <main>
      <section className="hero section-grid" style={{ backgroundImage: `linear-gradient(90deg, rgba(247,248,251,.98) 0%, rgba(247,248,251,.91) 46%, rgba(247,248,251,.58) 100%), url(${heroTexture})` }}>
        <div className="container hero-layout"><Reveal className="hero-copy"><p className="eyebrow signal"><span className="pulse-dot" /> ADSYNCD / GROWTH SYSTEMS</p><h1>More customers.<br /><span>More revenue.</span><br />Same ad spend.</h1><p className="hero-lede">AdSyncd connects paid acquisition, conversion optimization and retention into one measurable growth system.</p><div className="hero-actions"><button className="button button-primary" onClick={() => setAuditOpen(true)}>Get Your Growth Audit <ArrowUpRight size={17} /></button><button className="button button-ghost" onClick={() => scrollTo("engine")}>See how it works <ArrowDownRight size={16} /></button></div><div className="system-rail"><div><span>01</span> ACQUIRE <small>Paid Ads</small></div><i>→</i><div><span>02</span> CONVERT <small>CRO</small></div><i>→</i><div><span>03</span> RETAIN <small>Lifecycle</small></div><i>→</i><div><span>04</span> SCALE <small>Analytics</small></div></div></Reveal><Reveal className="hero-dashboard"><div className="dashboard-heading"><span>LIVE MODEL / EXAMPLE ONLY</span><span className="green-label"><span className="pulse-dot green" /> +42.8%</span></div><div className="dashboard-card"><div className="dash-top"><div><span className="dash-label">Revenue signal</span><strong>₹18.60L</strong><small>illustrative monthly model</small></div><TrendingUp className="trend-icon" /></div><div className="chart-wrap"><div className="chart-grid" /><svg viewBox="0 0 480 170" role="img" aria-label="Illustrative rising revenue chart"><path className="chart-line" d="M0 150 C35 140 45 120 78 128 S120 95 152 111 S184 104 210 74 S255 94 280 61 S324 74 354 39 S398 56 430 20 S460 24 480 8" fill="none" stroke="#35d9e9" strokeWidth="3" /><path d="M0 150 C35 140 45 120 78 128 S120 95 152 111 S184 104 210 74 S255 94 280 61 S324 74 354 39 S398 56 430 20 S460 24 480 8 L480 170 L0 170Z" fill="url(#fill)" opacity=".18" /><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#35d9e9" /><stop offset="1" stopColor="#2f7bff" stopOpacity="0" /></linearGradient></defs></svg></div><div className="dash-metrics"><div><span>Ad spend</span><b>₹2.40L</b></div><div><span>Qualified leads</span><b>684</b></div><div><span>Customers</span><b>127</b></div><div><span>Modeled ROAS</span><b className="green-text">7.75×</b></div></div><div className="dashboard-art" style={{ backgroundImage: `url(${dashboardArt})` }} /></div><p className="dash-disclaimer">Illustrative interface. Real performance data supplied during audit.</p></Reveal></div>
      </section>

      <section className="proof-strip"><div className="container proof-grid"><div><span>PROOF / DATA PENDING</span><strong>₹X Cr+</strong><small>Revenue generated</small></div><div><span>PROOF / DATA PENDING</span><strong>X+</strong><small>Brands served</small></div><div><span>PROOF / DATA PENDING</span><strong>X.X×</strong><small>Average ROAS</small></div><div><span>PROOF / DATA PENDING</span><strong>X%</strong><small>Conversion lift</small></div></div></section>

      <section className="section problem-section" id="about"><div className="container"><Reveal className="section-heading split-heading"><div><p className="eyebrow">THE GROWTH GAP / 01</p><h2>Your marketing doesn't need more channels.<br /><span>It needs to work together.</span></h2></div><p>More traffic cannot fix a weak funnel. More leads cannot fix poor follow-up. More customers cannot fix weak retention. Growth happens when the entire customer journey is engineered as one system.</p></Reveal><div className="problem-grid">{[["01", "Acquisition", "You're paying more for every new customer."], ["02", "Conversion", "Traffic is arriving, but too much demand leaks before purchase."], ["03", "Retention", "Customers buy once and disappear instead of compounding value."], ["04", "Measurement", "You don't know which activities are actually driving revenue."]].map(([num, title, copy]) => <Reveal key={num} className="problem-item"><span className="item-num">{num}</span><h3>{title}</h3><p>{copy}</p><ArrowDownRight /></Reveal>)}</div></div></section>

      <section className="engine-section section-grid" id="engine" style={{ backgroundImage: `linear-gradient(180deg, rgba(238,244,255,.84), rgba(238,244,255,.96)), url(${sectionTexture})` }}><div className="container engine-layout"><Reveal className="engine-copy"><p className="eyebrow">THE ADSYNCD GROWTH ENGINE™ / 02</p><h2>One system.<br /><span>Four compounding moves.</span></h2><p>Acquisition gets attention. Conversion turns attention into customers. Retention creates more value. Analytics tells you where to put the next rupee.</p><button className="text-link" onClick={() => setAuditOpen(true)}>Model your bottleneck <ArrowRight size={16} /></button></Reveal><Reveal className="engine-visual" style={{ backgroundImage: `linear-gradient(180deg, rgba(238,244,255,.18), rgba(23,58,120,.74)), url(${growthSystemArt})` }}><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="engine-center"><img src={logoUrl} alt="AdSyncd logo inside growth engine" /></div>{[["01", "ACQUIRE", "Paid growth", "top"], ["02", "CONVERT", "CRO", "right"], ["03", "RETAIN", "Lifecycle", "bottom"], ["04", "SCALE", "Analytics", "left"]].map(([num, title, copy, pos]) => <div className={`engine-node ${pos}`} key={num}><span>{num}</span><b>{title}</b><small>{copy}</small></div>)}</Reveal></div></section>

      <section className="section services-section" id="services"><div className="container"><Reveal className="section-heading split-heading"><div><p className="eyebrow">SERVICES / 03</p><h2>Pick your <span>bottleneck.</span></h2></div><p>We don't sell disconnected services. We solve the constraint holding back growth.</p></Reveal><div className="service-grid">{services.map((service) => { const Icon = service.icon; return <Reveal className="service-card" key={service.id}><div className="service-top"><span className="service-id">{service.id} / {service.stage}</span><Icon /></div><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.items.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul><button className="card-link" onClick={() => setAuditOpen(true)}>Explore system <ArrowUpRight size={14} /></button></Reveal>; })}</div></div></section>

      <section className="calculator-section section-grid" style={{ backgroundImage: `linear-gradient(100deg, rgba(23,58,120,.98) 0%, rgba(23,58,120,.9) 58%, rgba(23,58,120,.72) 100%), url(${conversionArt})` }}><div className="container calculator-layout"><Reveal><p className="eyebrow">RUN THE MATH / 04</p><h2>Small improvements<br /><span>can create big revenue.</span></h2><p>Use the model to make the economics visible. Then bring the assumptions to the audit.</p><p className="calc-note">Illustrative model only. Actual outcomes vary.</p></Reveal><Reveal className="calculator"><div className="calc-controls">{[["Monthly ad spend", spend, setSpend, 50000, 1000000, (n: number) => money(n)], ["Conversion rate", conversion, setConversion, 1, 12, (n: number) => `${n.toFixed(1)}%`], ["Average customer value", value, setValue, 5000, 50000, (n: number) => money(n)], ["Repeat purchase rate", repeat, setRepeat, 1, 3, (n: number) => `${n.toFixed(2)}×`]].map(([label, val, setter, min, max, formatter]) => <label className="range-control" key={label as string}><span><b>{label as string}</b><strong>{(formatter as (n: number) => string)(val as number)}</strong></span><input type="range" min={min as number} max={max as number} step={label === "Conversion rate" ? .1 : label === "Repeat purchase rate" ? .01 : 1000} value={val as number} onChange={(e) => (setter as React.Dispatch<React.SetStateAction<number>>)(Number(e.target.value))} /></label>)}</div><div className="calc-output"><div><span>Leads</span><strong>{calc.leads.toLocaleString()}</strong></div><div><span>Customers</span><strong>{calc.customers.toLocaleString()}</strong></div><div><span>CAC</span><strong>{money(calc.cac)}</strong></div><div className="output-primary"><span>Modeled revenue</span><strong>{money(calc.revenue)}</strong><small>Potential upside: <b>{money(calc.upside)}</b></small></div></div><button className="button button-primary full-width" onClick={() => setAuditOpen(true)}>Get My Growth Audit <ArrowUpRight size={15} /></button></Reveal></div></section>

      <section className="section receipts-section" id="results"><div className="container"><Reveal className="section-heading split-heading"><div><p className="eyebrow">RECEIPTS / 05</p><h2>We'd rather show<br /><span>you the numbers.</span></h2></div><p>These are structured placeholders until verified client data is entered. No invented wins. No screenshot theatre.</p></Reveal><div className="filter-row">{["All", "Clinics", "D2C", "Paid Ads", "CRO", "Retention"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="receipts-grid">{filtered.map((item) => <Reveal className="receipt-card" key={item.client}><div className="receipt-head"><span>{item.industry}</span><span className="placeholder-tag">EXAMPLE / PLACEHOLDER</span></div><h3>{item.client}</h3><div className="receipt-copy"><div><span>Challenge</span><p>{item.challenge}</p></div><div><span>What we changed</span><p>{item.change}</p></div></div><div className="receipt-metrics">{item.metrics.map(([metric, label]) => <div key={label}><strong>{metric}</strong><span>{label}</span></div>)}</div></Reveal>)}</div></div></section>

      <section className="pov-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(23,58,120,.98), rgba(23,58,120,.74)), url(${sectionTexture})` }}><div className="container pov-inner"><p className="eyebrow">POINT OF VIEW / 06</p><h2>Ads don't create growth.<br /><span>Systems do.</span></h2><div className="pov-bottom"><p>An ad can get someone to click.<br />A landing page can get them to convert.<br /><strong>But none of these work in isolation.</strong></p><div><span>That's AdSyncd.</span><ArrowDownRight /></div></div></div></section>

      <section className="section process-section" id="process"><div className="container"><Reveal className="section-heading"><p className="eyebrow">PROCESS / 07</p><h2>How growth gets <span>built.</span></h2></Reveal><div className="process-list">{[["01", "Diagnose", "Audit ads, funnel, analytics, CRM and economics."], ["02", "Strategize", "Find the highest-impact growth opportunities."], ["03", "Build", "Build campaigns, pages, offers and lifecycle systems."], ["04", "Test", "Test creative, audience, messaging and conversion."], ["05", "Optimize", "Cut losers and improve winners."], ["06", "Scale", "Increase investment where unit economics work."]].map(([num, title, copy]) => <Reveal className="process-row" key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p><ArrowRight /></Reveal>)}</div></div></section>

      <section className="section fit-section"><div className="container fit-layout"><Reveal><p className="eyebrow">QUALIFICATION / 08</p><h2>We're not the agency<br /><span>for everyone.</span></h2><p className="fit-intro">The best work starts with a business that already has a signal worth amplifying.</p></Reveal><Reveal className="fit-columns"><div className="fit-column good"><h3><ShieldCheck size={18} /> Good fit</h3>{["Already generating revenue", "Wants profitable growth", "Willing to test", "Cares about business metrics", "Has a proven offer", "Willing to share data"].map((x) => <p key={x}><Check size={14} />{x}</p>)}</div><div className="fit-column not"><h3><CircleDollarSign size={18} /> Probably not a fit</h3>{["Only wants someone to ‘run ads’", "Looking for the cheapest agency", "Measures success by followers", "Expects overnight results", "Won't share performance data", "Doesn't have a viable offer"].map((x) => <p key={x}><X size={14} />{x}</p>)}</div></Reveal></div></section>

      <section className="final-cta"><div className="container final-cta-inner"><div><p className="eyebrow">NEXT MOVE / 09</p><h2>More traffic isn't a strategy.</h2><p>Find the constraint. Fix the system. Grow what works.</p></div><button className="button button-primary" onClick={() => setAuditOpen(true)}>Get Your Growth Audit <ArrowUpRight size={17} /></button></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-top"><Logo /><div className="footer-links"><div><span>Explore</span><button onClick={() => scrollTo("services")}>Services</button><button onClick={() => scrollTo("engine")}>Growth Engine</button><button onClick={() => scrollTo("results")}>Receipts</button></div><div><span>Built for</span><p>Clinics / Healthcare</p><p>D2C brands</p><p>Selected local services</p></div><div><span>Signal</span><p>Acquire → Convert</p><p>Retain → Scale</p><button onClick={() => setAuditOpen(true)}>Start a conversation <ArrowRight size={14} /></button></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} AdSyncd — Headquarters</span><span>Ads don't create growth. Systems do.</span></div></footer>
    {auditOpen && <AuditModal onClose={() => setAuditOpen(false)} />}
  </div>;
}
