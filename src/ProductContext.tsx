import React, { createContext, useContext, useState } from 'react';

type Product = {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
};

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};




