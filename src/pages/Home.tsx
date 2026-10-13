import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Proof } from "../components/Proof";
import { Features } from "../components/Features";
import { Services } from "../components/Services";
import { Showcase } from "../components/Showcase";
import { Process } from "../components/Process";
import { Trust } from "../components/Trust";
import { Pricing } from "../components/Pricing";
import { Compare } from "../components/Compare";
import { Why } from "../components/Why";
import { FAQ } from "../components/FAQ";
import { PrototypeForm } from "../components/PrototypeForm";
import { ContactForm } from "../components/ContactForm";
import { Reviews } from "../components/Reviews";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { FloatingContact } from "../components/FloatingContact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Proof />
        <Showcase />
        <Services />
        <Features />
        <Process />
        <Trust />
        <Pricing />
        <Compare />
        <Why />
        <FAQ />
        <PrototypeForm />
        <ContactForm />
        <Reviews />
        <CTA />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
