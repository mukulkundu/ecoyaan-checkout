"use client";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import OrderSummary from "@/components/OrderSummary";
import ProgressBar from "@/components/ProgressBar";

export default function PaymentPage() {
  const router = useRouter();
  const { cartItems, address, subtotal, shippingFee, discount, grandTotal } = useCheckout();

  if (!address) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-white border border-neutral-200 rounded-xl p-8">
          <p className="text-sm text-neutral-500 mb-4">Please complete the shipping step first.</p>
          <button
            onClick={() => router.push("/shipping")}
            className="text-sm font-medium text-emerald-600 hover:underline"
          >
            Go to Shipping →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4">
      <ProgressBar current={2} />

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Review & Pay</h1>
        <p className="text-sm text-neutral-400 mt-1">Confirm your order details before payment</p>
      </div>

      <div className="space-y-4">
        <OrderSummary
          cartItems={cartItems}
          subtotal={subtotal}
          shippingFee={shippingFee}
          discount={discount}
          grandTotal={grandTotal}
        />

        {/* Delivering To */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900">Delivering To</h2>
            <button
              onClick={() => router.push("/shipping")}
              className="text-xs text-emerald-600 hover:underline font-medium"
            >
              Edit
            </button>
          </div>
          <div className="px-5 py-4 space-y-1">
            <p className="text-sm font-medium text-neutral-900">{address.fullName}</p>
            <p className="text-xs text-neutral-500">{address.email}</p>
            <p className="text-xs text-neutral-500">{address.phone}</p>
            <p className="text-xs text-neutral-500 pt-1">
              {address.city}, {address.state} — {address.pinCode}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-neutral-100">
            <h2 className="text-sm font-semibold text-neutral-900">Payment Method</h2>
          </div>
          <div className="px-5 py-4 space-y-2">
            {[
              { icon: "💳", label: "Credit / Debit Card", sub: "Visa, Mastercard, Rupay" },
              { icon: "📱", label: "UPI", sub: "GPay, PhonePe, Paytm" },
              { icon: "🏦", label: "Net Banking", sub: "All major banks" },
            ].map((method, i) => (
              <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-all group">
                <input type="radio" name="payment" defaultChecked={i === 0} className="accent-emerald-600" />
                <span className="text-base">{method.icon}</span>
                <div>
                  <p className="text-sm font-medium text-neutral-800">{method.label}</p>
                  <p className="text-xs text-neutral-400">{method.sub}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => router.back()}
          className="px-4 py-3 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => router.push("/success")}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg text-sm font-semibold transition-colors duration-150 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Pay Securely · ₹{grandTotal}
        </button>
      </div>
    </div>
  );
}