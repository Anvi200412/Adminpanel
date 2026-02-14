

import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetch("https://dummyjson.com/products?limit=900"),
          fetch("https://dummyjson.com/products/categories"),
        ]);

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProducts(prodData.products);
        setCategories(catData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Function to add new product
  const addProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <ProductContext.Provider value={{ products, categories, loading, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
