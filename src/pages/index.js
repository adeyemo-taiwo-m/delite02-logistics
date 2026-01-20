import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Delite Logistics | Global Shipping Solutions</title>
        <meta
          name="description"
          content="Fast, secure, and reliable logistics solutions for your business. Air, Sea, and Road freight services."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
