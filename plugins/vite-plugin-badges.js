/**
 * Vite plugin: badge-urls.json から自動でバッジデータを取得し、
 * virtual:badges モジュールとして提供する。
 *
 * - dev/build 開始時に badge-urls.json を読み、API からデータを取得
 * - .cache/badges.json にキャッシュし、badge-urls.json が変わらなければ再取得しない
 * - dev モードでは badge-urls.json の変更を watch し、HMR で即座に反映
 */

import fs from "fs/promises";
import { createHash } from "crypto";
import path from "path";
import { fetchAllBadges } from "../scripts/badge-fetcher.js";

const VIRTUAL_MODULE_ID = "virtual:badges";
const RESOLVED_ID = "\0virtual:badges";

const BADGE_URLS_REL = "src/data/badge-urls.json";
const CACHE_DIR = ".cache";
const CACHE_FILE = "badges.json";
const META_FILE = "badges.meta.json";

function hash(content) {
  return createHash("sha256").update(content).digest("hex");
}

export default function badgesPlugin() {
  let root;
  let badgeUrlsPath;
  let cachePath;
  let metaPath;
  let cachedJson = null;

  function paths(projectRoot) {
    root = projectRoot;
    badgeUrlsPath = path.join(root, BADGE_URLS_REL);
    cachePath = path.join(root, CACHE_DIR, CACHE_FILE);
    metaPath = path.join(root, CACHE_DIR, META_FILE);
  }

  async function readBadgeUrls() {
    return await fs.readFile(badgeUrlsPath, "utf-8");
  }

  async function ensureCacheDir() {
    await fs.mkdir(path.join(root, CACHE_DIR), { recursive: true });
  }

  async function readMeta() {
    try {
      return JSON.parse(await fs.readFile(metaPath, "utf-8"));
    } catch {
      return null;
    }
  }

  async function writeMeta(urlsHash) {
    await ensureCacheDir();
    await fs.writeFile(
      metaPath,
      JSON.stringify({ hash: urlsHash }),
      "utf-8",
    );
  }

  async function readCache() {
    try {
      return await fs.readFile(cachePath, "utf-8");
    } catch {
      return null;
    }
  }

  async function writeCache(data) {
    await ensureCacheDir();
    await fs.writeFile(cachePath, JSON.stringify(data, null, 2), "utf-8");
  }

  /**
   * badge-urls.json のハッシュを比較し、必要なら API を叩いてキャッシュを更新する。
   * キャッシュ済みなら即座に返す。
   */
  async function syncBadges() {
    const urlsRaw = await readBadgeUrls();
    const urlsHash = hash(urlsRaw);
    const meta = await readMeta();

    if (meta?.hash === urlsHash) {
      const cached = await readCache();
      if (cached) {
        cachedJson = cached;
        return;
      }
    }

    // キャッシュミス — API からフェッチ
    const badgeUrls = JSON.parse(urlsRaw);
    console.log(`[badges] ${badgeUrls.length}件のバッジデータを取得中...`);

    const data = await fetchAllBadges(badgeUrls);
    await writeCache(data);
    await writeMeta(urlsHash);

    cachedJson = JSON.stringify(data, null, 2);
    console.log(`[badges] 取得完了 → .cache/badges.json`);
  }

  return {
    name: "vite-plugin-badges",

    configResolved(config) {
      paths(config.root);
    },

    async buildStart() {
      try {
        await syncBadges();
      } catch (err) {
        const cached = await readCache();
        if (cached) {
          console.warn(
            `[badges] API 取得失敗、キャッシュを使用: ${err.message}`,
          );
          cachedJson = cached;
        } else {
          console.warn(
            `[badges] API 取得失敗、キャッシュなし。バッジは空配列: ${err.message}`,
          );
          cachedJson = "[]";
        }
      }
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_ID;
    },

    load(id) {
      if (id === RESOLVED_ID) {
        return `export default ${cachedJson || "[]"};`;
      }
    },

    configureServer(server) {
      server.watcher.add(badgeUrlsPath);

      server.watcher.on("change", async (file) => {
        if (path.normalize(file) !== path.normalize(badgeUrlsPath)) return;

        console.log(`[badges] badge-urls.json が変更されました。再取得中...`);
        try {
          cachedJson = null;
          await syncBadges();
        } catch (err) {
          console.warn(`[badges] 再取得失敗: ${err.message}`);
          return;
        }

        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}
