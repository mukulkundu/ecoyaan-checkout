export async function GET() {
  const data = {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=150&h=150&fit=crop",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=150&h=150&fit=crop",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  };
  return Response.json(data);
}