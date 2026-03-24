'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const product = products[currentIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  const nextProduct = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prevProduct = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  if (!isClient) return null; // Avoid hydration mismatch on dynamic gradients

  return (
    <>
      <div 
        className="fixed inset-0 z-[-1] transition-all duration-1000 ease-in-out"
        style={{ background: product.gradient }}
      />
      
      <Navbar />

      {/* Navigation Arrows */}
      <div className="fixed top-1/2 left-8 md:left-12 z-50 transform -translate-y-1/2">
        <button onClick={prevProduct} className="p-4 rounded-full bg-[#f26522] text-white border-2 border-white hover:scale-110 transition-all cursor-pointer shadow-lg hover:shadow-xl">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      </div>
      <div className="fixed top-1/2 right-8 md:right-12 z-50 transform -translate-y-1/2">
        <button onClick={nextProduct} className="p-4 rounded-full bg-[#f26522] text-white border-2 border-white hover:scale-110 transition-all cursor-pointer shadow-lg hover:shadow-xl">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Bottom Center Pill Menu */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 p-1 rounded-full bg-[#653308] shadow-2xl border border-white/10">
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-6 py-3 border-2 border-transparent rounded-full font-bold text-sm tracking-wide transition-all cursor-pointer ${
                currentIndex === idx 
                  ? 'bg-white text-[#d65f12] shadow-sm' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.main
          key={product.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative min-h-screen"
        >
          <ProductBottleScroll product={product} />

          {/* Product Details Section */}
          <section className="py-32 px-6 max-w-7xl mx-auto md:flex md:items-center gap-16 relative z-30">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:w-1/2 relative h-96 rounded-3xl overflow-hidden bg-white/10 shadow-xl"
            >
              <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xl font-bold bg-black/20 backdrop-blur-sm border border-white/10">
                [Image: {product.detailsSection.imageAlt}]
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2 mt-12 md:mt-0 text-white"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-md">{product.detailsSection.title}</h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">{product.detailsSection.description}</p>
              
              <h3 className="text-3xl font-bold mb-4 mt-12">{product.freshnessSection.title}</h3>
              <p className="text-white/80 leading-relaxed">{product.freshnessSection.description}</p>
            </motion.div>
          </section>

          {/* Buy Now Section */}
          <section className="py-24 px-6 md:py-32 bg-black/60 backdrop-blur-md border-t border-white/10 relative z-30">
            <div className="max-w-4xl mx-auto text-center text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-transparent p-10 rounded-3xl border border-white/20 shadow-2xl"
              >
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {product.buyNowSection.processingParams.map((param, i) => (
                    <span key={i} className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-orange-400">
                      {param}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-5xl font-black mb-2">{product.buyNowSection.price}</h2>
                <p className="text-white/60 mb-8">{product.buyNowSection.unit}</p>

                <div className="grid md:grid-cols-2 gap-8 text-left mb-10 max-w-2xl mx-auto bg-black/30 p-6 rounded-2xl border border-white/5 shadow-inner">
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-pink-400">Delivery Promise</h4>
                    <p className="text-sm text-white/70 leading-relaxed">{product.buyNowSection.deliveryPromise}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-pink-400">Return Policy</h4>
                    <p className="text-sm text-white/70 leading-relaxed">{product.buyNowSection.returnPolicy}</p>
                  </div>
                </div>

                <button 
                  className="w-full md:w-auto px-12 py-5 rounded-2xl bg-white text-black font-black text-xl hover:scale-105 hover:bg-orange-50 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all cursor-pointer"
                >
                  Add To Cart &mdash; {product.buyNowSection.price}
                </button>
              </motion.div>
            </div>
            
            {/* Next Flavor Slanted CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 max-w-4xl mx-auto"
            >
              <button 
                onClick={nextProduct}
                className="w-full relative overflow-hidden group rounded-[2rem] h-40 flex items-center justify-center bg-transparent border-2 border-white/20 hover:border-transparent transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-500 transform -skew-x-12 scale-110" />
                <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-500">
                  <span className="block text-sm uppercase tracking-[0.3em] text-white/60 mb-2">Continue the journey</span>
                  <span className="text-4xl font-black bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Explore {products[(currentIndex + 1) % products.length].name} &rarr;</span>
                </div>
              </button>
            </motion.div>
          </section>

          <Footer />
        </motion.main>
      </AnimatePresence>
    </>
  );
}
