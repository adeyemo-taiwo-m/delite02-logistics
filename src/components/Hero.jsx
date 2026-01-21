import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, X, Loader2 } from "lucide-react";

const Hero = () => {
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setIsLoading(true);
      await router.push(`/track/${trackingNumber.trim()}`);
      setIsLoading(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero-image.svg"
          alt="Logistics Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium mb-6 text-secondary">
            Global Logistics Partner
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Fast, Reliable, and <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Secure Delivery
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your trusted partner for seamless logistics solutions. We move your
            business forward—on time, every time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#contact"
              className="w-full sm:w-52 px-8 py-4 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-lg shadow-lg hover:shadow-secondary/30 transition-all flex items-center justify-center gap-2 group"
            >
              Get a Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="w-full sm:w-52 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium rounded-lg transition-all"
            >
              Track Order
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>

      {/* Tracking Modal */}
      <AnimatePresence>
        {isTrackingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTrackingModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 overflow-hidden"
            >
              <button
                onClick={() => setIsTrackingModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Track Your Order
                </h3>
                <p className="text-gray-500 mb-6">
                  Enter your tracking number below to see the current status of
                  your shipment.
                </p>

                <form onSubmit={handleTrackOrder} className="space-y-4">
                  <div>
                    <label
                      htmlFor="tracking-number"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      id="tracking-number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="e.g., TRK-123456789"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-secondary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Tracking...</span>
                      </>
                    ) : (
                      "Track Shipment"
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
