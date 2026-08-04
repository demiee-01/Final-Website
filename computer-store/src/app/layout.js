import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  // name show
  title: "Computer Store",
  description: "Computer store website built with Next.js",
};


export default function RootLayout({ children }) {
  return (
    //RootLayout
    <html lang="en">
      <body>
         <Navbar />
        {children}
       
      </body>
    </html>
  );
}
