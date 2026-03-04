import { CheckoutProvider } from "@/context/CheckoutContext";
import CartClient from "./CartClient";

async function getCartData() {
  // SSR fetch from your own API route
  const res = await fetch("http://localhost:3000/api/cart", { cache: "no-store" });
  return res.json();
}

export default async function CartPage() {
  const data = await getCartData();
  return <CartClient initialData={data} />;
}