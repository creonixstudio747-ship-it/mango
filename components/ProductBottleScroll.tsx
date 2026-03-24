'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';
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

  // Extremely tight spring interpolates chopped scroll signals (mobile touch gap) 
  // without feeling delayed on laptop native scroll.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
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
      const progress = smoothProgress.get();
      const frameCount = product.frameCount || 120;
      // Map progress 0-1 to frame 0-(frameCount-1)
      const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(progress * frameCount)));
      
      const img = images[frameIndex];
      const dpr = window.devicePixelRatio || 1;
      
      const targetWidth = window.innerWidth * dpr;
      const targetHeight = window.innerHeight * dpr;

      // Ignore small vertical height changes (due to mobile URL bar disappearing/reappearing)
      // This stops the canvas from clearing and jittering constantly during active touch scroll.
      const widthChanged = canvas.width !== targetWidth;
      const heightChanged = Math.abs(canvas.height - targetHeight) > 150;
      
      const canvasResized = widthChanged || heightChanged;

      // Skip draw if frame hasn't changed, is loaded, and screen hasn't resized
      if (!canvasResized && img && lastDrawnSrc === img.src && img.complete) {
          animationFrameId = requestAnimationFrame(render);
          return;
      }

      if (canvasResized) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          ctx.scale(dpr, dpr);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high"; // Maximum resolution output
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
  }, [images, smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full" style={{ position: 'relative' }}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-black/10">
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" 
        />
        <ProductTextOverlays product={product} progress={smoothProgress} />
      </div>
    </div>
  );
}
