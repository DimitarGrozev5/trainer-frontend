import { useEffect, useId, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Outlet } from "react-router-dom";
import styles from "./BaseTemplate.module.css";

const BaseTemplate = () => {
  // Get ref to container div
  const containerRef: React.Ref<HTMLDivElement> = useRef(null);
  const h1Ref: React.Ref<HTMLDivElement> = useRef(null);
  const h3Ref: React.Ref<HTMLDivElement> = useRef(null);

  // Get current scroll position
  const { scrollYProgress } = useScroll({
    target: h1Ref,
    offset: ["start start", "end start"],
  });

  // Animate headers based on scroll position
  const cutoff1 = 0.6;
  const cutoff2 = 0.75;
  const fadeOutAnim = useTransform(
    scrollYProgress,
    [0, cutoff1, cutoff2, 1],
    [1, 0, 0, 0]
  );
  const yOutAnim = useTransform(
    scrollYProgress,
    [0, cutoff1, cutoff2, 1],
    ["0vh", "8vh", "0vh", "0vh"]
  );
  const fadeInAnim = useTransform(
    scrollYProgress,
    [0, cutoff1, cutoff2, 1],
    [0, 0, 1, 1]
  );

  scrollYProgress.onChange((latest) => {
    if (!h3Ref.current) {
      return;
    }
    if (latest >= 1) {
      h3Ref.current.style.position = "fixed";
      h3Ref.current.style.left = "0.5rem";
      return;
    }
    if (latest < 0.88) {
      h3Ref.current.style.position = "relative";
      h3Ref.current.style.left = "0px";
    }
  });

  return (
    <div className={styles.container} ref={containerRef}>
      <header>
        <motion.h1 ref={h1Ref} style={{ opacity: fadeOutAnim, y: yOutAnim }}>
          Trainer
        </motion.h1>
        <motion.h3 ref={h3Ref} style={{ opacity: fadeInAnim }} layout>
          Trainer
        </motion.h3>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseTemplate;
