import React from "react";

interface ButtonLoaderProps {}

const ButtonLoader: React.FC<ButtonLoaderProps> = () => {
  return <div className="lds-dual-ring"></div>;
};

export default ButtonLoader;
