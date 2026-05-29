import Footer from "@/components/public/layout/Footer";
import Header from "@/components/public/layout/Header";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
