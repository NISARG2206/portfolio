"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import BootScreen from "../components/BootScreen";
import styles from "../styles/Dossier.module.css";

function shouldSkipBoot(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return sessionStorage.getItem("system_booted") === "true";
}

export default function Home() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [settled, setSettled] = useState(false);
  const [morphing, setMorphing] = useState(false);

  useLayoutEffect(() => {
    if (shouldSkipBoot()) {
      setMorphing(true);
      setSettled(true);
    }
  }, []);

  return (
    <>
      <BootScreen
        nameTargetRef={nameRef}
        onMorphStart={() => setMorphing(true)}
        onComplete={() => setSettled(true)}
      />

      <div
        className={`${styles.dossierWrapper} ${settled ? styles.settled : ""} ${morphing ? styles.morphing : ""}`}
      >
        <div className={styles.liveWidget} aria-label="System monitor nominal">
          <span className={styles.liveText}>SYS_MONITOR // NOMINAL</span>
          <div className={styles.liveIndicator}>
            <svg className={styles.pulseWave} viewBox="0 0 40 16" fill="none" aria-hidden="true">
              <path
                d="M0 8h10l2-6 3 12 2-8 2 2h21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.pulseDot} />
          </div>
        </div>

        <main className={styles.dossierContent}>
          <section className={styles.leftColumn} aria-label="File reference">
            <div className={styles.fileNumber}>FILE NO. 2026-FS-01</div>
            <div className={styles.statusTag}>STATUS: OPEN TO OPPORTUNITIES</div>
          </section>

          <section className={styles.mainColumn}>
            <h1
              ref={nameRef}
              className={`${styles.nameTitle} ${morphing ? styles.nameVisible : styles.namePending}`}
            >
              Nisarg Patel
            </h1>
            <p className={styles.statement}>
              I build production web systems — APIs that hold under load, interfaces
              that stay fast on real devices, and the glue between them that
              doesn&apos;t break at 2&nbsp;a.m.
            </p>
            <Link href="/about" className={styles.actionStamp}>
              OPEN FULL FILE ↓
            </Link>
          </section>

          <section className={styles.rightColumn} aria-label="Subject metadata">
            <div className={styles.metaItem}>
              <span className={styles.metaHeader}>FIELD_EXP // YRS</span>
              <span className={`${styles.metaValue} ${styles.metaRedacted}`}>
                <span className={styles.metaReveal}>03</span>
              </span>
              <span className={styles.metaNote}>since 2022</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaHeader}>P95_LATENCY // API</span>
              <span className={`${styles.metaValue} ${styles.metaRedacted}`}>
                <span className={styles.metaReveal}>&lt;80ms</span>
              </span>
              <span className={styles.metaNote}>inventory svc, prod</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaHeader}>DEPLOY_UPTIME // 90D</span>
              <span className={`${styles.metaValue} ${styles.metaRedacted}`}>
                <span className={styles.metaReveal}>99.4%</span>
              </span>
              <span className={styles.metaNote}>vercel + docker stack</span>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
