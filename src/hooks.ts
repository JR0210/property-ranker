import { useState, useEffect } from 'react';

export const useTouchscreenDetection = () => {
  const [isTouchscreen, setIsTouchscreen] = useState(false);

  useEffect(() => {
    const checkTouchscreen = () => {
      setIsTouchscreen(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    checkTouchscreen();

    // Listen for orientation change
    window.addEventListener('orientationchange', checkTouchscreen);

    // Clean up event listener
    return () => {
      window.removeEventListener('orientationchange', checkTouchscreen);
    };
  }, []);

  return isTouchscreen;
};

