import React, { useEffect, useState } from 'react';
import { Quote, CheckCircle2 } from 'lucide-react';

const DEFAULT_TESTIMONIALS = [
  { id: 1, name: "Sarah Connor", role: "Product Lead at Cyberdyne", message: "Amna delivered an absolutely outstanding website with high-end motion design. Strongly recommended!", date: "07/15/2026" },
  { id: 2, name: "Miles Dyson", role: "Chief Scientist", message: "The custom interactive 3D elements and smooth navigation blew our expectations. A premium experience.", date: "06/29/2026" },
  { id: 3, name: "John Connor", role: "Founder of Resistance", message: "Intuitive UX, perfect code structure, and visually striking interface. The animation is top-tier.", date: "07/02/2026" },
  { id: 4, name: "Marcus Wright", role: "Director at Skynet Tech", message: "Incredible attention to detail. The background color switcher and mask reveal is true art direction.", date: "05/18/2026" }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);

  const loadTestimonials = () => {
    const local = JSON.parse(localStorage.getItem('testimonials') || '[]');
    setTestimonials([...DEFAULT_TESTIMONIALS, ...local]);
  };

  useEffect(() => {
    loadTestimonials();
    window.addEventListener('new-testimonial', loadTestimonials);
    return () => window.removeEventListener('new-testimonial', loadTestimonials);
  }, []);

  // Split testimonials for two rows
  const midIndex = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, midIndex);
  const secondRow = testimonials.slice(midIndex);

  return (
    <section id="testimonials" className="py-20 relative bg-zinc-950 text-white border-t border-white/5 overflow-hidden">
      {/* Soft edge reveal mask overlays */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none"></div>

      <div className="text-center mb-12 px-6">
        <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-yellow-400">
          Client Love
        </span>
        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mt-2">
          What people are saying
        </h3>
      </div>

      {/* Marquee Row 1: Left moving */}
      <div className="w-full overflow-hidden flex py-4">
        <div className="flex gap-6 whitespace-nowrap animate-marquee-left hover:[animation-play-state:paused]">
          {[...firstRow, ...firstRow].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="inline-block w-[300px] md:w-[450px] bg-zinc-900/80 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-extrabold text-white text-base md:text-lg flex items-center gap-1">
                    {item.name}
                    <CheckCircle2 size={16} className="text-yellow-400 fill-yellow-400/20" />
                  </h4>
                  <p className="text-xs text-zinc-400">{item.role}</p>
                </div>
                <Quote size={24} className="text-yellow-400/40" />
              </div>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed whitespace-normal italic">
                "{item.message}"
              </p>
              <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mt-4">
                Verified Client &bull; {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2: Right moving */}
      <div className="w-full overflow-hidden flex py-4 mt-4">
        <div className="flex gap-6 whitespace-nowrap animate-marquee-right hover:[animation-play-state:paused]">
          {[...secondRow, ...secondRow].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="inline-block w-[300px] md:w-[450px] bg-zinc-900/80 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-extrabold text-white text-base md:text-lg flex items-center gap-1">
                    {item.name}
                    <CheckCircle2 size={16} className="text-yellow-400 fill-yellow-400/20" />
                  </h4>
                  <p className="text-xs text-zinc-400">{item.role}</p>
                </div>
                <Quote size={24} className="text-yellow-400/40" />
              </div>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed whitespace-normal italic">
                "{item.message}"
              </p>
              <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mt-4">
                Verified Client &bull; {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
