import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const containerRef = useRef(null);
  const scaleImageRef = useRef(null);
  const welcomeTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Screen 1: Morphing scaling effect of the background
      gsap.fromTo(scaleImageRef.current, 
        { scale: 1, opacity: 0.1 },
        {
          scale: 3.8,
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          }
        }
      );

      // Welcome Text scale/parallax
      gsap.fromTo(welcomeTextRef.current,
        { y: 150, opacity: 0 },
        {
          y: -100,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "center center",
            scrub: 1.2
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="welcome"
      ref={containerRef}
      className="relative min-h-[200vh] bg-gradient-to-b from-zinc-950 to-zinc-900 text-white overflow-hidden z-10"
    >
      {/* Visual Effects: Noise overlay + soft gradient fade */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>
      
      {/* Screen 1: Welcome typography and scale overlay */}
      <div className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
        {/* Scaling Background continuation */}
        <div
          ref={scaleImageRef}
          className="absolute w-[350px] h-[350px] bg-cover bg-center rounded-full pointer-events-none filter blur-[4px] mix-blend-overlay opacity-15"
          style={{ backgroundImage: `url('/hero_profile.jpg')` }}
        />

        <div ref={welcomeTextRef} className="text-center z-10 px-4 select-none">
          <h2 className="text-[18vw] font-black tracking-tighter text-white/[0.04] leading-none select-none">
            WELCOME
          </h2>
          <p className="text-xl md:text-3xl font-light text-zinc-400 tracking-widest uppercase mt-4">
            To my creative space
          </p>
        </div>
      </div>
    </section>
  );
}
