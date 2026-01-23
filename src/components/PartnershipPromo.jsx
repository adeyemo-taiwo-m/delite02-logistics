import Link from "next/link";
import { motion } from "framer-motion";
import { Handshake, ArrowRight } from "lucide-react";

const PartnershipPromo = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-2/3">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full font-bold text-sm mb-6 border border-secondary/20">
                <Handshake className="w-4 h-4" />
                <span>New Partnership Opportunity</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Boost Your E-Commerce Sales with Payment on Delivery
              </h2>
              <p className="text-gray-200 text-lg mb-0 max-w-2xl">
                Partner with D’elite02 Logistics to offer secure, reliable
                Payment on Delivery services. Build trust, reduce cart
                abandonment, and grow your business today.
              </p>
            </div>

            <div className="lg:w-1/3 flex justify-center lg:justify-end">
              <Link
                href="/partnership"
                className="group bg-secondary hover:bg-orange-600 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg shadow-secondary/30 transition-all hover:scale-105 flex items-center gap-2"
              >
                Become a Partner
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipPromo;
