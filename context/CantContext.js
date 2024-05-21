import React, { createContext, useContext, useState } from 'react';

const CantContext = createContext();

export const useCant = () => {
  const context = useContext(CantContext);
  if (!context) {
    throw new Error('useCant debe ser usado dentro de un proveedor CantProvider');
  }
  return context;
};

export const CantProvider = ({ children }) => {
  const [cant, setCant] = useState(null);

  const updateCant = (newCant) => {
    setCant(newCant);
  };

  return (
    <CantContext.Provider value={{ cant, updateCant }}>
      {children}
    </CantContext.Provider>
  );
};
