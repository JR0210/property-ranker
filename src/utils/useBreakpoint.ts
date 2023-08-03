import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm');

  useEffect(() => {
    const handleWindowResize = () => {
      const windowWidth = window.innerWidth;

      const breakpoints: Record<Breakpoint, number> = {
        'sm': 640,
        'md': 768,
        'lg': 1024,
        'xl': 1280,
        '2xl': 1536,
      };

      let currentBreakpoint: Breakpoint = 'sm';
      Object.entries(breakpoints).forEach(([key, value]) => {
        if (windowWidth >= value) {
          currentBreakpoint = key as Breakpoint;
        }
      });

      setBreakpoint(currentBreakpoint);
    };

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
