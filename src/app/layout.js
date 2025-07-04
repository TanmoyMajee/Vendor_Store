
import "./globals.css";
import Header from "@/component/header";
import Footer from "@/component/footer";


export const metadata = {
  title: "Vendor Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
