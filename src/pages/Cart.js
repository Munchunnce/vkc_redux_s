import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, clear } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  const handleOrder = () => {
    if (address.trim() === "") {
      alert("Please enter your address before placing the order.");
      return;
    };

    setOrderSuccess(true);
    setAddress("");
    dispatch(clear()); // Cart empty kar diya

    // Hide success message after 5 seconds
    setTimeout(() => {
      setOrderSuccess(false);
    }, 5000);
  };

  const totalAmount = products.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <h3>Cart</h3>

      {products.length === 0 ? (
        <>
          <img className="empty-cart-img" src="/empty-cart.png" alt="empty cart" />
        </>
      ) : (
        <>
          <div className="cartWrapper">
            {products.map((product) => (
              <div key={product.id} className="cartCard">
                <img style={{ color: "#5e6155" }} src={product.image} alt="" />
                <h5>{product.title}</h5>
                <h5>₹{product.price}</h5>
                <button className="btn" onClick={() => handleRemove(product.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "40px" }}>
            <div
              style={{
                width: "350px",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9"
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <strong>Total amount:</strong> ₹{totalAmount}
              </div>

              <div>
                <label htmlFor="address">Enter Delivery Address:</label>
                <br />
                <input
                  type="text"
                  id="address"
                  placeholder="e.g., 123 Street Name, City"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-box"
                />

                <button
                  className="btn"
                  onClick={handleOrder}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Place Order
                </button>

                {orderSuccess && (
                  <p style={{ color: "green", marginTop: "15px", fontWeight: "bold" }}>
                    🎉 Your order has been placed successfully!
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
