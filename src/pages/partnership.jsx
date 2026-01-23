import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Truck,
  CreditCard,
  Handshake,
  ShieldCheck,
  Warehouse,
  TrendingUp,
  MapPin,
  UserCheck,
  Clock,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";

export default function Partnership() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Head>
        <title>Delite Logistics | Payment on Delivery Partnership</title>
        <meta
          name="description"
          content="Boost your e-commerce sales with D’elite02 Logistics Payment on Delivery services. Fast, secure, and customer-friendly delivery across Nigeria."
        />
      </Head>

      <main className="min-h-screen bg-gray-50 pt-20">
        <Navbar />

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-primary text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-900 opacity-90"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold mb-6"
            >
              Your Reliable <span className="text-secondary">Last-Mile</span>{" "}
              Partner
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto mb-10"
            >
              Boost your e-commerce sales and build customer trust with our
              secure Payment on Delivery (POD) services across Nigeria.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#contact-us"
                className="bg-secondary hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2"
              >
                Start Partnership <Handshake className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Proposal / Intro */}
        <section className="py-20 container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Introduction & Proposal
              </h2>
              <div className="text-gray-600 space-y-4 text-lg">
                <p>
                  We at <strong>D’elite02 Logistics</strong> specialize in
                  providing fast, secure, and customer-friendly delivery
                  services across Nigeria and internationally.
                </p>
                <p>
                  We understand that e-commerce businesses thrive when their
                  customers can shop with convenience and confidence — which is
                  why we are offering a{" "}
                  <strong>Payment on Delivery (POD) partnership</strong>{" "}
                  designed to boost your sales and customer trust.
                </p>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 md:border-l-4 md:border-l-secondary">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Our Proposal
                  </h3>
                  <p>
                    We partner with your e-commerce business to handle
                    end-to-end deliveries, ensuring your customers receive their
                    orders before payment is made. This reduces cart
                    abandonment, builds trust, and encourages repeat purchases.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Visual Cards representing the intro */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-secondary flex flex-col items-center text-center">
                  <TrendingUp className="w-12 h-12 text-secondary mb-3" />
                  <h4 className="font-bold text-gray-800">Increase Sales</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-primary flex flex-col items-center text-center mt-8">
                  <ShieldCheck className="w-12 h-12 text-primary mb-3" />
                  <h4 className="font-bold text-gray-800">Build Trust</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-primary flex flex-col items-center text-center">
                  <Truck className="w-12 h-12 text-primary mb-3" />
                  <h4 className="font-bold text-gray-800">Fast Delivery</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-secondary flex flex-col items-center text-center mt-8">
                  <UserCheck className="w-12 h-12 text-secondary mb-3" />
                  <h4 className="font-bold text-gray-800">Happy Clients</h4>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4">
                How the Partnership Works
              </h2>
              <p className="text-gray-600">
                A seamless process designed to keep your business moving
                efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: <Truck className="w-8 h-8" />,
                  title: "Order Fulfillment",
                  desc: "You hand over customer orders to D’elite02 Logistics.",
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: "Secure Delivery",
                  desc: "We deliver promptly to your customer’s location.",
                },
                {
                  icon: <CreditCard className="w-8 h-8" />,
                  title: "Payment Collection",
                  desc: "Our rider collects payment in cash or transfer on your behalf.",
                },
                {
                  icon: <Handshake className="w-8 h-8" />,
                  title: "Funds Remittance",
                  desc: "Payments are remitted to your account within 24–48 hours.",
                },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all border border-gray-100 group"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm mb-4 mx-auto md:mx-0">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center md:text-left">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center md:text-left">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Benefits to Your Business
            </h2>
            <p className="text-gray-600">
              Why leading e-commerce businesses trust us with their last-mile
              delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Increase Sales",
                desc: "Customers are more likely to buy when payment is only made at delivery.",
                color: "text-green-600",
              },
              {
                title: "Build Customer Trust",
                desc: "Buyers feel secure knowing they pay only when satisfied.",
                color: "text-blue-600",
              },
              {
                title: "Nationwide Coverage",
                desc: "We deliver across all major cities and regions in Nigeria.",
                color: "text-primary",
              },
              {
                title: "Professional Riders",
                desc: "Trained, uniformed riders for brand representation.",
                color: "text-purple-600",
              },
              {
                title: "Flexible Payment Options",
                desc: "Cash or transfer collections.",
                color: "text-secondary",
              },
              {
                title: "Free Warehousing",
                desc: "As long as goods are actively delivered, you get free warehousing and inventory.",
                color: "text-indigo-600",
                icon: <Warehouse className="w-6 h-6" />,
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className={`w-6 h-6 ${benefit.color}`} />
                  <h3 className="text-lg font-bold text-gray-800">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose <br />
                  <span className="text-secondary">D’elite02 Logistics?</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Proven track record in reliable and timely deliveries.",
                    "Real-time tracking and delivery updates.",
                    "Competitive delivery rates without compromising service quality.",
                    "Dedicated customer support team for swift resolution of issues.",
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="bg-secondary/20 p-2 rounded-full mt-1">
                        <CheckCircle className="w-5 h-5 text-secondary" />
                      </div>
                      <p className="text-lg text-gray-200">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative h-64 lg:h-96 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex items-center justify-center">
                {/* Abstract visual or could be an image placeholder if we had one. Using text/icons for now */}
                <div className="text-center space-y-4">
                  <Clock className="w-16 h-16 text-secondary mx-auto" />
                  <h3 className="text-2xl font-bold text-white">
                    Swift Performance
                  </h3>
                  <p className="text-white/70">Next-Day Delivery Available</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps / Contact */}
        <section id="contact-us" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                We’d be delighted to discuss terms, rates, and integration
                details with you. Chat with us directly to begin your
                partnership journey.
              </p>

              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <a
                  href="https://wa.me/2348182611435?text=Hello%20Delite02%20Logistics,%20I%20am%20interested%20in%20your%20Payment%20on%20Delivery%20Partnership."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3 text-lg"
                >
                  {/* WhatsApp Icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Chat on WhatsApp
                </a>

                <a
                  href="mailto:deliteo2logistics@gmail.com?subject=Partnership%20Inquiry&body=Hello%20Delite02%20Logistics%2C%0A%0AI%20am%20interested%20in%20partnering%20with%20you.%20Please%20let%20me%20know%20the%20next%20steps.%0A%0ARegards%2C%0A%5BYour%20Name%5D"
                  className="w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-8 rounded-full shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg border border-gray-200"
                >
                  <Mail className="w-6 h-6" />
                  Send an Email
                </a>
              </div>

              <div className="mt-12 space-y-2 text-gray-500">
                <p>Or call us directly at:</p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center font-bold text-lg text-primary">
                  <a
                    href="tel:09114082983"
                    className="hover:text-secondary transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" /> 0911 408 2983
                  </a>
                  <span className="hidden md:inline text-gray-300">|</span>
                  <a
                    href="tel:08182611435"
                    className="hover:text-secondary transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" /> 0818 261 11435
                  </a>
                </div>
              </div>

              <div className="mt-12 bg-secondary/10 inline-block p-4 rounded-xl">
                <p className="font-bold text-secondary text-lg">
                  🌐 Making Delivery Easy, Swift – Anytime, Any Day!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
