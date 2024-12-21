import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quiz App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-[#141414]`}>{children}</body>
    </html>
  );
}
