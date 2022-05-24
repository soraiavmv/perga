import { useEffect, useState } from 'react';

interface IDimensions {
  width: number;
  height: number;
}

export default function useWindowDimensions() {
  const [windowSize, setWindowSize] = useState<IDimensions>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return windowSize;
}
