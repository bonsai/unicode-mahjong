# 🀄 絵文字麻雀 (Emoji Mahjong)

TypeScript で作成した、CLI（ターミナル）と Web ブラウザの両方で動作する麻雀ゲームです。

## 特徴

- 🀇🀈🀉 **完全日本語対応**: 萬子・筒子・索子・字牌の絵文字を使用
- 🌐 **ユニバーサル**: 同じコードベースでターミナルと Web の両方で動作
- 🎮 **シンプル実装**: 配牌、ツモ、打牌までを実装
- 📄 **GitHub Pages 対応**: 簡単にデプロイして公開可能

## インストール

このプロジェクトはモノレポ構成の一部です (`../` がプロジェクトルート)。

```bash
# 依存関係のインストール
npm install
```

## 遊び方

### CLI 版（ターミナル）

```bash
# TypeScript をコンパイル
npx tsc

# CLI で実行
node dist/index.js
```

ゲームが始まると手牌が表示されます。「捨てる牌の番号」を入力して Enter キーを押すと、その牌が捨てられ、自動的に次の牌をツモります。

### Web 版

```bash
# TypeScript をコンパイル
npx tsc

# ローカルサーバーを起動（任意）
npx http-server -p 8080
```

`index.html` をブラウザで開いてください。手牌の牌をクリックすると、その牌を捨てて次に進みます。

## 牌の種類

| 種類 | 絵文字 | 名称 |
|------|--------|------|
| 萬子 | 🀇🀈🀉🀊🀋🀌🀍🀎🀏 | 一萬 ～ 九萬 |
| 筒子 | 🀙🀚🀛🀜🀝🀞🀟🀠🀡 | 一筒 ～ 九筒 |
| 索子 | 🀐🀑🀒🀓🀔🀕🀖🀗🀘 | 一索 ～ 九索 |
| 字牌 | 🀀🀁🀂🀃 | 東・南・西・北 |
| 字牌 | 🀆🀅🀄 | 白・發・中 |

## プロジェクト構成

```
unicode-mahjong/
├── src/
│   └── index.ts          # メインの TypeScript コード
├── dist/
│   └── index.js          # コンパイル済み JavaScript
├── index.html            # Web 用の HTML ファイル
├── package.json
├── tsconfig.json
└── README.md
```

## GitHub Pages へのデプロイ

> **重要**: このプロジェクトは `qwen/` サブルートに配置されています。GitHub Pages の設定は以下を参照してください。

### オプション 1: GitHub Actions を使う（推奨・自動デプロイ）

`.github/workflows/deploy.yml` が既に設定されています。main ブランチにプッシュすると自動でデプロイされます。

設定ファイル：[.github/workflows/deploy.yml](./.github/workflows/deploy.yml)

### オプション 2: 手動設定

1. **TypeScript をコンパイル**:
   ```bash
   npm run build
   ```

2. **GitHub リポジトリにプッシュ**:
   ```bash
   git add .
   git commit -m "Add qwen mahjong"
   git push origin main
   ```

3. **GitHub Pages を設定**:
   - GitHub リポジトリの **Settings** > **Pages** へ移動
   - **Source** を "Deploy from a branch" に設定
   - **Branch** を `main`、**Folder** を `/qwen` に設定
   - **Save** をクリック

4. **公開 URL**:
   - 数分後、`https://<username>.github.io/<repository>/qwen/` でゲームがプレイ可能になります

## 開発

### ビルド

```bash
npx tsc
```

### 監視モード（開発用）

```bash
npx tsc --watch
```

## 技術スタック

- **言語**: TypeScript
- **ランタイム**: Node.js (CLI), ブラウザ (Web)
- **絵文字**: Unicode 麻将牌 (U+1F000 ～ U+1F02F)

## 制限事項

- 簡易版のため、アガリ判定は実装されていません（役の判定など）
- 一人打ちの練習モードのみ対応
- 鳴き（ポン・チー・カン）には対応していません

## ライセンス

ISC

## 貢献

Issue や Pull Request をお待ちしております！
