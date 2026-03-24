'use client';

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#fde1c3]`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#ff6b00]">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
          </svg>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 leading-none mb-1">THE FUTURE</span>
            <span className="text-xl font-bold font-sans tracking-tight text-[#ff00ff] leading-none">
              NanoBanana.
            </span>
          </div>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          <button className="text-[11px] font-bold tracking-widest text-gray-700 hover:text-[#ff6b00] transition-colors">JUICES</button>
          <button className="text-[11px] font-bold tracking-widest text-gray-700 hover:text-[#ff6b00] transition-colors">OUR STORY</button>
          <button className="text-[11px] font-bold tracking-widest text-gray-700 hover:text-[#ff6b00] transition-colors">HEALTH BENEFITS</button>
          <button className="text-[11px] font-bold tracking-widest text-gray-700 hover:text-[#ff6b00] transition-colors">SHOP</button>
        </div>

        {/* Right Button */}
        <div>
          <button className="px-6 py-2.5 rounded-full bg-[#0d1b2a] text-white font-bold text-xs tracking-widest hover:scale-105 hover:bg-black transition-all">
            ORDER NOW
          </button>
        </div>
      </div>
    </nav>
  );
}
