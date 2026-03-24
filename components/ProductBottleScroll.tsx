'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import { Product } from '@/data/products';
import ProductTextOverlays from './ProductTextOverlays';

interface Props {
  product: Product;
}

export default function ProductBottleScroll({ product }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    const frameCount = product.frameCount || 120;
    const extension = product.extension || 'webp';
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Instantly start fetching in background
      img.src = `${product.folderPath}/${i}.${extension}`;
      // Browsers will handle HTTP multiplexing
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [product.folderPath, product.frameCount, product.extension]);

  // Draw frame on canvas
  useEffect(() => {
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastDrawnSrc = "";

    const render = () => {
      const progress = scrollYProgress.get();
      const frameCount = product.frameCount || 120;
      // Map progress 0-1 to frame 0-(frameCount-1)
      const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(progress * frameCount)));
      
      const img = images[frameIndex];
      const dpr = window.devicePixelRatio || 1;
      
      const canvasResized = (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr);

      // Skip draw if frame hasn't changed, is loaded, and screen hasn't resized
      if (!canvasResized && img && lastDrawnSrc === img.src && img.complete) {
          animationFrameId = requestAnimationFrame(render);
          return;
      }

      if (canvasResized) {
          canvas.width = window.innerWidth * dpr;
          canvas.height = window.innerHeight * dpr;
          ctx.scale(dpr, dpr);
      }

      // Only draw if image is valid
      if (img && img.complete && img.naturalWidth > 0) {
        lastDrawnSrc = img.src;

        const rect = canvas.getBoundingClientRect();
        
        // Use cover-fit logic for mobile professionalism (fill screen context)
        const hRatio = rect.width / img.width;
        const vRatio = rect.height / img.height;
        const ratio = Math.max(hRatio, vRatio); // Changed from 'min' to 'max' for cover
        
        const centerShift_x = (rect.width - img.width * ratio) / 2;
        const centerShift_y = (rect.height - img.height * ratio) / 2;  

        ctx.clearRect(0,0, rect.width, rect.height);
        ctx.drawImage(img, 0,0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full" style={{ position: 'relative' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain z-10" 
            style={{ width: '100vw', height: '100vh' }}
        />
        <ProductTextOverlays product={product} scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
