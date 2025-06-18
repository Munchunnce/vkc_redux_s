import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts, STATUSES } from '../store/productSlice';
import Toast from './Toast/Toast';

const Products = () => {
  const { data: products, status } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [addedProductIds, setAddedProductIds] = useState([]); //  Track added buttons
  const [toast, setToast] = useState(null); // 🧃 Toast info

  useEffect(() => {
    dispatch(fetchProducts());
    // const fetchProducts =  async () => {
        //     const res = await fetch('https://fakestoreapi.in/api/products');
        //     const data = await res.json();
        //     console.log(data);
        //     setProduct(data.products);
        // }
        // fetchProducts();
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
    setAddedProductIds((prev) => [...prev, product.id]);
    // Show toast with product name
    setToast({ message: `🛒 added to cart!`, type: 'success' });

    setTimeout(() => {
      setAddedProductIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000); // 2 second ke liye show "Added "
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something Went Wrong...</h2>;
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )

      }
      <div className="productsWrapper">
      {products.map((product) => {
        const isAdded = addedProductIds.includes(product.id);

        return (
          <div className="card" key={product.id}>
            <img src={product.image} alt="" style={{ height: '11rem' }} />
            <div className="title-wrapper">
              <p className="product-title" data-fulltitle={product.title}>
                {product.title}
              </p>
            </div>
            <h5>₹{product.price}</h5>
            <button
              className="btn"
              onClick={() => handleAdd(product)}
              style={{
                backgroundColor: isAdded ? '#4caf50' : '',
                transition: '0.3s',
              }}
              disabled={isAdded} // Optional: disable temporarily
            >
              {isAdded ? 'ADDED' : 'Add to cart'}
            </button>
          </div>
        );
      })}
      </div>
    </>
  );
};

export default Products;
