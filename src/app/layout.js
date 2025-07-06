
import "./globals.css";
import Header from "@/component/header";
import Footer from "@/component/footer";
import {AuthProvider} from '@/context/authContext'

export const metadata = {
  title: "Vendor Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       
        <AuthProvider>
          <Header />
        {children}
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
