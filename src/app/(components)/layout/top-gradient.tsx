"use client";

import { motion } from "framer-motion";

interface TopGradientInterface {
    colors: any
}

const TopGradient = ({ colors }: TopGradientInterface) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-10px)" }}
      animate={{ opacity: 0.7, transform: "translateY(0px)" }}
      transition={{ duration: 0.4, ease: "easeIn" }}
      className="absolute blur-3xl opacity-40 top-0 left-0 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full w-full h-32"
    ></motion.div>
  );
};

export default TopGradient;
