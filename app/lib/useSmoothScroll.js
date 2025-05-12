// useSmoothScroll.js
import { useEffect } from 'react';
import Lenis from "lenis";

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({ smooth: true });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};
