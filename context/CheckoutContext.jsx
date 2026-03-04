"use client";
import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [shippingFee, setShippingFee] = useState(50);
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity, 0
  );
  const grandTotal = subtotal + shippingFee - discount;

  return (
    <CheckoutContext.Provider value={{
      cartItems, setCartItems,
      shippingFee, setShippingFee,
      discount, setDiscount,
      address, setAddress,
      subtotal, grandTotal,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);