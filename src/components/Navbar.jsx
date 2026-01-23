import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "Services", href: "/#services" },
    { name: "About Us", href: "/#about" },
    { name: "Why Us", href: "/#why-choose-us" },
    { name: "Partnership", href: "/partnership" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-2 bg-white px-6 transition-all duration-300 shadow-xl ${
            isScrolled
              ? "-mt-4 pt-4 pb-4 rounded-b-2xl"
              : "-mt-6 pt-8 pb-6 rounded-b-3xl"
          }`}
        >
          <Image
            src="/logo.png"
            alt="Delite Logistics Logo"
            width={150}
            height={50}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-secondary transition-colors ${
                isScrolled ? "text-primary" : "text-white/90 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          href="/#contact"
          className="hidden md:block bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg shadow-secondary/20"
        >
          Contact us
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-primary" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-primary" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 md:hidden border-t border-gray-100"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary font-medium hover:text-secondary py-2 border-b border-gray-50 last:border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="#contact"
              className="bg-secondary text-white text-center py-3 rounded-lg font-bold mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get a Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
