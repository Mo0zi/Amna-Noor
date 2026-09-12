import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Inline SVGs for social media & send
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
const SendIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
);

const SOCIALS = [
  { name: 'Instagram', icon: InstagramIcon, action: 'https://www.instagram.com/connects.ai' },
  { name: 'LinkedIn', icon: LinkedInIcon, action: 'https://www.linkedin.com/in/amnanoor/' },
  { name: 'GitHub', icon: GitHubIcon, action: 'https://github.com/amnanoor' }
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning scroll trigger effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      });

      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("Name and Message are required!");
      return;
    }

    const formattedMsg = encodeURIComponent(
      `Hello Amna,\n\nMy name is ${formData.name}.\nEmail: ${formData.email || 'Not provided'}\n\nMessage: ${formData.message}`
    );
    const mailtoUrl = `mailto:aminaxx092@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${formattedMsg}`;

    window.location.href = mailtoUrl;
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] rounded-t-[40px] flex flex-col justify-center items-center py-20 px-6 md:px-12 overflow-hidden z-10"
    >
      {/* Massive Background Typography CONNECT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="text-[25vw] font-black text-white/[0.03] tracking-tighter uppercase leading-none select-none">
          CONNECT
        </h2>
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Section: Info & Socials */}
        <div className="flex flex-col space-y-8">
          <div ref={headingRef}>
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-yellow-400">
              Hire AmnaNoor Eng
            </span>
            <h2 className="text-5xl md:text-[8vw] font-black text-white uppercase tracking-tighter leading-none mt-2">
              Let's Talk
            </h2>
          </div>

          <p className="text-zinc-400 max-w-md text-sm md:text-base leading-relaxed">
            Have a project in mind? Reach out to AmnaNoor Eng and let's craft something outstanding.
          </p>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-widest block">
              Direct Mail
            </span>
            <a
              href="mailto:aminaxx092@gmail.com"
              className="text-base md:text-lg font-black text-white hover:text-yellow-400 transition-colors"
            >
              aminaxx092@gmail.com
            </a>
          </div>

          {/* Social Platforms Row */}
          <div className="flex flex-wrap gap-4 pt-4">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.action}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white bg-transparent transition-all duration-500 hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                  title={social.name}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Section: Glassmorphism Form */}
        <div className="w-full max-w-xl bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-bold">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-bold">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-bold">
                Your Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <SendIcon />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
