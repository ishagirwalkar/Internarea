'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SliderContextType {
  currentSlide: number;
  setCurrentSlide: (slide: number | ((prev: number) => number)) => void;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

export function SliderProvider({ children }: { children: ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSetCurrentSlide = (slide: number | ((prev: number) => number)) => {
    if (typeof slide === 'function') {
      setCurrentSlide(slide);
    } else {
      setCurrentSlide(slide);
    }
  };

  return (
    <SliderContext.Provider value={{ currentSlide, setCurrentSlide: handleSetCurrentSlide }}>
      {children}
    </SliderContext.Provider>
  );
}

export function useSlider() {
  const context = useContext(SliderContext);
  if (context === undefined) {
    throw new Error('useSlider must be used within SliderProvider');
  }
  return context;
}
