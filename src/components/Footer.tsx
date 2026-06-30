import styles from "../styles/Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>Nisarg Patel</div>
        <p className={styles.text}>
          &copy; {currentYear} Nisarg Patel. All rights reserved. Designed & built from scratch.
        </p>
      </div>
    </footer>
  );
}
