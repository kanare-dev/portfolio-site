import React from "react";
import classNames from "classnames";

import ProfileImage from "./ProfileImage";
import styles from "./Profile.module.css";

import { FaLaptopCode, FaLocationDot, FaGift } from "react-icons/fa6";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import NoteIcon from "@/components/Icon/NoteIcon";
import ZennIcon from "@/components/Icon/ZennIcon";
import HatenaBlogIcon from "@/components/Icon/HatenaBlogIcon";

const items = [
  {
    icon: FaLaptopCode,
    content: "Cloud Engineer",
  },
  {
    icon: FaLocationDot,
    content: "Tokyo, Japan",
  },
  {
    icon: FaGift,
    content: "2001.1.7",
  },
];

const socialLinks = [
  {
    icon: FaGithub,
    url: "https://github.com/kanare-dev",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/kanare/",
    label: "LinkedIn",
  },
  {
    icon: FaXTwitter,
    url: "https://x.com/Canale_tech",
    label: "X",
  },
  {
    icon: ZennIcon,
    url: "https://zenn.dev/canale",
    label: "Zenn",
  },
  {
    icon: HatenaBlogIcon,
    url: "https://canale0107.hatenablog.com/",
    label: "HatenaBlog",
  },
  {
    icon: NoteIcon,
    url: "https://note.com/canale",
    label: "note",
  },
];

export default function Profile() {
  return (
    <section className={classNames("profile-page__section", styles.profile)}>
      <ProfileImage />
      <h2 className={styles.name}>
        <div className={styles.nameJa}>小寺 奏怜</div>
        <div className={styles.nameEn}>Kodera Kanare</div>
      </h2>
      <ul className={styles.details}>
        {items.map(({ icon: Icon, content }, i) => (
          <li key={i} className={styles.detailItem}>
            <Icon className={styles.icon} />
            <div>{content}</div>
          </li>
        ))}
      </ul>

      {/* SNSリンクアイコンボックス */}
      <ul className={styles.socialLinks}>
        {socialLinks.map(({ icon: Icon, url, label }, i) => (
          <li key={i}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon className={styles.socialIcon} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
