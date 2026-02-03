import React from "react";
import { footer_data } from "../assets/assets";
import logo1 from "../assets/logo1.png";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-900 border-t border-gray-800">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 py-14 text-gray-400">
        {/* Brand */}
        <div>
          <img src={logo1} className="w-32 sm:w-44" alt="Postly logo" />
          <p className="max-w-sm mt-6 text-sm leading-relaxed">
            Postly is a quiet corner of the internet where ideas, notes, and
            long thoughts live. Read. Reflect. Move on a little wiser.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-8">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-medium text-sm text-gray-200 mb-4">
                {section.title}
              </h3>
              <ul className="text-sm space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
