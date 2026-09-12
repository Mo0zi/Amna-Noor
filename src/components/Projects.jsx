import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { 
    id: 2, 
    title: "NoMoreDMS", 
    category: "SaaS & Supabase", 
    desc: "Simplifies resource sharing for creators, eliminating 'Check DM' bottlenecks.", 
    link: "https://nomoredms.vercel.app/",
    image: "/assets/nomoredms.png"
  },
  { 
    id: 3, 
    title: "EduCalc", 
    category: "React & TypeScript", 
    desc: "An educational platform designed to help students access mathematical and academic tools.", 
    link: "https://educalc-expert0509.vercel.app/",
    image: "/assets/educalc.png"
  },
  { 
    id: 4, 
    title: "PostLearn", 
    category: "NextJS UI", 
    desc: "Modern engaging interface built to deliver fluid learning layouts and landing pages.", 
    link: "https://postlearn-lake.vercel.app/",
    image: "/assets/postlearn.png"
  },
  { 
    id: 5, 
    title: "Cozy Cafe Website", 
    category: "Food & Hospitality", 
    desc: "Bespoke cafe website featuring online menus, ambiance galleries, and reservations.", 
    link: "https://cozy-cafa1.netlify.app/",
    image: "/assets/cozy-cafe.png"
  },
  { 
    id: 7, 
    title: "TeamZ Website", 
    category: "Corporate Web", 
    desc: "Professional landing page and services deck built for corporate and agency structures.", 
    link: "https://teamz09.netlify.app/",
    image: "/assets/teamz.png"
  }
];

export default function Projects() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      // GSAP Horizontal Scroll Pinning
      gsap.to(scrollContainerRef.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative min-h-screen bg-zinc-950 overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Background Typography Watermark with premium styling */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="text-[25vw] font-black uppercase tracking-tighter text-transparent stroke-2 stroke-white/[0.012] leading-none select-none">
          CREATIVE
        </h2>
      </div>

      {/* Proper Typography Header (No overlapping) */}
      <div className="absolute top-16 left-6 md:left-16 z-20">
        <span className="text-xs uppercase tracking-[0.4em] font-black text-yellow-400 block mb-2">
          &bull; SELECTED PROJECTS
        </span>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
          MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">WORK</span>
        </h2>
      </div>

      {/* Horizontal Scroll wrapper - shifted down with mt-24 to avoid header overlap */}
      <div className="h-screen mt-24 flex items-center">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 px-6 sm:px-12 md:px-24 whitespace-nowrap will-change-transform items-center"
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="inline-block w-[280px] sm:w-[360px] md:w-[460px] bg-zinc-900/40 border border-white/10 rounded-[32px] p-5 md:p-6 backdrop-blur-md shadow-2xl flex flex-col justify-between whitespace-normal select-text group hover:border-yellow-400/50 hover:shadow-[0_0_50px_rgba(250,204,21,0.05)] transition-all duration-300 overflow-hidden"
            >
              {/* Project Image Container */}
              <div className="w-full h-[140px] sm:h-[180px] md:h-[230px] rounded-2xl overflow-hidden mb-6 relative border border-white/5 bg-zinc-950">
                <img
                  src={project.image}
                  alt={`Amna Noor Portfolio Project - ${project.title} - ${project.category}`}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Index Number Tag */}
                <div className="absolute top-4 right-4 bg-zinc-950/80 border border-white/15 px-3 py-1 rounded-full text-xs font-black text-yellow-400 backdrop-blur-md select-none">
                  0{idx + 1}
                </div>
              </div>

              {/* Card Meta */}
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-yellow-400">
                  {project.category}
                </span>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight leading-none mt-2 group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-medium mt-3">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
