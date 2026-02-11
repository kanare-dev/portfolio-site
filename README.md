# Canale's portfolio-site

![CI](https://github.com/kanare-dev/portfolio-site/actions/workflows/ci.yml/badge.svg)
![Vercel](https://vercelbadge.vercel.app/api/Canale0107/portfolio-site)

## 📁 ディレクトリ構成（概要）

```
.
├── public/                          # ブラウザが直接参照する静的ファイル（favicon など）
│   └── favicons/                    # 各種アイコン
├── src/                             # 開発用ソースコード
│   ├── assets/                      # 画像などの静的アセット（import で利用されビルド時にハッシュ付き出力）
│   ├── components/                  # 各セクションの React コンポーネントと CSS Modules
│   │   ├── Profile/                 # プロフィール（写真・名前・基本情報）
│   │   ├── Overview/                # パーパス・価値観・自己紹介など
│   │   ├── Career/                  # 経歴タイムライン
│   │   ├── Skills/                  # スキル・資格（プログレスバー付き）
│   │   ├── Research/                # 研究・開発経験
│   │   └── Interests/               # 趣味・関心・名言など
│   ├── constants/                   # 定数の定義（セクションID・ナビゲーションリンクなど）
│   │   └── navigation.js            # ナビゲーション項目とセクションIDを一元管理
│   ├── contexts/                    # グローバル状態管理用の Context
│   │   ├── ThemeContext.jsx         # テーマ状態の共有（ダーク/ライトモード切替）
│   │   └── SectionContext.jsx       # セクション切り替え状態の管理
│   ├── data/                        # スキル・資格・名言など構造化データ（JSON）
│   │   ├── badge-urls.json          # OpenBadge バッジURL（手動編集）
│   │   ├── badges.json              # OpenBadge バッジ完全データ（自動生成）
│   │   ├── career.json              # 経歴データ
│   │   ├── certifications.json      # 資格データ
│   │   ├── influences.json          # 影響を受けた人物・作品
│   │   ├── quotes.json              # 名言・引用
│   │   ├── researches.json          # 研究・開発経験
│   │   ├── skills.json              # スキルデータ
│   │   └── values.json              # 価値観データ
│   ├── hooks/                       # カスタムフック
│   │   ├── useMediaQuery.js         # メディアクエリ判定
│   │   └── useSectionObserver.js    # セクション監視（Intersection Observer）
│   ├── styles/                      # グローバル CSS（変数定義や基本リセット）
│   ├── App.jsx                      # 全体レイアウトとセクション構成
│   └── main.jsx                     # Vite によるエントリーポイント
├── scripts/                         # 自動化スクリプト
│   └── fetch-badge-data.js          # バッジデータ取得スクリプト
├── index.html                       # React アプリの HTML エントリーポイント
├── dist/                            # 本番ビルド成果物（Vite により自動生成）
├── package.json                     # npm パッケージ定義
└── vite.config.js                   # Vite の設定（エイリアスなど）
```

## ⚙️ 技術スタック & サイト構成

このポートフォリオサイトは「見やすさ・管理しやすさ・拡張性」を意識して構築しています。

### 🖥️ UI・スタイリング

- **React**
  - 各セクションごとにコンポーネント分割。
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

- **Vite**
  - 高速な開発サーバー & 本番ビルド
- **エイリアス機能**
  - `vite.config.js`で`@/` → `src/`に割当、パス記述がシンプル！

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

- `localhost:5173` にて確認可能
- `main.jsx` により `App.jsx` が `#root` にマウントされる

### 本番ビルド

```bash
npm run build
```

- `dist/` 以下にハッシュ付きファイルが出力される
- Vercel や Netlify 等にデプロイ可能

### ビルド結果のプレビュー

```bash
npm run preview
```

- ビルド後の成果物をローカルで確認可能
- 本番環境に近い状態で動作確認ができる

### デプロイ

- このリポジトリは Vercel と連携しており、`main` ブランチに `git push` すると自動でデプロイされます
- デプロイが完了すると、公開サイト（[https://kanare.dev](https://kanare.dev)）に変更が反映されます

## 🧾 使用パッケージ

| パッケージ             | 用途                                             |
| ---------------------- | ------------------------------------------------ |
| `react`                | UI 開発                                          |
| `react-dom`            | React DOM レンダリング                           |
| `vite`                 | 開発・ビルド                                     |
| `@vitejs/plugin-react` | Vite で React を使うためのプラグイン             |
| `classnames`           | 複数クラス名の動的結合に使用（CSS Modules 向け） |
| `react-icons`          | アイコンの使用                                   |
| `framer-motion`        | アニメーション・トランジション                   |

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
       { "name": "新規資格", "date": "2025.11" } // ← 追加
     ]
   }
   ```

4. **注意事項**：
   - JSON の構文エラーに注意（カンマの位置、引用符など）
   - 日付は新しい順に並べることを推奨（表示順は実装によって異なる場合あり）
   - 変更後、開発サーバーが自動でリロードされ、変更が反映されます

### バッジデータの更新方法

新しいバッジを追加する場合は、以下の手順に従ってください：

#### 方法1: GitHub経由で追加（推奨）

1. **badge-urls.json にバッジURLを追加**

   [`src/data/badge-urls.json`](https://github.com/kanare-dev/portfolio-site/blob/main/src/data/badge-urls.json) を開き、ファイル末尾（最後の `]` の前）に新しいバッジのURLを追加します。

   - 形式：`{ "url": "バッジの共有URL", "note": "バッジ名" }`
   - `url` は **OpenBadge v2** の共有 URL を指定（例：`https://www.openbadge-global.com/api/v1.0/openBadge/v2/Wallet/Public/GetAssertionShare/...`）
   - `note` はバッジ名（任意、フォールバック表示用）

   **例**：

   ```json
   [
     {
       "url": "https://www.openbadge-global.com/api/v1.0/openBadge/v2/Wallet/Public/GetAssertionShare/既存のID",
       "note": "既存のバッジ"
     },
     {
       "url": "https://www.openbadge-global.com/api/v1.0/openBadge/v2/Wallet/Public/GetAssertionShare/新しいID",
       "note": "新規バッジ"
     }
   ]
   ```

2. **コミット・プッシュ**

   変更をコミットして `main` ブランチにプッシュすると、GitHub Actions が自動的に：
   - バッジの詳細情報（名前、説明、画像、発行日）を API から取得
   - `src/data/badges.json` を更新
   - 変更を自動コミット

3. **確認**

   GitHub Actions が完了したら、サイトに新しいバッジが表示されます。

#### 方法2: ローカルで追加

1. **badge-urls.json にバッジURLを追加**（方法1と同じ）

2. **スクリプトを実行**

   ```bash
   node scripts/fetch-badge-data.js
   ```

   このスクリプトは：
   - `src/data/badge-urls.json` から URL を読み込み
   - API 経由でバッジ情報を取得
   - `src/data/badges.json` を自動更新

3. **動作確認**

   ```bash
   npm run dev
   ```

4. **コミット・プッシュ**

   両方のファイル（`badge-urls.json` と `badges.json`）をコミットしてプッシュ

#### ファイルの役割

- **`src/data/badge-urls.json`**: 手動で編集するファイル（URLとnoteのみ）
- **`src/data/badges.json`**: 自動生成されるファイル（完全なバッジデータ）

#### 注意事項

- JSON の構文エラーに注意（カンマの位置、引用符など）
- `url` は **OpenBadge v2** の正しい共有 URL である必要があります
- `badges.json` は自動生成されるため、直接編集しないでください

## 📌 補足事項

- `index.html` はプロジェクト直下に配置（Vite の公式推奨）。`public/` ではなくルートに置く。
- テーマ状態は `localStorage` に保存され、ブラウザ再読み込み後も保持される。
- 各セクションは URL ハッシュ（`#section-id`）で管理され、ブラウザの戻る/進むボタンに対応。

## 公開サイト

🔗 https://kanare.dev
