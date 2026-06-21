"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = {
    damping: 25,
    stiffness: 400,
    mass: 0.5,
  };

  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const touch =
      window.matchMedia("(pointer: coarse)").matches;

    setIsTouchDevice(touch);

    if (touch) return;

    const moveCursor = (e) => {
      if (!isVisible) setIsVisible(true);

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () =>
      setIsVisible(false);

    const handleMouseEnter = () =>
      setIsVisible(true);

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    document.body.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    document.body.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor
      );

      document.body.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      document.body.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, [isVisible, mouseX, mouseY]);

  if (!mounted || isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#E88D15] rounded-full pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#a1c98f] rounded-full pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}