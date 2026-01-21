import { motion } from "framer-motion";
import {
  Truck,
  Package,
  Globe,
  Clock,
  ShieldCheck,
  Headphones,
  MapPin,
  Warehouse,
} from "lucide-react";

const services = [
  {
    icon: <Clock className="w-10 h-10 text-secondary" />,
    title: "Same-day Delivery",
    description:
      "For when you need it there now. The fastest and most reliable local delivery service.",
  },
  {
    icon: <Truck className="w-10 h-10 text-secondary" />,
    title: "Interstate Shipping",
    description:
      "Connecting cities and states with our efficient long-distance shipping network.",
  },
  {
    icon: <MapPin className="w-10 h-10 text-secondary" />,
    title: "Local Delivery",
    description:
      "For when you need it there now. The fastest and most reliable local delivery service.",
  },
  {
    icon: <Warehouse className="w-10 h-10 text-secondary" />,
    title: "Bulk & Freight",
    description:
      "Specialized solutions for your large-scale and heavy shipment requirements.",
  },
];

const features = [
  { icon: <Globe className="w-6 h-6" />, text: "Global Network" },
  { icon: <Clock className="w-6 h-6" />, text: "On-Time Delivery" },
  { icon: <ShieldCheck className="w-6 h-6" />, text: "Secure Cargo" },
  { icon: <Headphones className="w-6 h-6" />, text: "24/7 Support" },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
          >
            Comprehensive Logistics Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            From small packages to large cargo, we handle your shipments with
            precision and care, ensuring they arrive on time, every time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
            >
              <div className="mb-6 bg-secondary/5 w-20 h-20 rounded-full flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Features Strip */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center justify-center text-white gap-3"
              >
                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                  {feature.icon}
                </div>
                <span className="font-medium text-center">{feature.text}</span>
              </motion.div>
            ))}
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default Services;
