# Fukuzushi Website

お寿司屋さんの概要を表示するレスポンシブなWebサイトです。

## 機能

- レスポンシブデザイン
- 画像を主に表示するシンプルなサイト構成
- Instagramアカウントへのリンク
- モダンなUI/UX

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start

# 本番用ビルド
npm run build
```

## デプロイ

このプロジェクトはNetlifyでデプロイすることを想定しています。

1. GitHubリポジトリにプッシュ
2. Netlifyでリポジトリを接続
3. ビルドコマンド: `npm run build`
4. 公開ディレクトリ: `build`


# 福寿司 静的サイト（Netlify用）

## 構成
- `index.html` : 1ページ構成。全セクション（Header, Hero, Instagram, 店舗情報, Map, Footer）を含む。
- `assets/` : 画像素材（slider1.webp, slider2.webp, slider3.webp, footer1.webp, footer2.webp など）。JPEGも可。
- `scripts/slider.js` : ヒーロー画像の自動スライド・フェード・スワイプ対応。
- `sitemap.xml` : サイトマップ（トップページのみ）。
- `robots.txt` : 検索エンジン用。

## Netlifyデプロイ手順
1. このフォルダ一式をZIP化
2. Netlify管理画面で「Add new site」→「Deploy manually」→ ZIPをドラッグ＆ドロップ
3. 公開URLが発行されます

## Instagramウィジェット設定
- SnapWidget（https://snapwidget.com/）で「Instagram Grid」ウィジェットを作成
- 生成されたiframeコードを `index.html` のInstagramセクションに貼り付け
- 例: `<iframe src="https://snapwidget.com/embed/1107122" ...></iframe>`
- 他にも LightWidget, Indify など利用可能

## 英語ページの作り方
- `index.html` を複製し、`lang="en"`・テキスト・OGP・構造化データを英語化
- Netlifyのサブディレクトリ（例: `/en/`）に配置

## 画像・テキスト編集方法
- 画像: `assets/` フォルダにWebP/JPEGを追加し、`index.html` の `<img src="...">` を編集
- テキスト: `index.html` 内のコメント `<!-- 編集: ... -->` 箇所を直接編集
- Instagram: iframeの `src` をSnapWidget等で再生成して差し替え

## sitemap.xml サンプル
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fukuzushi.netlify.app/</loc>
    <lastmod>2025-09-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## robots.txt サンプル
```
User-agent: *
Allow: /
Sitemap: https://fukuzushi.netlify.app/sitemap.xml
```


