import { CheckoutProvider } from "@/context/CheckoutContext";
import "../styles/global.css";

export const metadata = {
  title: "Ecoyaan Checkout",
  description: "Sustainable shopping checkout flow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-neutral-50 text-neutral-900 antialiased" style={{ fontFamily: "'Geist', sans-serif" }}>
        <CheckoutProvider>
          {/* Header */}
          <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm">🌿</span>
                </div>
                <span className="font-semibold text-neutral-900 tracking-tight">Ecoyaan</span>
              </div>
              <span className="text-xs text-neutral-400 hidden sm:block">Conscious Commerce</span>
            </div>
          </header>

          <main className="min-h-screen py-8">{children}</main>

          <footer className="border-t border-neutral-200 bg-white">
            <div className="max-w-5xl mx-auto px-6 py-4 text-center text-xs text-neutral-400">
              © 2024 Ecoyaan · Sustainable shopping for a better planet
            </div>
          </footer>
        </CheckoutProvider>
      </body>
    </html>
  );
}