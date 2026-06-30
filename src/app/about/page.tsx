import Navbar from "../../components/Navbar";
import About from "../../components/About";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "calc(100vh - 80px)" }}>
        <About />
      </main>
      <Footer />
    </>
  );
}
