import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-end align-self-center">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="facebook-icon.png"
          alt="Facebook Icon"
          className="w-10 h-10 m-2"
        />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="instagram-icon.png"
          alt="Instagram Icon"
          className="w-10 h-10 m-2"
        />
      </a>
      <a
        href="https://www.whatsapp.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="whatsapp-icon.png"
          alt="WhatsApp Icon"
          className="w-10 h-10 m-2"
        />
      </a>
    </div>
  );
};

export default Footer;
