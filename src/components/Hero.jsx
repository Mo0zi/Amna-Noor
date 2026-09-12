import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Inline SVGs for social media icons
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const SOCIAL_PLATFORMS = [
  { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/connects.ai', color: 'hover:text-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:border-pink-500' },
  { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/amnanoor/', color: 'hover:text-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:border-blue-500' },
  { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/amnanoor', color: 'hover:text-neutral-900 hover:shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:border-zinc-950' }
];

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const words = ["Web Developer", "Product Builder", "AI Integrator", "UI/UX Designer"];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
        y: -50,
        opacity: 0,
      });

      gsap.to(imgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
        y: 100,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen bg-zinc-950 text-white flex items-center px-6 md:px-16 overflow-hidden py-24 z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section: Text Content */}
        <div ref={textRef} className="flex flex-col justify-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-zinc-400">
            Premium Web Architect &amp; Product Builder
          </span>
          
          <h1 className="text-5xl md:text-[5vw] font-black uppercase leading-[0.95] tracking-tighter text-white">
            Hello, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 drop-shadow-sm">amnanoor ai</span>
          </h1>

          {/* Rolling Word Container */}
          <div className="h-[50px] overflow-hidden relative">
            {words.map((word, idx) => (
              <div
                key={word}
                className="absolute inset-0 text-2xl md:text-3xl font-extrabold text-zinc-100 transition-all duration-700 flex items-center"
                style={{
                  transform: `translateY(${(idx - activeWordIdx) * 100}%)`,
                  opacity: idx === activeWordIdx ? 1 : 0,
                }}
              >
                &amp;&nbsp;Innovative <span className="text-yellow-400 ml-2 font-black">{word}</span>
              </div>
            ))}
          </div>

          <p className="text-zinc-400 max-w-lg text-sm md:text-base leading-relaxed font-medium">
            Hi, I'm Amna, a Full-Stack Web Developer and UI/UX-focused Product Builder. I specialize in designing and developing premium websites, SaaS platforms, AI-powered applications, and modern digital experiences.
          </p>

          {/* Social Icons Container */}
          <div className="flex gap-4 pt-4">
            {SOCIAL_PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-300 bg-zinc-900/60 transition-all duration-300 ${platform.color} hover:scale-115`}
                  title={platform.name}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Section: Hero Image */}
        <div className="flex justify-center items-center relative">
          <div className="absolute w-[80%] h-[80%] rounded-full bg-yellow-400/10 filter blur-3xl -z-10 animate-[pulse_6s_infinite]"></div>
          
          <div
            ref={imgRef}
            className="w-full max-w-[450px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src="/hero_profile.jpg"
              alt="amnanoor ai - Premium Web Architect Portfolio"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
