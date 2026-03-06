"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [shippingFee, setShippingFee] = useState(50);
  const [discount, setDiscount] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecoyaan_checkout");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.cartItems) setCartItems(parsed.cartItems);
        if (parsed.shippingFee) setShippingFee(parsed.shippingFee);
        if (parsed.discount !== undefined) setDiscount(parsed.discount);
        if (parsed.addresses) setAddresses(parsed.addresses);
        if (parsed.selectedAddressIndex !== undefined) setSelectedAddressIndex(parsed.selectedAddressIndex);
      }
    } catch (e) {}
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem("ecoyaan_checkout", JSON.stringify({
        cartItems, shippingFee, discount, addresses, selectedAddressIndex
      }));
    } catch (e) {}
  }, [cartItems, shippingFee, discount, addresses, selectedAddressIndex]);

  const addAddress = (addr) => {
    setAddresses((prev) => [...prev, addr]);
    setSelectedAddressIndex(addresses.length);
  };

  const updateAddress = (index, addr) => {
    setAddresses((prev) => prev.map((a, i) => (i === index ? addr : a)));
  };

  const removeAddress = (index) => {
    setAddresses((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (selectedAddressIndex >= updated.length) setSelectedAddressIndex(Math.max(0, updated.length - 1));
      return updated;
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
  const grandTotal = subtotal + shippingFee - discount;
  const selectedAddress = addresses[selectedAddressIndex] ?? null;

  return (
    <CheckoutContext.Provider value={{
      cartItems, setCartItems,
      shippingFee, setShippingFee,
      discount, setDiscount,
      addresses, addAddress, updateAddress, removeAddress,
      selectedAddressIndex, setSelectedAddressIndex,
      selectedAddress,
      subtotal, grandTotal,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);