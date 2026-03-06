"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import ProgressBar from "@/components/ProgressBar";
import StickyFooter from "@/components/StickyFooter";

const emptyForm = { fullName: "", email: "", phone: "", pinCode: "", city: "", state: "" };

const fields = [
  { name: "fullName", label: "Full Name",     type: "text",  placeholder: "Priya Sharma",    colSpan: 2 },
  { name: "email",    label: "Email Address", type: "email", placeholder: "priya@email.com", colSpan: 2 },
  { name: "phone",    label: "Phone Number",  type: "tel",   placeholder: "9876543210",      colSpan: 1 },
  { name: "pinCode",  label: "PIN Code",      type: "text",  placeholder: "400001",          colSpan: 1 },
  { name: "city",     label: "City",          type: "text",  placeholder: "Mumbai",          colSpan: 1 },
  { name: "state",    label: "State",         type: "text",  placeholder: "Maharashtra",     colSpan: 1 },
];

function validate(form) {
  const e = {};
  if (!form.fullName.trim()) e.fullName = "Required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
  if (!/^\d{10}$/.test(form.phone)) e.phone = "Must be 10 digits";
  if (!/^\d{6}$/.test(form.pinCode)) e.pinCode = "Must be 6 digits";
  if (!form.city.trim()) e.city = "Required";
  if (!form.state.trim()) e.state = "Required";
  return e;
}

export default function ShippingPage() {
  const router = useRouter();
  const { addresses, addAddress, removeAddress, selectedAddressIndex, setSelectedAddressIndex } = useCheckout();

  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const handleAddAddress = () => {
    const e = validate(form);
    if (Object.keys(e).length) { setErrors(e); return; }
    addAddress(form);
    setForm(emptyForm);
    setErrors({});
    setShowForm(false);
  };

  const handleContinue = () => {
    if (addresses.length === 0) {
      setErrors({ _global: "Please add at least one address." });
      return;
    }
    router.push("/payment");
  };

  return (
    <div className="max-w-lg mx-auto px-4 pb-28">
      <ProgressBar current={1} />

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Shipping Address</h1>
        <p className="text-sm text-neutral-400 mt-1">Where should we deliver your order?</p>
      </div>

      {/* Saved addresses */}
      {addresses.length > 0 && (
        <div className="space-y-3 mb-5">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Saved Addresses</p>
          {addresses.map((addr, i) => (
            <div
              key={i}
              onClick={() => setSelectedAddressIndex(i)}
              className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                selectedAddressIndex === i
                  ? "border-emerald-500 bg-emerald-50 shadow-sm"
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                    selectedAddressIndex === i ? "border-emerald-500" : "border-neutral-300"
                  }`}>
                    {selectedAddressIndex === i && (
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{addr.fullName}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{addr.email} · {addr.phone}</p>
                    <p className="text-xs text-neutral-500">{addr.city}, {addr.state} — {addr.pinCode}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeAddress(i); }}
                  className="p-1.5 cursor-pointer rounded-lg hover:bg-red-50 text-neutral-300 hover:text-red-400 transition-colors shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new address toggle */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 cursor-pointer rounded-xl border-2 border-dashed border-neutral-300 text-sm font-medium text-neutral-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add New Address
        </button>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-neutral-800">New Address</p>
            {addresses.length > 0 && (
              <button onClick={() => { setShowForm(false); setErrors({}); }} className="text-xs text-neutral-400 hover:text-neutral-600">
                Cancel
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {fields.map(({ name, label, type, placeholder, colSpan }) => (
              <div key={name} className={colSpan === 2 ? "col-span-2" : "col-span-1"}>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  {label} <span className="text-red-400">*</span>
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={(e) => {
                    setForm({ ...form, [name]: e.target.value });
                    if (errors[name]) setErrors({ ...errors, [name]: undefined });
                  }}
                  className={`w-full h-9 px-3 rounded-lg border text-sm outline-none transition-all placeholder:text-neutral-300
                    ${errors[name]
                      ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-neutral-200 bg-neutral-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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

          <button
            onClick={handleAddAddress}
            className="mt-4 w-full bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Save Address
          </button>
        </div>
      )}

      {errors._global && (
        <p className="mt-3 text-xs text-red-500 text-center">{errors._global}</p>
      )}

      <StickyFooter
        onNext={handleContinue}
        nextLabel="Continue to Payment"
        backHref="/"
      />
    </div>
  );
}