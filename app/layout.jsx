import "@/styles/variables.css";
import "@/styles/base.css";
import Providers from "./providers";

export const metadata = {
  title: "小寺奏怜 (Kanare Kodera) Portfolio",
  description:
    "小寺奏怜 (Kanare Kodera) のポートフォリオサイト。経歴・スキルをご紹介します。",
  keywords: "小寺奏怜, Kanare Kodera, ポートフォリオ, AWS, エンジニア, 経歴, Skills",
  openGraph: {
    title: "小寺奏怜 (Kanare Kodera) Portfolio",
    description: "小寺奏怜 / Kanare Kodera の公式ポートフォリオと経歴",
    type: "website",
    url: "https://kanare.dev",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Person",
              name: "小寺奏怜",
              alternateName: "Kanare Kodera",
              url: "https://kanare.dev",
            }),
          }}
        />
      </head>
      <body>
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
