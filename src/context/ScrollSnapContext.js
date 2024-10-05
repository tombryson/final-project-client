import React, { createContext, useContext, useState } from 'react';

const ScrollSnapContext = createContext();

export const useScrollSnap = () => {
  return useContext(ScrollSnapContext);
};

export const ScrollSnapProvider = ({ children }) => {
  const [isScrollSnapEnabled, setIsScrollSnapEnabled] = useState(true);

  return (
    <ScrollSnapContext.Provider value={{ isScrollSnapEnabled, setIsScrollSnapEnabled }}>
      {children}
    </ScrollSnapContext.Provider>
  );
};