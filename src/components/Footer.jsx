import React from 'react';
import { ExternalLink, Star } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[#f4c400] text-zinc-950 overflow-hidden py-16 px-6 md:px-12 flex flex-col items-center">
      
      {/* Layered Animated Background Marquee Rows (Low Opacity) */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none z-0 opacity-10">
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div className="text-[12vw] font-black tracking-tighter uppercase animate-marquee-left">
            AMNA &bull; NOOR &bull; UI/UX &bull; AMNA &bull; NOOR &bull; UI/UX &bull;
          </div>
        </div>
        <div className="w-full overflow-hidden flex whitespace-nowrap -mt-4">
          <div className="text-[12vw] font-black tracking-tighter uppercase animate-marquee-right">
            PRODUCT BUILDER &bull; DESIGNER &bull; SAAS &bull; PRODUCT BUILDER &bull; DESIGNER &bull; SAAS &bull;
          </div>
        </div>
        <div className="w-full overflow-hidden flex whitespace-nowrap -mt-4">
          <div className="text-[12vw] font-black tracking-tighter uppercase animate-marquee-left">
            AI PRODUCTS &bull; AUTOMATION &bull; LANDING PAGES &bull; AI PRODUCTS &bull; AUTOMATION &bull;
          </div>
        </div>
        <div className="w-full overflow-hidden flex whitespace-nowrap -mt-4">
          <div className="text-[12vw] font-black tracking-tighter uppercase animate-marquee-right">
            INTERACTIVE &bull; FUTURE &bull; DIGITAL &bull; INTERACTIVE &bull; FUTURE &bull; DIGITAL &bull;
          </div>
        </div>
      </div>

      {/* Main Content Overlay Container */}
      <div className="relative max-w-6xl w-full flex flex-col items-center text-center z-10 space-y-8 select-text">
        
        {/* Floating Profile Image Center Showcase */}
        <div className="relative group">
          <div className="absolute inset-0 rounded-full bg-white/20 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-950 shadow-2xl relative z-10 transform transition-transform duration-500 hover:scale-105">
            <img
              src="/hero_profile.jpg"
              alt="Leeshark Footer Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Premium CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Blue Follow Button with neon glow */}
          <a
            href="https://www.linkedin.com/in/amnanoor/"
            target="_blank"
            rel="noreferrer"
            className="bg-[#2563eb] text-white hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
          >
            <Star size={14} className="fill-white" />
            Follow Me
          </a>

          {/* White message button */}
          <button
            onClick={() => handleScrollTo('contact')}
            className="bg-white text-zinc-950 hover:bg-zinc-100 hover:shadow-lg px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border border-zinc-200"
          >
            Message Me
          </button>
        </div>

        {/* Luxury Branding */}
        <div className="pt-4 select-none">
          <div className="text-3xl font-black uppercase tracking-widest">
            AMNA<span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">.DESIGN</span>
          </div>
          <p className="text-[10px] uppercase font-extrabold tracking-[0.3em] text-zinc-800 mt-1">
            Crafting the Future of Digital Experiences
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-black uppercase tracking-widest text-zinc-900">
          {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleScrollTo(item.toLowerCase())}
              className="hover:text-white transition-colors duration-300 cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-zinc-950/20 rounded-full max-w-4xl"></div>

        {/* Copyright & Legal Links */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between max-w-4xl pt-4 text-[10px] font-bold uppercase tracking-wider text-zinc-800 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Amna.design. All Rights Reserved.
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
