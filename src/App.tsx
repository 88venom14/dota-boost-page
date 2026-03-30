import Header from "./components/Header";
import Hero from "./components/Hero";
import PainPoints from "./components/PainPoints";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="noise-overlay" style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Services />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
