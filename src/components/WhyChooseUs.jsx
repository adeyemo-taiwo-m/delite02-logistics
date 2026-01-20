import { motion } from "framer-motion";
import { Award, Zap, Users, BarChart } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-8 h-8 text-secondary" />,
    value: "500+",
    label: "Clients Worldwide",
  },
  {
    icon: <Award className="w-8 h-8 text-secondary" />,
    value: "15+",
    label: "Years Experience",
  },
  {
    icon: <BarChart className="w-8 h-8 text-secondary" />,
    value: "98%",
    label: "On-Time Delivery",
  },
  {
    icon: <Zap className="w-8 h-8 text-secondary" />,
    value: "24/7",
    label: "Support Service",
  },
];

const reasons = [
  {
    title: "Transparent Pricing",
    description:
      "No hidden fees or surprises. We provide detailed quotes and billing clarity upfront.",
  },
  {
    title: "Real-Time Tracking",
    description:
      "Monitor your shipments 24/7 with our advanced GPS and satellite tracking systems.",
  },
  {
    title: "Expert Handling",
    description:
      "Certified professionals ensuring your fragile and high-value cargo is handled with care.",
  },
];

const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      className="py-24 bg-primary text-white relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-32" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-8 leading-tight"
            >
              Why Choose <br />
              <span className="text-secondary">Delite Logistics?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg mb-10 leading-relaxed"
            >
              We don't just deliver packages—we optimize your entire delivery
              process to accelerate business growth.
            </motion.p>

            <div className="space-y-8">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-2 h-full min-h-[50px] bg-secondary rounded-full" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                    <p className="text-gray-400">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/20 transition-colors"
                >
                  <div className="mb-4 bg-white/20 p-3 rounded-full">
                    {stat.icon}
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </h4>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
