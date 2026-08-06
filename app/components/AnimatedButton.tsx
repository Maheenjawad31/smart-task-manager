"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type ButtonState =
  | "idle"
  | "loading"
  | "success"
  | "error";

  type AnimatedButtonProps = {
    label: string;
    disabled?: boolean;
    simulateError?: boolean;
    type?: "button" | "submit";
  };

  export default function AnimatedButton({
    label,
    disabled = false,
    simulateError = false,
    type = "button",
  }: AnimatedButtonProps) {
    const prefersReducedMotion = useReducedMotion();
  const [state, setState] =
    useState<ButtonState>("idle");

  const handleClick = () => {
    if (disabled || state === "loading") return;

    setState("loading");

    setTimeout(() => {
      if (simulateError) {
        setState("error");
      } else {
        setState("success");
      }
    }, 1800);
  };

  useEffect(() => {
    if (state === "success" || state === "error") {
      const timer = setTimeout(() => {
        setState("idle");
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <motion.button
    type={type}
    whileHover={
        !disabled && !prefersReducedMotion
          ? { scale: 1.05 }
          : {}
      }
      whileTap={
        !disabled && !prefersReducedMotion
          ? { scale: 0.95 }
          : {}
      }
      onClick={handleClick}
      disabled={disabled}
      animate={
        state === "error"
          ? {
              x: [0, -8, 8, -8, 8, 0],
            }
          : {}
      }
      transition={{
        duration: 0.4,
      }}
      className={`rounded-lg px-6 py-3 font-semibold text-white transition
        focus:outline-none
        focus:ring-4
        focus:ring-blue-400
      ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : state === "success"
          ? "bg-green-600"
          : state === "error"
          ? "bg-red-600"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      <motion.span
        key={state}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        {state === "idle" && label}
        {state === "loading" && "Loading..."}
        {state === "success" && "✓ Success"}
        {state === "error" && "Retry"}
      </motion.span>
    </motion.button>
  );
}