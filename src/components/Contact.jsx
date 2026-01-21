import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // 1. Open WhatsApp
    const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Subject:* ${data.subject}%0A*Message:* ${data.message}`;
    window.open(
      `https://wa.me/2348182611435?text=${whatsappMessage}`,
      "_blank",
    );

    // 2. Send Email via EmailJS
    try {
      // These should be in your .env.local file or replaced with literal strings
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        publicKey,
      );

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <div className="bg-secondary/5 p-3 rounded-full text-secondary">
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
                <div className="bg-secondary/5 p-3 rounded-full text-secondary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">
                    Email Us
                  </h4>
                  <p className="text-gray-600">deliteo2logistics@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-secondary/5 p-3 rounded-full text-secondary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">
                    Call Us
                  </h4>
                  <p className="text-gray-600">09114082983</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-secondary/5 p-3 rounded-full text-secondary">
                  <FaWhatsapp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">
                    WhatsApp
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  {...register("subject", { required: true })}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  placeholder="Inquiry about..."
                />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  {...register("message", { required: true })}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all resize-none"
                  placeholder="Details about your delivery..."
                ></textarea>
              </div>

              {submitStatus === "success" && (
                <div className="mb-4 text-green-600 bg-green-50 p-3 rounded-lg">
                  Message sent successfully! Opening WhatsApp...
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg">
                  Something went wrong with email. WhatsApp opened.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-secondary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    Sending... <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
