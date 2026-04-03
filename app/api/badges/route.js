import { readFile, writeFile, mkdir } from "fs/promises";
import { createHash } from "crypto";
import path from "path";
import { fetchAllBadges } from "@/lib/badge-fetcher";

const BADGE_URLS_PATH = path.join(process.cwd(), "src/data/badge-urls.json");
const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "badges.json");
const META_FILE = path.join(CACHE_DIR, "badges.meta.json");

function hash(content) {
  return createHash("sha256").update(content).digest("hex");
}

async function readMeta() {
  try {
    return JSON.parse(await readFile(META_FILE, "utf-8"));
  } catch {
    return null;
  }
}

async function readCache() {
  try {
    return JSON.parse(await readFile(CACHE_FILE, "utf-8"));
  } catch {
    return null;
  }
}

async function writeCache(data, urlsHash) {
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
    await writeFile(META_FILE, JSON.stringify({ hash: urlsHash }), "utf-8");
  } catch {
    // 読み取り専用ファイルシステム（Vercel等）ではキャッシュ書き込みをスキップ
  }
}

export async function GET() {
  try {
    const urlsRaw = await readFile(BADGE_URLS_PATH, "utf-8");
    const urlsHash = hash(urlsRaw);
    const meta = await readMeta();

    if (meta?.hash === urlsHash) {
      const cached = await readCache();
      if (cached) {
        return Response.json(cached);
      }
    }

    const badgeUrls = JSON.parse(urlsRaw);
    const data = await fetchAllBadges(badgeUrls);
    await writeCache(data, urlsHash);

    return Response.json(data);
  } catch (err) {
    console.error("[badges API]", err);
    return Response.json([]);
  }
}
