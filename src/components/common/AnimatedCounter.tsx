import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string; // e.g. "210+", "80%", "20%"
  duration?: number; // duration of animation in seconds
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 1.8 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Extract the numeric portion and any suffix (like + or %)
  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, '');

  useEffect(() => {
    if (isInView && targetNumber > 0) {
      let startTime: number | null = null;

      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Quad ease-out animation curve
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeOutQuad * targetNumber);
        
        setCount(currentVal);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(targetNumber);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView, targetNumber, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};
