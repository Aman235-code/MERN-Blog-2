import React from "react";
import logo1 from "../assets/logo1.png";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-900 border-t border-gray-800">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 py-14 text-gray-400">
        {/* Brand */}
        <div>
          <img src={logo1} className="w-32 sm:w-44" alt="Postly logo" />
          <p className="max-w-sm mt-6 text-sm leading-relaxed">
            Postly is a quiet corner of the internet where ideas, notes, and
            long thoughts live. Read. Reflect. Move on a little wiser.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="p-3 rounded-full border border-white/10
                       hover:border-primary/60 hover:text-primary
                       transition-all duration-300 hover:scale-110"
          >
            <Github size={18} />
          </a>

          <a
            href="#"
            className="p-3 rounded-full border border-white/10
                       hover:border-primary/60 hover:text-primary
                       transition-all duration-300 hover:scale-110"
          >
            <Twitter size={18} />
          </a>

          <a
            href="#"
            className="p-3 rounded-full border border-white/10
                       hover:border-primary/60 hover:text-primary
                       transition-all duration-300 hover:scale-110"
          >
            <Linkedin size={18} />
          </a>

          <a
            href="#"
            className="p-3 rounded-full border border-white/10
                       hover:border-primary/60 hover:text-primary
                       transition-all duration-300 hover:scale-110"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>

      {/* Bottom */}
      <p className="py-6 text-center text-xs text-gray-500">
        © 2026 Postly. Created & Written by Aman.
      </p>
    </div>
  );
};

export default Footer;
