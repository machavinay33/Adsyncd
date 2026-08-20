/* AdSyncd Signal Console: protected admin console using the same dark navy, cyan signal, and DM Mono system language as the public site. */
import { useEffect, useMemo, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { ArrowLeft, LogOut, RefreshCcw, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

type GrowthAudit = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  industry: string;
  revenue: string;
  spend: string;
  challenge: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function LoginPanel({ onLogin }: { onLogin: (email: string, password: string) => Promise<string | null> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const result = await onLogin(email, password);
    if (result) setError(result);
    setBusy(false);
  }

  return <main className="admin-shell"><div className="admin-login"><div className="admin-mark"><ShieldCheck size={24} /></div><p className="eyebrow">ADSYNCD / PRIVATE CONSOLE</p><h1>Signal access.</h1><p className="admin-intro">Sign in to review Growth Audit submissions. This space is separate from the public site.</p><form className="admin-form" onSubmit={submit}><label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" autoComplete="email" /></label><label>Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" autoComplete="current-password" /></label>{error && <p className="admin-error">{error}</p>}<button className="button button-primary full-width" disabled={busy}>{busy ? "Checking access…" : "Open admin console"}</button></form><Link href="/" className="admin-back"><ArrowLeft size={14} /> Back to AdSyncd</Link></div></main>;
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [audits, setAudits] = useState<GrowthAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadAudits() {
    if (!supabase || !session) return;
    setLoading(true);
    setError("");
    const { data, error: queryError } = await supabase.from("growth_audits").select("*").order("created_at", { ascending: false });
    if (queryError) setError(queryError.message);
    else setAudits((data ?? []) as GrowthAudit[]);
    setLoading(false);
  }

  useEffect(() => { if (session) loadAudits(); }, [session]);

  async function login(email: string, password: string) {
    if (!supabase) return "Supabase environment variables are missing from this deployment.";
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    return loginError?.message ?? null;
  }

  async function logout() { await supabase?.auth.signOut(); setAudits([]); }
  const industries = useMemo(() => new Set(audits.map((audit) => audit.industry)).size, [audits]);

  if (loading && !session) return <main className="admin-shell"><div className="admin-loading">Loading private console…</div></main>;
  if (!session) return <LoginPanel onLogin={login} />;

  return <main className="admin-shell"><div className="admin-container"><header className="admin-header"><div><p className="eyebrow">ADSYNCD / PRIVATE CONSOLE</p><h1>Growth Audit inbox.</h1><p className="admin-intro">Authenticated submissions, organized for the next conversation.</p></div><div className="admin-actions"><button className="admin-icon-button" onClick={loadAudits} aria-label="Refresh submissions"><RefreshCcw size={16} /></button><button className="admin-logout" onClick={logout}><LogOut size={15} /> Sign out</button></div></header><section className="admin-stats"><div><span>SUBMISSIONS</span><strong>{audits.length}</strong></div><div><span>INDUSTRIES</span><strong>{industries}</strong></div><div><span>ACCESS</span><strong className="admin-live"><i />LIVE</strong></div></section>{error && <div className="admin-error admin-query-error">{error}<span>Run the authenticated SELECT policy from the setup SQL.</span></div>}<section className="audit-table-wrap"><div className="audit-table-heading"><h2>Incoming signals</h2><span>{audits.length ? `${audits.length} record${audits.length === 1 ? "" : "s"}` : "No records yet"}</span></div>{audits.length ? <div className="audit-table-scroll"><table className="audit-table"><thead><tr><th>Received</th><th>Contact</th><th>Business</th><th>Economics</th><th>Challenge</th></tr></thead><tbody>{audits.map((audit) => <tr key={audit.id}><td>{formatDate(audit.created_at)}</td><td><strong>{audit.name}</strong><a href={`mailto:${audit.email}`}>{audit.email}</a>{audit.phone && <span>{audit.phone}</span>}</td><td><strong>{audit.company}</strong><span>{audit.industry}</span></td><td><span>Revenue {audit.revenue}</span><span>Spend {audit.spend}</span></td><td>{audit.challenge}</td></tr>)}</tbody></table></div> : <div className="admin-empty"><ShieldCheck size={22} /><h3>Your inbox is clear.</h3><p>New Growth Audit submissions will appear here after the public form is submitted.</p></div>}</section><Link href="/" className="admin-back"><ArrowLeft size={14} /> Back to public site</Link></div></main>;
}
