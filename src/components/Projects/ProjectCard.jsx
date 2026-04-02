import React, { useState } from "react";
import styles from "./Projects.module.css";

export default function ProjectCard({
  title,
  titleJa,
  description,
  descriptionJa,
  image,
  githubUrl,
  demoUrl,
  technologies,
  onOpenModal,
}) {
  const [imageError, setImageError] = useState(false);

  // GitHub OGP画像のURLを生成（リポジトリ名から）
  const getOGPImageUrl = (githubUrl) => {
    if (!githubUrl) return null;
    try {
      const url = new URL(githubUrl);
      const pathParts = url.pathname.split("/").filter(Boolean);
      if (pathParts.length >= 2) {
        const owner = pathParts[0];
        const repo = pathParts[1];
        return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
      }
    } catch (e) {
      console.error("Invalid GitHub URL:", githubUrl);
    }
    return null;
  };

  const ogpImageUrl = image || getOGPImageUrl(githubUrl);

  return (
    <article className={styles.projectCard} onClick={onOpenModal} style={{ cursor: "pointer" }}>
      {/* プロジェクト画像 */}
      {ogpImageUrl && !imageError && (
        <div className={styles.imageContainer}>
          <img
            src={ogpImageUrl}
            alt={title}
            className={styles.projectImage}
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className={styles.imageOverlay}></div>
        </div>
      )}

      {/* プロジェクト情報 */}
      <div className={styles.projectInfo}>
        <div className={styles.projectHeader}>
          <h3 className={styles.projectTitle}>{title}</h3>
          {titleJa && <p className={styles.projectTitleJa}>{titleJa}</p>}
        </div>

        <p className={styles.projectDescription}>
          {descriptionJa || description}
        </p>

        {/* 技術スタックタグ */}
        {technologies && technologies.length > 0 && (
          <div className={styles.techTags}>
            {technologies.map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* リンクボタン */}
        <div className={styles.projectLinks} onClick={(e) => e.stopPropagation()}>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
          )}

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoLink}
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
              </svg>
              成果物
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

