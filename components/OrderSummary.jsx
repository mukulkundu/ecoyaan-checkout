import ProductCard from "./ProductCard";

export default function OrderSummary({ cartItems, subtotal, shippingFee, discount, grandTotal }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-100">
        <h2 className="text-sm font-semibold text-neutral-900">Order Summary</h2>
        <p className="text-xs text-neutral-400 mt-0.5">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="px-5 divide-y divide-neutral-100">
        {cartItems.map((item) => (
          <ProductCard key={item.product_id} item={item} />
        ))}
      </div>

      <div className="px-5 py-4 bg-neutral-50 border-t border-neutral-100 space-y-2">
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Shipping</span>
          <span>₹{shippingFee}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-xs text-emerald-600">
            <span>Discount</span>
            <span>−₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-2 border-t border-neutral-200">
          <span>Total</span>
          <span>₹{grandTotal}</span>
        </div>
      </div>
    </div>
  );
}