'use client';

import { createContext, useEffect, useState } from 'react';

export const NO_VIEWPORT = 'none';

export type ViewportContextData =
  | {
      width: number;
      height: number;
      visualWidth: number;
      visualHeight: number;
      scrollX: number;
      scrollY: number;
    }
  | typeof NO_VIEWPORT;

function updateViewportData(data?: ViewportContextData): ViewportContextData {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return NO_VIEWPORT;
  }

  const width = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0,
  );
  const height = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0,
  );

  if (
    data &&
    data !== NO_VIEWPORT &&
    data.width === width &&
    data.height === height &&
    data.visualWidth === window.visualViewport?.width &&
    data.visualHeight === window.visualViewport?.height &&
    data.scrollX === window.scrollX &&
    data.scrollY === window.scrollY
  ) {
    return data;
  }

  return {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    width,
    height,
    visualWidth: window.visualViewport?.width || 0,
    visualHeight: window.visualViewport?.height || 0,
  };
}

export const ViewportContext =
  createContext<ViewportContextData>(updateViewportData());

export const ViewportProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(updateViewportData);

  useEffect(() => {
    const handleChanges = () => setState(updateViewportData);

    window.addEventListener('resize', handleChanges);
    window.addEventListener('scroll', handleChanges);

    handleChanges();
    return () => {
      window.removeEventListener('resize', handleChanges);
      window.removeEventListener('scroll', handleChanges);
    };
  }, []);

  return (
    <ViewportContext.Provider value={state}>
      {children}
    </ViewportContext.Provider>
  );
};
