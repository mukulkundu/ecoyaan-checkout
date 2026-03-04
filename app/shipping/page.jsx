"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import ProgressBar from "@/components/ProgressBar";

const fields = [
  { name: "fullName",  label: "Full Name",     type: "text",  placeholder: "Priya Sharma",    colSpan: 2 },
  { name: "email",     label: "Email Address", type: "email", placeholder: "priya@email.com", colSpan: 2 },
  { name: "phone",     label: "Phone Number",  type: "tel",   placeholder: "9876543210",      colSpan: 1 },
  { name: "pinCode",   label: "PIN Code",      type: "text",  placeholder: "400001",          colSpan: 1 },
  { name: "city",      label: "City",          type: "text",  placeholder: "Mumbai",          colSpan: 1 },
  { name: "state",     label: "State",         type: "text",  placeholder: "Maharashtra",     colSpan: 1 },
];

export default function ShippingPage() {
  const router = useRouter();
  const { setAddress } = useCheckout();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", pinCode: "", city: "", state: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Must be 10 digits";
    if (!/^\d{6}$/.test(form.pinCode)) e.pinCode = "Must be 6 digits";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setAddress(form);
    router.push("/payment");
  };

  return (
    <div className="max-w-lg mx-auto px-4">
      <ProgressBar current={1} />

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Shipping Address</h1>
        <p className="text-sm text-neutral-400 mt-1">Where should we deliver your order?</p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <div className="grid grid-cols-2 gap-4">
          {fields.map(({ name, label, type, placeholder, colSpan }) => (
            <div key={name} className={colSpan === 2 ? "col-span-2" : "col-span-1"}>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                {label}
                <span className="text-red-400 ml-0.5">*</span>
              </label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={(e) => {
                  setForm({ ...form, [name]: e.target.value });
                  if (errors[name]) setErrors({ ...errors, [name]: undefined });
                }}
                className={`w-full h-9 px-3 rounded-md border text-sm outline-none transition-all
                  placeholder:text-neutral-300
                  ${errors[name]
                    ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-neutral-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  }`}
              />
              {errors[name] && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => router.back()}
          className="px-4 py-3 cursor-pointer rounded-lg border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg text-sm font-semibold transition-colors duration-150 flex items-center justify-center gap-2"
        >
          Continue to Payment
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}