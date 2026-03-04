import { CheckoutProvider } from "@/context/CheckoutContext";
import CartClient from "./CartClient";

async function getCartData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/cart`, { cache: "no-store" });
  return res.json();
}

export default async function CartPage() {
  const data = await getCartData();
  return <CartClient initialData={data} />;
}