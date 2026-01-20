import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-lg">
            Have a question or need a quote? Our team is available 24/7 to
            assist you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-orange-50 p-3 rounded-full text-secondary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">
                    Our Location
                  </h4>
                  <p className="text-gray-600">
                    Office No, 4 Millennium Complex, Owode Academy, Olomi Road,
                    Ibadan
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-orange-50 p-3 rounded-full text-secondary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">
                    Email Us
                  </h4>
                  <p className="text-gray-600">deliteo2logistics@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 p-3 rounded-full text-secondary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">
                    Call Us
                  </h4>
                  <p className="text-gray-600">+234 818 261 1435</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <form className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  placeholder="Inquiry about..."
                />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                  placeholder="Details about your delivery..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
