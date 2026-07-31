/**
 * Credly Public Badge API からバッジデータを取得するモジュール
 *
 * Vite plugin および CLI スクリプトの両方から利用される。
 */

const API_BASE = "https://www.credly.com/api/v1/public_badges";

function extractBadgeId(url) {
  const match = url.match(/\/badges\/([0-9a-f-]{36})/i);
  if (!match) throw new Error(`Invalid Credly badge URL format: ${url}`);
  return match[1];
}

/**
 * 単一バッジのデータを取得する
 * @param {string} badgeUrl - Credly バッジの公開URL (例: https://www.credly.com/badges/{id}/public_url)
 * @param {string} note - API 取得失敗時のフォールバック名
 */
export async function fetchCredlyBadge(badgeUrl, note) {
  const badgeId = extractBadgeId(badgeUrl);
  const res = await fetch(`${API_BASE}/${badgeId}`);
  if (!res.ok) throw new Error(`Failed to fetch Credly badge: ${res.status}`);

  const { data } = await res.json();
  const template = data.badge_template;

  return {
    name: template?.name || note,
    description: template?.description || "",
    image: template?.image_url,
    issuedOn: data.issued_at_date,
    url: badgeUrl,
  };
}
