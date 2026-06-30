"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "../styles/BootScreen.module.css";

const LOGS = [
  { text: "INIT PROFILE_KERNEL v1.0", accent: false },
  { text: "LOCATING SIGNAL... AHMEDABAD, GJ, IN", accent: false },
  { text: "LATENCY 11ms — STATUS: NOMINAL", accent: true, key: "NOMINAL" },
  { text: "ANOMALY_SCORE 0.00 — NO DEVIATIONS DETECTED", accent: false },
  { text: "COMPILING SUBJECT FILE...", accent: false, morph: true },
] as const;

const LOG_STAGGER_MS = 250;
const LOG_OFFSET_MS = 100;
const MORPH_DELAY_MS = 1500;
const MORPH_DURATION_MS = 850;

interface BootScreenProps {
  onComplete: () => void;
  onMorphStart: () => void;
  nameTargetRef: RefObject<HTMLElement | null>;
}

export default function BootScreen({
  onComplete,
  onMorphStart,
  nameTargetRef,
}: BootScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeLogs, setActiveLogs] = useState<number[]>([]);
  const [phase, setPhase] = useState<"logging" | "morphing" | "done">("logging");
  const [mounted, setMounted] = useState(true);
  const [morphStyle, setMorphStyle] = useState<{
    x: number;
    y: number;
    scale: number;
  } | null>(null);
  const lastLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const skipBoot =
      prefersReducedMotion || sessionStorage.getItem("system_booted") === "true";

    if (skipBoot) {
      setPhase("done");
      setMounted(false);
      onMorphStart();
      onComplete();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    LOGS.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setActiveLogs((prev) => [...prev, index]);
        }, LOG_OFFSET_MS + index * LOG_STAGGER_MS)
      );
    });

    timers.push(
      setTimeout(() => {
        const source = lastLineRef.current;
        const target = nameTargetRef.current;

        if (source && target) {
          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const sourceCenterX = sourceRect.left + sourceRect.width / 2;
          const sourceCenterY = sourceRect.top + sourceRect.height / 2;
          const targetCenterX = targetRect.left + targetRect.width / 2;
          const targetCenterY = targetRect.top + targetRect.height / 2;

          setMorphStyle({
            x: targetCenterX - sourceCenterX,
            y: targetCenterY - sourceCenterY,
            scale: targetRect.width / Math.max(sourceRect.width, 1),
          });
        }

        setPhase("morphing");
        onMorphStart();
      }, MORPH_DELAY_MS)
    );

    timers.push(
      setTimeout(() => {
        sessionStorage.setItem("system_booted", "true");
        setPhase("done");
        setMounted(false);
        onComplete();
      }, MORPH_DELAY_MS + MORPH_DURATION_MS + 120)
    );

    return () => timers.forEach(clearTimeout);
  }, [nameTargetRef, onComplete, onMorphStart, prefersReducedMotion]);

  if (!mounted) return null;

  const renderLogText = (log: (typeof LOGS)[number]) => {
    if (log.accent && "key" in log && log.key) {
      const [before, after] = log.text.split(log.key);
      return (
        <>
          {before}
          <span className={styles.accent}>{log.key}</span>
          {after}
        </>
      );
    }
    return log.text;
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.overlay} ${phase === "morphing" ? styles.wipeOut : ""}`}
      aria-hidden="true"
    >
      <div className={styles.logContainer}>
        {LOGS.map((log, idx) => {
          if (!activeLogs.includes(idx)) return null;

          const isMorphLine = "morph" in log && log.morph;
          const isHiddenDuringMorph = phase === "morphing" && !isMorphLine;

          if (isMorphLine && phase === "morphing" && morphStyle) {
            return (
              <motion.div
                key={idx}
                ref={lastLineRef}
                className={`${styles.logLine} ${styles.morphLine}`}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: [1, 1, 0],
                  x: morphStyle.x,
                  y: morphStyle.y,
                  scale: morphStyle.scale,
                }}
                transition={{
                  duration: MORPH_DURATION_MS / 1000,
                  ease: [0.76, 0, 0.24, 1],
                  opacity: { times: [0, 0.85, 1], duration: MORPH_DURATION_MS / 1000 },
                }}
              >
                <span className={styles.accent}>&gt; </span>
                {renderLogText(log)}
              </motion.div>
            );
          }

          return (
            <div
              key={idx}
              ref={isMorphLine ? lastLineRef : undefined}
              className={`${styles.logLine} ${isHiddenDuringMorph ? styles.logFadeOut : ""}`}
            >
              <span className={styles.accent}>&gt; </span>
              {renderLogText(log)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
