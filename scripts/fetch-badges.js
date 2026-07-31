/**
 * バッジデータを取得して src/data/badges.json を生成する CLI スクリプト
 *
 * 入力: src/data/badge-urls.json
 * 出力: src/data/badges.json
 *
 * 使い方: node scripts/fetch-badges.js
 *
 * バッジを追加・更新した際に手動で実行し、生成された badges.json をコミットする。
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { fetchBadgeData } from "../src/lib/badge-fetcher.js";
import { fetchCredlyBadge } from "../src/lib/credly-fetcher.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const badgeUrlsPath = path.join(root, "src/data/badge-urls.json");
const outputPath = path.join(root, "src/data/badges.json");

const DELAY_MS = 500;

async function main() {
  const entries = JSON.parse(await fs.readFile(badgeUrlsPath, "utf-8"));
  console.log(`バッジ数: ${entries.length}`);

  const results = [];
  for (const entry of entries) {
    const data =
      entry.source === "credly"
        ? await fetchCredlyBadge(entry.url, entry.note)
        : await fetchBadgeData(entry.url, entry.note);
    results.push(data);
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }

  await fs.writeFile(outputPath, JSON.stringify(results, null, 2), "utf-8");

  console.log(`\n完了: ${results.length}件 → ${outputPath}`);
  results.forEach((b, i) =>
    console.log(`  ${i + 1}. ${b.name} (${b.issuedOn || "発行日不明"})`)
  );
}

main().catch((err) => {
  console.error("エラーが発生しました:", err);
  process.exit(1);
});
