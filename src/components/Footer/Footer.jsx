import React from "react";
import { FaRegCopyright, FaGithub } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <a href="https://kanare.dev" className={styles.link}>
          <FaRegCopyright className={styles.icon} />
          <span>2025 Kanare Kodera</span>
        </a>
      </div>
      <div className={styles.right}>
        <a
          href="https://github.com/kanare-dev/portfolio-site"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <FaGithub className={styles.icon} />
          <span>Source on GitHub</span>
        </a>
      </div>
    </footer>
  );
}
