import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// Inline SVGs
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const XIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const MessageSquareIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
const StarIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({ name: '', role: '', message: '' });
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const linksRef = useRef([]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-logo', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from(linksRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });
      gsap.from('.nav-cta', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'back.out(1.7)',
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Scroll to section
  const handleScrollTo = (sectionId) => {
    setIsOpen(false);
    if (window.lenis) {
      window.lenis.scrollTo(`#${sectionId}`, { duration: 1.2 });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackForm.name || !feedbackForm.message) {
      alert("Name and Message are required");
      return;
    }
    const existing = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const newTestimonial = {
      ...feedbackForm,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem('testimonials', JSON.stringify([...existing, newTestimonial]));
    
    window.dispatchEvent(new Event('new-testimonial'));

    setFeedbackForm({ name: '', role: '', message: '' });
    setShowFeedback(false);
    alert("Thank you for your testimonial!");
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 backdrop-blur-md border-b border-white/5 bg-zinc-950/20 py-4 px-6 md:px-12 flex items-center justify-between ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Logo */}
        <div 
          onClick={() => handleScrollTo('home')}
          className="nav-logo text-2xl font-black uppercase tracking-widest text-white cursor-pointer select-none group"
        >
          Amna<span className="text-yellow-400 group-hover:text-yellow-300 transition-colors drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">.design</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-semibold tracking-wide">
          {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((item, idx) => (
            <button
              key={item}
              ref={(el) => (linksRef.current[idx] = el)}
              onClick={() => handleScrollTo(item.toLowerCase())}
              className="relative text-sm text-gray-300 hover:text-white transition-colors py-1 group uppercase tracking-widest cursor-pointer"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFeedback(true)}
            className="nav-cta hidden sm:flex items-center gap-2 border border-yellow-400/50 hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] text-yellow-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            <MessageSquareIcon size={14} />
            Testimonial
          </button>
          
          {/* Mobile Hamburguer */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-yellow-400 transition-colors cursor-pointer"
          >
            {isOpen ? <XIcon size={28} /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-3xl flex flex-col justify-center items-center gap-8 animate-[fadeIn_0.3s_ease-out]">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-yellow-400 transition-colors"
          >
            <XIcon size={32} />
          </button>
          
          <div className="flex flex-col gap-6 text-center">
            {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleScrollTo(item.toLowerCase())}
                className="text-4xl font-black text-gray-200 hover:text-yellow-400 transition-colors uppercase tracking-widest"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                setShowFeedback(true);
              }}
              className="mt-4 flex items-center justify-center gap-2 bg-yellow-400 text-black shadow-[0_0_25px_rgba(250,204,21,0.5)] px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-yellow-300 transition-all"
            >
              <StarIcon size={16} />
              Add Testimonial
            </button>
          </div>
        </div>
      )}

      {/* Feedback Testimonial Modal Popup */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-zinc-900/90 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative">
            <button
              onClick={() => setShowFeedback(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <XIcon size={20} />
            </button>

            <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-wide">
              Add Testimonial
            </h3>
            <p className="text-xs text-zinc-400 mb-6 uppercase tracking-wider">
              Share your experience working with me.
            </p>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-bold">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={feedbackForm.name}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                  className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-bold">
                  Role / Company
                </label>
                <input
                  type="text"
                  placeholder="e.g. CEO, TechCorp"
                  value={feedbackForm.role}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, role: e.target.value })}
                  className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-bold">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Your kind words..."
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                  className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold uppercase tracking-wider text-xs py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] cursor-pointer"
              >
                Submit Testimonial
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
