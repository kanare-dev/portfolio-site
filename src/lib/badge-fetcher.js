/**
 * OpenBadge API からバッジデータを取得するモジュール
 *
 * Vite plugin および CLI スクリプトの両方から利用される。
 */

const API_BASE = "https://nlp.netlearning.co.jp/api/v1.0/openbadge/v2";
const DELAY_MS = 500;

async function fetchIssuerName(issuer) {
  if (!issuer) return null;

  if (typeof issuer === "object" && issuer.name) {
    return issuer.name;
  }

  if (typeof issuer === "string") {
    try {
      const res = await fetch(issuer);
      if (res.ok) {
        const data = await res.json();
        return data.name || null;
      }
    } catch {
      // CORS or network failure — skip
    }
  }

  return null;
}

function extractAssertionId(url) {
  const match = url.match(/\/GetAssertionShare\/([^/]+)/);
  if (!match) throw new Error(`Invalid badge URL format: ${url}`);
  return match[1];
}

function resolveImageUrl(primary, fallback) {
  if (!primary) return fallback;
  if (typeof primary === "string") return primary;
  return primary.id || fallback;
}

async function tryHostApi(assertionId, badgeUrl, note) {
  const hostApiUrl = `${API_BASE}/Assertion/Host/${assertionId}`;
  const res = await fetch(hostApiUrl);
  if (!res.ok) return null;

  const data = await res.json();
  if (data.errors || data.status === 500) return null;

  const issuedOn = data.issuedOn;

  if (!data.badge) return { issuedOn, badgeInfo: null };

  const badgeRes = await fetch(data.badge);
  if (!badgeRes.ok) return { issuedOn, badgeInfo: null };

  const badge = await badgeRes.json();
  const image = resolveImageUrl(
    badge.image,
    `${API_BASE}/Assertion/Host/${assertionId}/Image`,
  );
  const issuer = await fetchIssuerName(badge.issuer);

  return {
    issuedOn,
    badgeInfo: {
      name: badge.name || note,
      description: badge.description || "",
      image,
      issuedOn,
      url: badgeUrl,
      ...(issuer && { issuer }),
    },
  };
}

async function tryAltApi(assertionId, badgeUrl, note) {
  const altApiUrl = `${API_BASE}/Assertion/${assertionId}`;
  const res = await fetch(altApiUrl);
  if (!res.ok) return null;

  const data = await res.json();
  if (data.errors || data.status === 500) return null;

  const issuedOn = data.issuedOn;

  if (!data.badge) return { issuedOn, badgeInfo: null };

  const badgeRes = await fetch(data.badge);
  if (!badgeRes.ok) return { issuedOn, badgeInfo: null };

  const badge = await badgeRes.json();

  let image =
    resolveImageUrl(data.image, null) || resolveImageUrl(badge.image, null);
  if (!image) {
    image = `${API_BASE}/Assertion/${assertionId}/image`;
  }

  const issuer = await fetchIssuerName(badge.issuer);

  return {
    issuedOn,
    badgeInfo: {
      name: badge.name || note,
      description: badge.description || "",
      image,
      issuedOn,
      url: badgeUrl,
      ...(issuer && { issuer }),
    },
  };
}

function getMetaContent(html, property) {
  const patterns = [
    new RegExp(`<meta\\s+property="${property}"\\s+content="([^"]*)"`, "i"),
    new RegExp(`<meta\\s+content="([^"]*)"\\s+property="${property}"`, "i"),
    new RegExp(`<meta\\s+name="${property}"\\s+content="([^"]*)"`, "i"),
    new RegExp(`<meta\\s+content="([^"]*)"\\s+name="${property}"`, "i"),
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return m[1];
  }
  return null;
}

async function tryHtmlFallback(assertionId, badgeUrl, note, existingIssuedOn) {
  const res = await fetch(badgeUrl);
  if (!res.ok) throw new Error(`Failed to fetch badge HTML: ${res.status}`);

  const html = await res.text();
  const title =
    getMetaContent(html, "og:title") || getMetaContent(html, "twitter:title");
  const description =
    getMetaContent(html, "og:description") ||
    getMetaContent(html, "twitter:description");
  let image =
    getMetaContent(html, "og:image") || getMetaContent(html, "twitter:image");
  if (!image) {
    image = `${API_BASE}/Assertion/${assertionId}/image`;
  }

  let issuedOn = existingIssuedOn;
  if (!issuedOn) {
    for (const path of [
      `Assertion/Host/${assertionId}`,
      `Assertion/${assertionId}`,
    ]) {
      try {
        const r = await fetch(`${API_BASE}/${path}`);
        if (r.ok) {
          const d = await r.json();
          if (!d.errors && d.status !== 500 && d.issuedOn) {
            issuedOn = d.issuedOn;
            break;
          }
        }
      } catch {
        // continue
      }
    }
  }

  return {
    name: title || note,
    description: description || "",
    image,
    issuedOn,
    url: badgeUrl,
  };
}

/**
 * 単一バッジのデータを取得する
 */
export async function fetchBadgeData(badgeUrl, note) {
  const assertionId = extractAssertionId(badgeUrl);

  // 1. Host API
  try {
    const result = await tryHostApi(assertionId, badgeUrl, note);
    if (result?.badgeInfo) return result.badgeInfo;

    // 2. Alt API (Host が badge 情報を返さなかった場合)
    if (!result?.issuedOn) {
      const altResult = await tryAltApi(assertionId, badgeUrl, note);
      if (altResult?.badgeInfo) return altResult.badgeInfo;
    }
  } catch {
    // API failure — fall through to HTML
  }

  // 3. HTML meta tag fallback
  try {
    return await tryHtmlFallback(assertionId, badgeUrl, note, null);
  } catch {
    // Final fallback
    return {
      name: note,
      description: "",
      image: `${API_BASE}/Assertion/${assertionId}/Image`,
      issuedOn: null,
      url: badgeUrl,
    };
  }
}

/**
 * badge-urls.json の配列を受け取り、完全なバッジデータ配列を返す
 * @param {Array<{url: string, note: string}>} badgeUrls
 * @returns {Promise<Array>}
 */
export async function fetchAllBadges(badgeUrls) {
  const results = [];

  for (const { url, note } of badgeUrls) {
    const data = await fetchBadgeData(url, note);
    results.push(data);
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }

  return results;
}
