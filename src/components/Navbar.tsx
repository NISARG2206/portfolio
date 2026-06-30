"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Nisarg Patel
        </Link>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}>
          <li>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`${styles.navLink} ${pathname === "/" ? styles.activeLink : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className={`${styles.navLink} ${pathname === "/about" ? styles.activeLink : ""}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              onClick={() => setMenuOpen(false)}
              className={`${styles.navLink} ${pathname === "/projects" ? styles.activeLink : ""}`}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className={`${styles.navLink} ${pathname === "/contact" ? styles.activeLink : ""}`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className={styles.ctaButton}
            >
              Get In Touch
            </Link>
          </li>
        </ul>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>
    </nav>
  );
}
