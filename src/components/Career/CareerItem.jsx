import styles from "./Career.module.css";

export default function CareerItem({ date, title, descriptions = [], technologies = [], projects = [] }) {
  // dateがオブジェクト形式（期間）か文字列形式（単一時点）かを判定
  const renderDate = (date) => {
    if (typeof date === "string") {
      // 後方互換性のため、文字列の場合はそのまま返す
      return <span className={styles.date}>{date}</span>;
    }
    
    if (typeof date === "object" && date !== null) {
      const { start, end } = date;
      
      // startとendが同じ場合は単一時点として表示
      if (start === end) {
        return <span className={styles.date}>{start}</span>;
      }
      
      // 期間として表示（開始日と終了日を2行に分ける）
      return (
        <div className={styles.dateRange}>
          <span className={styles.dateStart}>{start}</span>
          <span className={styles.dateEnd}>{end ? `~${end}` : "~現在"}</span>
        </div>
      );
    }
    
    return <span className={styles.date}>{date}</span>;
  };

  return (
    <li className={styles.item}>
      {renderDate(date)}
      <div className={styles.event}>
        <p className={styles.title}>{title}</p>
        {descriptions.map((desc, i) => (
          <p key={i} className={styles.description}>
            {desc}
          </p>
        ))}
        {technologies && technologies.length > 0 && (
          <div className={styles.technologies}>
            {technologies.map((tech, i) => (
              <span key={i} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <ul className={styles.projects}>
            {projects.map((project, i) => (
              <li key={i} className={styles.project}>
                <p className={styles.projectTitle}>{project.title}</p>
                {project.descriptions?.map((desc, j) => (
                  <p key={j} className={styles.description}>
                    {desc}
                  </p>
                ))}
                {project.technologies?.length > 0 && (
                  <div className={styles.technologies}>
                    {project.technologies.map((tech, j) => (
                      <span key={j} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
