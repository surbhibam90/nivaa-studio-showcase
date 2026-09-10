import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Home, Lamp, Leaf } from "lucide-react";
import { motion } from "motion/react";
import { ArrowButton, Eyebrow, FinalCTA, HeroVideo, imagery, Reveal } from "@/components/nivaa";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "NIVAA — Spaces That Feel Like You" },
    { name: "description", content: "NIVAA is a premium interior design studio creating soulful homes, workplaces and spaces across India." },
    { property: "og:title", content: "NIVAA — Spaces That Feel Like You" },
    { property: "og:description", content: "Soulful, functional interiors designed around the way you live." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: HomePage,
});

const services=[
  {title:"Residential Interiors",icon:Home,copy:"Homes shaped around your rituals and rhythms."},
  {title:"Commercial Spaces",icon:Building2,copy:"Purposeful places for people and ideas."},
  {title:"Furniture & Styling",icon:Lamp,copy:"The final layer that makes a room yours."},
  {title:"Turnkey Solutions",icon:Leaf,copy:"One thoughtful journey, concept to completion."},
];
const projects=[
  {name:"Modern Villa",place:"Ahmedabad",image:imagery.living,shape:"blob-a"},
  {name:"Urban Apartment",place:"Mumbai",image:imagery.dining,shape:"blob-b"},
  {name:"Luxury Office",place:"Bengaluru",image:imagery.retail,shape:"arch"},
  {name:"Cozy Bedroom",place:"Jamnagar",image:imagery.living,shape:"blob-b"},
];
const serviceSurfaces=["bg-sage/55 blob-a","bg-sand/55 blob-b","bg-sage/55 blob-a","bg-sand/55 blob-b"];

function HomePage(){return <main>
  <section className="relative overflow-hidden pt-28 md:pt-36"><div className="shell grid min-h-[790px] items-center gap-10 pb-28 lg:grid-cols-[.68fr_1.32fr]">
    <Reveal><Eyebrow>Interior Design Studio</Eyebrow><h1 className="display-xl">Beautiful<br/>Spaces<br/><em>Brighter</em> Lives</h1><p className="mt-7 max-w-sm text-sm leading-7 text-muted-foreground">We design soulful, functional and timeless spaces that reflect your story.</p><div className="mt-7"><Link to="/portfolio" className="inline-flex items-center gap-3 rounded-full bg-primary py-2.5 pr-2.5 pl-5 text-sm text-primary-foreground">Explore Our Work <span className="grid size-8 place-items-center rounded-full bg-background text-foreground"><ArrowRight className="size-4"/></span></Link></div>
    <div className="mt-14 grid max-w-md grid-cols-3 divide-x divide-border"><Stat n="150+" t="Projects"/><Stat n="100+" t="Happy Clients"/><Stat n="8+" t="Years of Experience"/></div></Reveal><Reveal><HeroVideo/></Reveal>
  </div><div className="absolute -bottom-16 -left-[10%] h-36 w-[70%] rounded-[50%] bg-sage/45"/></section>

  <section className="bg-sage/45 py-24 md:py-32"><div className="shell grid items-center gap-14 md:grid-cols-2"><Reveal className="relative"><img src={imagery.dining} loading="lazy" alt="NIVAA dining room" width={1536} height={1024} className="blob-b h-[28rem] w-full object-cover"/><span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background shadow-soft"><span className="ml-1 border-y-[7px] border-l-[11px] border-y-transparent border-l-foreground"/></span></Reveal><Reveal><Eyebrow>Who We Are</Eyebrow><h2 className="display-lg">Designing<br/><em>More</em> Than Spaces</h2><p className="mt-6 max-w-lg leading-7 text-muted-foreground">We create soulful, functional interiors around how people truly live—spaces with ease, warmth and a sense of belonging.</p><a href="mailto:hello@nivaastudio.com" className="mt-7 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm">Our Story <ArrowRight className="size-4"/></a></Reveal></div></section>

  <section className="relative bg-background py-24"><div className="shell"><Reveal><Eyebrow>What We Do</Eyebrow><h2 className="display-md">Spaces for Every Story</h2></Reveal><div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{services.map((s,i)=><Reveal key={s.title}><motion.article whileHover={{y:-7}} className="group"><div className={`grid aspect-[.9] place-items-center ${serviceSurfaces[i]}`}><s.icon strokeWidth={1.2} className="size-11"/></div><h3 className="mt-5 font-display text-2xl">{s.title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{s.copy}</p><ArrowRight className="mt-4 size-4 transition-transform group-hover:translate-x-1"/></motion.article></Reveal>)}</div></div></section>

  <section className="bg-muted/50 py-24"><div className="shell"><Reveal className="mb-12 flex items-end justify-between gap-6"><div><Eyebrow>Featured Work</Eyebrow><h2 className="display-md">Spaces<br/>That Speak</h2></div><Link to="/portfolio" className="hidden items-center gap-2 text-sm md:flex">View all projects <ArrowRight className="size-4"/></Link></Reveal><div className="grid gap-5 md:grid-cols-12">{projects.map((p,i)=><Project key={p.name} {...p} className={i===0?"md:col-span-5":i===1?"md:col-span-3":"md:col-span-2"}/>)}</div></div></section>

  <section className="relative overflow-hidden bg-forest py-24 text-forest-foreground"><div className="shell grid items-center gap-12 md:grid-cols-[.8fr_1.1fr_1fr]"><Reveal><span className="font-display text-7xl">“</span><blockquote className="font-display text-3xl italic leading-tight">The team understood our vision so well, the result feels like home — just better.</blockquote><p className="mt-5 text-xs uppercase tracking-[.18em]">Riya & Karan</p></Reveal><img src={imagery.dining} loading="lazy" alt="Dining space designed for a client" width={1536} height={1024} className="blob-a h-72 w-full object-cover"/><Reveal><Eyebrow>Client Love</Eyebrow><h2 className="display-md">Spaces Loved<br/>by Real People</h2></Reveal></div></section>
  <FinalCTA conversation/>
 </main>}

function Stat({n,t}:{n:string;t:string}){return <div className="px-4 first:pl-0"><strong className="block font-display text-3xl font-normal">{n}</strong><span className="text-[.6rem] text-muted-foreground">{t}</span></div>}
function Project({name,place,image,shape,className=""}:{name:string;place:string;image:string;shape:string;className?:string}){return <motion.article whileHover="hover" className={`group ${className}`}><div className={`relative h-80 overflow-hidden ${shape}`}><motion.img variants={{hover:{scale:1.04}}} transition={{duration:.7}} src={image} loading="lazy" alt={`${name} interior`} width={1536} height={1024} className="h-full w-full object-cover"/></div><div className="mt-4 flex items-center justify-between"><div><h3 className="font-display text-xl">{name}</h3><p className="text-[.55rem] uppercase text-muted-foreground">{place}</p></div><span className="grid size-8 place-items-center rounded-full bg-secondary"><ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1"/></span></div></motion.article>}