import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import ConditionalFooter from "@/components/ConditionalFooter";

export const metadata = {
  title: "Computer Store",
  description: "Computer store website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <CartProvider>
            <Navbar />
            {children}
            <ConditionalFooter />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
