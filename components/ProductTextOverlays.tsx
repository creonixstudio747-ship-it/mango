'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Product } from '@/data/products';

interface Props {
  product: Product;
  scrollYProgress: MotionValue<number>;
}

export default function ProductTextOverlays({ product, scrollYProgress }: Props) {
  // Section 1: 0 to 0.2 (fade out at 0.2)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Section 2: 0.2 to 0.45 (fade in at 0.2, fade out at 0.45)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [50, 0, -50]);

  // Section 3: 0.45 to 0.7 (fade in at 0.45, fade out at 0.7)
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.45, 0.6, 0.7], [50, 0, -50]);

  // Section 4: 0.7 to 1.0 (fade in at 0.7, stay till end)
  const opacity4 = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.7, 0.85, 1], [50, 0, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className="max-w-7xl mx-auto px-6 w-full h-full relative">
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute top-[25%] md:top-[30%] left-4 md:left-20 max-w-sm md:max-w-lg transform -translate-y-1/2"
        >
          <h1 className="text-4xl md:text-[5rem] leading-[1.1] font-black mb-4 md:mb-6 tracking-tighter text-white drop-shadow-2xl saturate-150">
            {product.section1.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/95 font-medium drop-shadow-lg max-w-[16rem] md:max-w-sm leading-tight">
            {product.section1.subtitle}
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute top-[35%] md:top-[40%] right-4 md:right-32 max-w-[16rem] md:max-w-md text-right transform -translate-y-1/2"
        >
          <h2 className="text-3xl md:text-7xl leading-[1.1] font-black mb-4 md:mb-6 tracking-tight text-white drop-shadow-2xl">
            {product.section2.title}
          </h2>
          <p className="text-sm md:text-xl text-white/90 drop-shadow-lg ml-auto max-w-[12rem] md:max-w-xs leading-snug">
            {product.section2.subtitle}
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute top-[45%] md:top-[50%] right-4 md:right-32 max-w-[16rem] md:max-w-lg text-right transform -translate-y-1/2"
        >
          <h2 className="text-3xl md:text-7xl leading-[1.1] font-black mb-4 md:mb-6 tracking-tight text-white drop-shadow-2xl">
            {product.section3.title}
          </h2>
          <p className="text-sm md:text-xl text-white/90 drop-shadow-lg ml-auto max-w-[14rem] md:max-w-sm leading-snug">
            {product.section3.subtitle}
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div 
          style={{ opacity: opacity4, y: y4 }}
          className="absolute bottom-[20%] w-full max-w-4xl mx-auto left-0 right-0 text-center px-6"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight text-white drop-shadow-xl w-full">
            {product.section4.title}
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
