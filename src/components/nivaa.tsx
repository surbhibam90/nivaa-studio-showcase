import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Building2, ChevronUp, Home, Lamp, Leaf, Menu, Play, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import living from "@/assets/nivaa-living.jpg";
import dining from "@/assets/nivaa-dining.jpg";
import retail from "@/assets/nivaa-retail.jpg";
import materials from "@/assets/nivaa-materials.jpg";
import videoAsset from "@/assets/hero-video-web.mp4.asset.json";
import posterAsset from "@/assets/hero-poster.jpg.asset.json";

export const imagery = { living, dining, retail, materials };

const links = [
  { label: "Home", to: "/" as const },
  { label: "About" },
  { label: "Services", to: "/services" as const },
  { label: "Portfolio", to: "/portfolio" as const },
  { label: "Process" },
  { label: "Contact" },
];

export function Brand() {
  return <Link to="/" className="block shrink-0" aria-label="NIVAA home"><span className="block font-display text-[1.65rem] leading-none tracking-[.22em]">NIVAA</span><span className="mt-1 block text-[.43rem] tracking-[.14em]">SPACES THAT FEEL LIKE YOU</span></Link>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 30); onScroll(); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <>
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 py-3 shadow-soft backdrop-blur-xl" : "py-5 md:py-7"}`}>
      <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
        <Brand />
        <nav className="hidden items-center justify-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(link => link.to ? <Link key={link.label} to={link.to} className={`nav-link ${pathname === link.to ? "is-active" : ""}`}>{link.label}</Link> : <button key={link.label} type="button" title="Coming soon" className="nav-link opacity-55">{link.label}</button>)}
        </nav>
        <div className="hidden lg:block"><Button asChild variant="nivaaOutline" size="lg"><a href="mailto:hello@nivaastudio.com">Let&apos;s Talk <ArrowRight /></a></Button></div>
        <Button variant="ghost" size="icon" className="h-11 w-11 justify-self-end rounded-full lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu className="size-5" /></Button>
      </div>
    </header>
    <AnimatePresence>{open && <motion.div className="fixed inset-0 z-[60] bg-forest text-forest-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="shell flex h-full flex-col py-6"><div className="flex items-center justify-between"><Brand/><Button variant="ghost" size="icon" className="rounded-full text-forest-foreground" onClick={() => setOpen(false)} aria-label="Close menu"><X /></Button></div>
      <nav className="my-auto flex flex-col items-start gap-4">{links.map((link, i) => link.to ? <motion.div key={link.label} initial={{y:18,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:i*.06}}><Link to={link.to} onClick={()=>setOpen(false)} className="font-display text-5xl">{link.label}</Link></motion.div> : <span key={link.label} className="font-display text-5xl opacity-35">{link.label}</span>)}</nav>
      <a href="mailto:hello@nivaastudio.com" className="text-sm uppercase tracking-[.2em]">Let&apos;s create something personal →</a></div>
    </motion.div>}</AnimatePresence>
  </>;
}

export function Reveal({ children, className="" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, margin: "-8%" }); const reduce = useReducedMotion();
  return <motion.div ref={ref} className={className} initial={reduce ? false : { opacity:0, y:24 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{duration:.75,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}

export function Eyebrow({children}:{children:ReactNode}) { return <p className="mb-4 text-[.65rem] font-semibold uppercase tracking-[.32em] text-muted-foreground">{children}</p>; }
export function ArrowButton({children, outline=false}:{children:ReactNode;outline?:boolean}) { return <Button asChild variant={outline?"nivaaOutline":"nivaa"} size="lg"><a href="mailto:hello@nivaastudio.com">{children}<span className="grid size-7 place-items-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:translate-x-1"><ArrowRight className="size-3.5"/></span></a></Button>; }

export function HeroVideo({ full = false }: { full?: boolean }) {
  const video = useRef<HTMLVideoElement>(null); const [active,setActive]=useState(full);
  useEffect(()=>{if(active){video.current?.play().catch(()=>setActive(false))}},[active]);
  const start=()=>setActive(true);
  const stop=()=>{setActive(false); if(video.current){video.current.pause(); video.current.currentTime=0}};
  return <div className={full?"group absolute inset-0 cursor-pointer overflow-hidden":"hero-media group"} onMouseEnter={full?undefined:start} onMouseLeave={full?undefined:stop} onClick={()=>active?stop():start()} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();active?stop():start()}}} aria-label={active?"Stop living room film":"Play living room film"} aria-pressed={active}>
    <img src={posterAsset.url} alt="Sunlit NIVAA living room" width="1280" height="720" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${active?"opacity-0":"opacity-100"}`}/>
    <video ref={video} src={videoAsset.url} poster={posterAsset.url} muted playsInline loop={full} preload={full?"auto":"metadata"} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${active?"opacity-100":"opacity-0"}`} onEnded={full?undefined:stop}/>
    <span className="absolute bottom-6 right-6 z-10 grid size-12 place-items-center rounded-full border border-background/65 bg-background/80 backdrop-blur-md transition-opacity">{full?(active?<span className="h-3.5 w-2.5 border-x-[3px] border-foreground"/>:<Play className="size-4 fill-current"/>):<Play className="size-4 fill-current"/>}</span>
    {!full&&<span className="absolute bottom-8 left-8 hidden text-[.58rem] uppercase tracking-[.25em] text-background drop-shadow-md md:block">Hover to step inside</span>}
  </div>;
}

export function PageHero({eyebrow,title,copy,cta,image=imagery.living}:{eyebrow:string;title:ReactNode;copy:string;cta:string;image?:string}) {
 return <section className="page-hero"><div className="shell grid items-center gap-10 pt-32 pb-20 lg:grid-cols-[.76fr_1.24fr] lg:pt-40 lg:pb-28"><Reveal><Eyebrow>{eyebrow}</Eyebrow><h1 className="display-xl">{title}</h1><p className="mt-6 max-w-md text-muted-foreground">{copy}</p><div className="mt-8"><ArrowButton>{cta}</ArrowButton></div></Reveal><Reveal className="relative"><img src={image} alt="Warm contemporary interior by NIVAA" width={1536} height={1024} className="page-hero-image"/><span className="script-note absolute -bottom-7 right-5 rotate-[-8deg]">Spaces designed<br/>around you</span></Reveal></div></section>;
}

const footerLinks = links;
export function Footer() { return <footer className="bg-background py-12"><div className="shell"><div className="grid gap-10 border-b border-border pb-10 md:grid-cols-[1fr_auto]"><Brand/><nav className="flex flex-wrap gap-x-7 gap-y-3 text-xs">{footerLinks.map(x=>x.to?<Link key={x.label} to={x.to}>{x.label}</Link>:<span key={x.label} className="opacity-50">{x.label}</span>)}</nav></div><div className="flex flex-col gap-4 pt-7 text-[.65rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© 2026 NIVAA. All rights reserved.</span><div className="flex gap-5"><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">LinkedIn</a></div><span>Design for a Kinder, Brighter Tomorrow.</span></div></div></footer>; }

export function FinalCTA({conversation=false}:{conversation?:boolean}) { return <section className="cta-band"><div className="shell grid items-center gap-8 py-16 md:grid-cols-[.85fr_1.2fr_auto]"><img src={imagery.dining} alt="Calm dining space by NIVAA" loading="lazy" width={1536} height={1024} className="h-44 w-full object-cover blob-a md:h-52"/><div><Eyebrow>Have a project in mind?</Eyebrow><h2 className="display-md text-forest-foreground">Let&apos;s Create a Space<br/><em>You&apos;ll Love</em></h2></div><ArrowButton outline>{conversation?"Start a Conversation":"Schedule a Consultation"}</ArrowButton></div></section>; }

export const serviceIcons=[Home,Building2,Lamp,Leaf];
export function ScrollTop(){return <button aria-label="Back to top" className="fixed bottom-5 right-5 z-40 grid size-10 place-items-center rounded-full bg-background shadow-soft" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}><ChevronUp className="size-4"/></button>}