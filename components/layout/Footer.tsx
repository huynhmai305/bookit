import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="py-1">
      <p className="text-center mt-1">Book IT - 2021, All Right Reserved</p>
    </footer>
  );
};

export default Footer;
