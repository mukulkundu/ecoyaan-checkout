export default function ProductCard({ item }) {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="w-16 h-16 rounded-lg border border-neutral-200 bg-neutral-100 overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.product_name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-900 leading-snug">{item.product_name}</p>
        <p className="text-xs text-neutral-400 mt-1">Qty: {item.quantity}</p>
        <p className="text-xs text-neutral-500 mt-0.5">₹{item.product_price} each</p>
      </div>
      <p className="text-sm font-semibold text-neutral-900 whitespace-nowrap">
        ₹{item.product_price * item.quantity}
      </p>
    </div>
  );
}