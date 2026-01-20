import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/about.svg"
                alt="Logistics Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-10 -right-10 md:bottom-10 md:-right-10 bg-white p-6 rounded-xl shadow-xl hidden md:block max-w-[200px]"
            >
              <p className="text-4xl font-bold text-secondary mb-1">15+</p>
              <p className="text-sm text-gray-600 font-medium">
                Years of Delivering Excellence
              </p>
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-secondary font-bold text-sm tracking-uppercase mb-2 block uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              We Are The <span className="text-secondary">Future</span> of
              Global Logistics
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Delite Logistics has been a trusted partner for businesses
              worldwide. We combine cutting-edge technology with deep industry
              expertise to optimize your supply chain.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our mission is to simplify logistics so you can focus on growing
              your business. Whether it's a small parcel or heavy freight, we
              deliver with speed and integrity.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Real-time tracking and visibility",
                "Customized supply chain solutions",
                "Eco-friendly shipping options",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-primary font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/2348182611435"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white font-medium rounded-lg hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-500/20"
            >
              <FaWhatsapp className="w-5 h-5" />
              Chat Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
