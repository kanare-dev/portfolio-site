# Canale's portfolio-site

![CI](https://github.com/kanare-dev/portfolio-site/actions/workflows/ci.yml/badge.svg)
![Vercel](https://vercelbadge.vercel.app/api/Canale0107/portfolio-site)

## 📁 ディレクトリ構成（概要）

```
.
├── app/                             # Next.js App Router
│   ├── api/badges/route.js          # バッジデータ取得 API Route
│   ├── layout.jsx                   # ルートレイアウト（メタデータ・HTML構造）
│   ├── page.jsx                     # メインページ
│   ├── providers.jsx                # クライアント側 Provider（テーマ・セクション）
│   └── sitemap.js                   # sitemap.xml 自動生成
├── public/                          # 静的ファイル（ファビコンなど）
├── src/                             # 開発用ソースコード
│   ├── assets/                      # 画像などの静的アセット（import で利用）
│   ├── components/                  # 各セクションの React コンポーネントと CSS Modules
│   │   ├── Career/                  # 経歴タイムライン
│   │   ├── Footer/                  # フッター
│   │   ├── Icon/                    # カスタム SVG アイコン
│   │   ├── Interests/               # 趣味・関心・名言など
│   │   ├── Navbar/                  # ナビゲーションバー
│   │   ├── Overview/                # パーパス・価値観・自己紹介など
│   │   ├── Profile/                 # プロフィール（写真・名前・基本情報）
│   │   ├── Projects/                # プロジェクト一覧
│   │   ├── Research/                # 研究・開発経験
│   │   └── Skills/                  # スキル・資格（プログレスバー付き）
│   ├── constants/                   # 定数の定義（ナビゲーション項目など）
│   ├── contexts/                    # グローバル状態管理用の Context
│   │   ├── ThemeContext.jsx         # テーマ状態の共有（ダーク/ライトモード切替）
│   │   └── SectionContext.jsx       # セクション切り替え状態の管理
│   ├── data/                        # スキル・資格・名言など構造化データ（JSON）
│   │   ├── badge-urls.json          # OpenBadge バッジURL（手動編集）
│   │   ├── career.json              # 経歴データ
│   │   ├── certifications.json      # 資格データ
│   │   ├── influences.json          # 影響を受けた人物・作品
│   │   ├── projects.json            # プロジェクトデータ
│   │   ├── quotes.json              # 名言・引用
│   │   ├── researches.json          # 研究・開発経験
│   │   ├── skills.json              # スキルデータ
│   │   └── values.json              # 価値観データ
│   ├── hooks/                       # カスタムフック
│   │   ├── useMediaQuery.js         # メディアクエリ判定
│   │   └── useSectionObserver.js    # セクション監視（Intersection Observer）
│   ├── lib/                         # サーバーサイド共通ロジック
│   │   └── badge-fetcher.js         # OpenBadge API フェッチロジック
│   └── styles/                      # グローバル CSS（変数定義・ベーススタイル）
├── scripts/                         # 自動化スクリプト
├── jsconfig.json                    # パスエイリアス設定（@/ → src/）
├── next.config.mjs                  # Next.js 設定
└── package.json                     # npm パッケージ定義
```

## ⚙️ 技術スタック & サイト構成

このポートフォリオサイトは「見やすさ・管理しやすさ・拡張性」を意識して構築しています。

### 🖥️ UI・スタイリング

- **React + Next.js (App Router)**
  - 各セクションごとにコンポーネント分割。
  - Server Component でメタデータ・HTML を静的生成し、SEO に対応。
- **CSS Modules**
  - `.module.css`を用い、各コンポーネント単位でスタイルをスコープ。
- **グローバル CSS**
  - 共通変数は`variables.css`、ベース・リセットは`base.css`で定義。

### 🗂️ データ管理

- **構造化データ**
  - 経歴・資格・スキル等は `src/data/` の JSON で管理し、必要に応じて import。
- **Context API（グローバル状態管理）**
  - `ThemeContext`でダーク/ライトテーマ
  - `SectionContext`で現在表示中のセクションを一元管理

### ⚡️ 開発・ビルド

- **Next.js 15**
  - SSG（静的生成）による高速表示 & 本番ビルド
  - `sitemap.xml` / `robots.txt` を自動配信
- **パスエイリアス**
  - `jsconfig.json`で`@/` → `src/`に割当、パス記述がシンプル！

### 💡 主な特徴

- 各セクション＆各 CSS はディレクトリ単位で整理
- URL ハッシュ（例: `#career-timeline`）に応じて対応セクションを表示
- ナビクリックや`history.replaceState()`で履歴も連動
- `hashchange`イベント検知で、ブラウザ戻る/進むにシームレス対応
- コードやスタイルは「読みやすく/カスタマイズしやすく」整理

## 🚀 セットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

- `localhost:3000` にて確認可能

### 本番ビルド

```bash
npm run build
```

### 本番サーバーの起動

```bash
npm start
```

### デプロイ

- このリポジトリは Vercel と連携しており、`main` ブランチに `git push` すると自動でデプロイされます
- デプロイが完了すると、公開サイト（[https://kanare.dev](https://kanare.dev)）に変更が反映されます

## 🧾 使用パッケージ

| パッケージ      | 用途                                             |
| --------------- | ------------------------------------------------ |
| `next`          | フレームワーク（SSG・App Router・API Routes）    |
| `react`         | UI 開発                                          |
| `react-dom`     | React DOM レンダリング                           |
| `classnames`    | 複数クラス名の動的結合に使用（CSS Modules 向け） |
| `react-icons`   | アイコンの使用                                   |
| `framer-motion` | アニメーション・トランジション                   |

## 📝 資格・バッジ取得時の対応方法

### 資格データの更新方法

新しい資格を追加する場合は、[`src/data/certifications.json`](https://github.com/kanare-dev/portfolio-site/blob/main/src/data/certifications.json) を編集します。

1. **既存のカテゴリに追加する場合**：

   - 該当カテゴリの `items` 配列に新しいオブジェクトを追加
   - 形式：`{ "name": "資格名", "date": "YYYY.MM" }`
   - 日付は取得年月を `YYYY.MM` 形式で記入（例：`"2024.07"`）

2. **新しいカテゴリを追加する場合**：

   - ファイル末尾（最後の `]` の前）に新しいオブジェクトを追加
   - 形式：
     ```json
     {
       "category": "カテゴリ名",
       "items": [{ "name": "資格名", "date": "YYYY.MM" }]
     }
     ```

3. **例**（既存カテゴリに追加）：

   ```json
   {
     "category": "AWS",
     "items": [
       { "name": "CLF-C02", "date": "2025.09" },
       { "name": "SAA-C03", "date": "2025.11" },
       { "name": "新規資格", "date": "2025.11" }
     ]
   }
   ```

4. **注意事項**：
   - JSON の構文エラーに注意（カンマの位置、引用符など）
   - 日付は新しい順に並べることを推奨（表示順は実装によって異なる場合あり）
   - 変更後、開発サーバーが自動でリロードされ、変更が反映されます

### バッジデータの更新方法

新しいバッジを追加する場合は、以下の手順で行います。

1. [`src/data/badge-urls.json`](https://github.com/kanare-dev/portfolio-site/blob/main/src/data/badge-urls.json) にバッジURLを追加

   - 形式：`{ "url": "バッジの共有URL", "note": "バッジ名" }`
   - `url` は **OpenBadge v2** の共有 URL を指定
   - `note` はバッジ名（任意、フォールバック表示用）

2. スクリプトを実行して `src/data/badges.json` を生成

   ```bash
   node scripts/fetch-badges.js
   ```

3. 生成されたファイルをコミット・プッシュ

   ```bash
   git add src/data/badges.json src/data/badge-urls.json
   git commit -m "chore: update badge data"
   git push
   ```

#### ファイルの役割

- **`src/data/badge-urls.json`**: 手動で編集するファイル（URLとnoteのみ）
- **`src/data/badges.json`**: スクリプトで生成されるファイル（完全なバッジデータ）。git管理対象

#### 注意事項

- JSON の構文エラーに注意（カンマの位置、引用符など）
- `url` は **OpenBadge v2** の正しい共有 URL である必要があります
- `badges.json` は自動生成されるため、直接編集しないでください

## 📌 補足事項

- テーマ状態は `localStorage` に保存され、ブラウザ再読み込み後も保持される。
- 各セクションは URL ハッシュ（`#section-id`）で管理され、ブラウザの戻る/進むボタンに対応。

## 公開サイト

🔗 [https://kanare.dev](https://kanare.dev)
