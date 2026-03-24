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

        // ELIMINATE LAYOUT THRASHING: Removing getBoundingClientRect ensures 100% fluid 60FPS
        const rectWidth = canvas.width / dpr;
        const rectHeight = canvas.height / dpr;
        
        // Use cover-fit logic for mobile professionalism (fill screen context)
        // Differentiate desktop and mobile scaling if needed
        const isMobile = rectWidth < 768;
        const hRatio = rectWidth / img.width;
        const vRatio = rectHeight / img.height;
        const ratio = isMobile ? Math.max(hRatio, vRatio) : Math.max(hRatio, vRatio);
        
        const centerShift_x = (rectWidth - img.width * ratio) / 2;
        const centerShift_y = (rectHeight - img.height * ratio) / 2;  

        ctx.clearRect(0, 0, rectWidth, rectHeight);
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
    <div ref={containerRef} className="relative h-[400vh] w-full" style={{ position: 'relative' }}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-black/10">
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" 
        />
        <ProductTextOverlays product={product} progress={scrollYProgress} />
      </div>
    </div>
  );
}
