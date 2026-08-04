import "./globals.css";

export const metadata = {
  // name show
  title: "Computer Store",
  description: "Computer store website built with Next.js",
};


export default function RootLayout({ children }) {
  return (

    //RootLayout
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
