import React from "react";
import certifications from "@/data/certifications.json";
import skills from "@/data/skills.json";
import badges from "virtual:badges";
import CertificationList from "./CertificationList";
import BadgeList from "./BadgeList";
import SkillList from "./SkillList";
import levelDefStyles from "./SkillsLevelDefinitions.module.css";

export default function Skills() {
  return (
    <section
      className="profile-page__section profile-page__wide-section"
      id="skills"
    >
      <h2>
        <span className="sec-en">SKILLS</span>
        <span className="sec-ja">資格・スキル</span>
      </h2>

      <h3>保有資格</h3>
      <CertificationList data={certifications} />

      {badges && badges.length > 0 && (
        <>
          <h3>保有バッジ</h3>
          <BadgeList data={badges} />
        </>
      )}

      <h3>スキル</h3>

      {/* レベル定義 */}
      <div className={levelDefStyles.container}>
        <h4 className={levelDefStyles.title}>スキルレベル定義</h4>
        <div className={levelDefStyles.grid}>
          <div className={levelDefStyles.item}>
            <div className={levelDefStyles.levelBadge}>Lv.1</div>
            <div className={levelDefStyles.levelTitle}>理解・試行段階</div>
            <ul className={levelDefStyles.descriptionList}>
              <li>概念・目的・代表的な使い方を理解している</li>
              <li>チュートリアルやサンプルを再現できる</li>
              <li>指示や既存手順があれば使える</li>
            </ul>
          </div>
          <div className={levelDefStyles.item}>
            <div className={levelDefStyles.levelBadge}>Lv.2</div>
            <div className={levelDefStyles.levelTitle}>
              限定条件下で自力使用できる
            </div>
            <ul className={levelDefStyles.descriptionList}>
              <li>明確な目的・前提条件があれば自力で使える</li>
              <li>ドキュメントや事例を参照しながら実装・操作できる</li>
              <li>小規模・個人用途での再現性がある</li>
            </ul>
          </div>
          <div className={levelDefStyles.item}>
            <div className={levelDefStyles.levelBadge}>Lv.3</div>
            <div className={levelDefStyles.levelTitle}>
              要件ベースで自走できる
            </div>
            <ul className={levelDefStyles.descriptionList}>
              <li>要件を理解し、構成・方針・使い方を自分で選べる</li>
              <li>トラブル時に原因を切り分け、修正できる</li>
              <li>実務・プロジェクトで継続的に使用できる</li>
            </ul>
          </div>
          <div className={levelDefStyles.item}>
            <div className={levelDefStyles.levelBadge}>Lv.4</div>
            <div className={levelDefStyles.levelTitle}>
              設計・改善・最適化ができる
            </div>
            <ul className={levelDefStyles.descriptionList}>
              <li>複数の選択肢を比較し、適切なものを選定できる</li>
              <li>非機能要件（保守性・安全性・コスト・再現性）を考慮できる</li>
              <li>他者の成果物や使い方に対して改善提案ができる</li>
            </ul>
          </div>
          <div className={levelDefStyles.item}>
            <div className={levelDefStyles.levelBadge}>Lv.5</div>
            <div className={levelDefStyles.levelTitle}>
              抽象化・標準化・教育ができる
            </div>
            <ul className={levelDefStyles.descriptionList}>
              <li>ノウハウを抽象化し、他者に再現可能な形で共有できる</li>
              <li>チームや組織の標準・ガイドラインを作れる</li>
              <li>技術選定や運用方針に責任を持てる</li>
            </ul>
          </div>
        </div>
      </div>

      <SkillList data={skills} />
    </section>
  );
}
