import React, { useEffect, useState } from "react";
import "./styles.css";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: [];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {};
  thumbnail: string;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await response.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageClick = (page: number) => {
    if (page > 1 && page <= products.length / 10) setPageNumber(page);
  };

  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products
            .slice(pageNumber * 10 - 10, pageNumber * 10)
            .map((product) => {
              return (
                <div key={product.id} className="products__single">
                  <img src={product.thumbnail} alt={product.title} />
                  <h1>{product.title}</h1>
                </div>
              );
            })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span onClick={() => handlePageClick(pageNumber - 1)}>◀️</span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={`pagination__number ${
                  pageNumber === i + 1 ? "pagination__selected" : ""
                }`}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span onClick={() => handlePageClick(pageNumber + 1)}>▶️</span>
        </div>
      )}
    </>
  );
}

export default App;
