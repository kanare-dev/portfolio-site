import styles from "./Overview.module.css";

export default function Purpose() {
  return (
    <section id="purpose">
      <h2>
        <span className="sec-en">MY PURPOSE</span>
        <span className="sec-ja">パーパス</span>
      </h2>
      <div className={styles.purpose}>
        <div className={styles.purposeLine}></div>
        <div className={styles.purposeTexts}>
          <p className={styles.purposeJa}>
            複雑さの中に構造を見出し、その作用を明らかにした上で妥当性を問い直し、共有可能な形へ整える。
          </p>
          <p className={styles.purposeEn}>
            Find structure in complexity, reveal the effects, question the
            validity, and shape it into a shareable form.
          </p>
        </div>
      </div>
    </section>
  );
}
