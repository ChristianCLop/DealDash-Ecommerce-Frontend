import React, { createContext, useContext, useState } from 'react';

const ProductoContext = createContext();

export const useProduc = () => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error('useProduc debe ser usado dentro de un proveedor ProducProvider');
  }
  return context;
};

export const ProducProvider = ({ children }) => {
  const [prodId, setProdId] = useState(null);

  const updateProd = (newProdId) => {
    setProdId(newProdId);
  };

  return (
    <ProductoContext.Provider value={{ prodId, updateProd }}>
      {children}
    </ProductoContext.Provider>
  );
};
