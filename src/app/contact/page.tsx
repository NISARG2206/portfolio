import Navbar from "../../components/Navbar";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "calc(100vh - 80px)" }}>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
