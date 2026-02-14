"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  children: React.ReactNode;
};

export default function SlideIn({ direction = "left", delay = 0, children }: Props) {
  const variants = {
    hidden: {
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? -30 : direction === "down" ? 30 : 0,
      opacity: 0,
    },
    visible: { x: 0, y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
