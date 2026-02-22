/**
 * バッジデータを取得して静的JSONファイルを生成する CLI スクリプト
 *
 * 入力: src/data/badge-urls.json
 * 出力: .cache/badges.json
 *
 * 使い方: node scripts/fetch-badge-data.js
 *
 * 通常の開発では Vite plugin が自動実行するため、手動実行は不要。
 * API の動作確認やデバッグ用途で残してある。
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { fetchAllBadges } from "./badge-fetcher.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const badgeUrlsPath = path.join(root, "src/data/badge-urls.json");
const outputPath = path.join(root, ".cache/badges.json");

async function main() {
  const badgeUrls = JSON.parse(await fs.readFile(badgeUrlsPath, "utf-8"));
  console.log(`バッジ数: ${badgeUrls.length}`);

  const results = await fetchAllBadges(badgeUrls);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(results, null, 2), "utf-8");

  console.log(`\n完了: ${results.length}件 → ${outputPath}`);
  results.forEach((b, i) =>
    console.log(`  ${i + 1}. ${b.name} (${b.issuedOn || "発行日不明"})`),
  );
}

main().catch((err) => {
  console.error("エラーが発生しました:", err);
  process.exit(1);
});
