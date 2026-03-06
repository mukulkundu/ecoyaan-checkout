"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import OrderSummary from "@/components/OrderSummary";
import ProgressBar from "@/components/ProgressBar";
import StickyFooter from "@/components/StickyFooter";

export default function CartClient({ initialData }) {
  const router = useRouter();
  const { cartItems, setCartItems, setShippingFee, setDiscount, subtotal, shippingFee, discount, grandTotal } = useCheckout();

  useEffect(() => {
    if (cartItems.length === 0) {
      setCartItems(initialData.cartItems);
      setShippingFee(initialData.shipping_fee);
      setDiscount(initialData.discount_applied);
    }
  }, []);

  const items = cartItems.length ? cartItems : initialData.cartItems;
  const sub = subtotal || items.reduce((s, i) => s + i.product_price * i.quantity, 0);
  const total = grandTotal || sub + initialData.shipping_fee;

  return (
    <div className="max-w-lg mx-auto px-4 pb-28">
      <ProgressBar current={0} />

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Your Cart</h1>
        <p className="text-sm text-neutral-400 mt-1">Review your items before checkout</p>
      </div>

      <OrderSummary
        cartItems={items}
        subtotal={sub}
        shippingFee={shippingFee}
        discount={discount}
        grandTotal={total}
      />

      <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-xs text-emerald-700">Free returns · Carbon-neutral delivery</p>
      </div>

      <StickyFooter
        onNext={() => router.push("/shipping")}
        nextLabel="Proceed to Checkout"
      />
    </div>
  );
}