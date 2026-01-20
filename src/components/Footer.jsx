import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-primary text-gray-300 py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/logo.png"
                alt="Delite Logistics Logo"
                width={150}
                height={50}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed">
              Providing top-tier global logistics solutions with speed,
              reliability, and precision. Your cargo, our priority.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#hero"
                  className="hover:text-secondary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-secondary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Air Freight
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Ocean Freight
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Road Transport
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Warehousing
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center bg-primary">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Delite Logistics. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
