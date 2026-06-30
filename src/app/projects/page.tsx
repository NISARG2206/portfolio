import Navbar from "../../components/Navbar";
import Projects from "../../components/Projects";
import Footer from "../../components/Footer";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "calc(100vh - 80px)" }}>
        <Projects />
      </main>
      <Footer />
    </>
  );
}
