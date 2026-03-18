# Unicode Mahjong Monorepo

絵文字麻雀 (Emoji Mahjong) のモノレポポジトリ

## 構成

```
unicode-mahjong/
├── kimi/       - Kimi 版
├── deepseek/   - DeepSeek 版
├── qwen/       - Qwen 版 (TypeScript CLI & Web)
└── prompt.txt  - 共通プロンプト
```

## 各バージョンの説明

### qwen/
TypeScript で作成したユニバーサル麻雀ゲーム
- **CLI**: ターミナルで動作
- **Web**: ブラウザで動作
- **GitHub Pages**: 自動デプロイ対応

[qwen/README.md](./qwen/README.md) を参照

### kimi/
Kimi による実装バージョン

### deepseek/
DeepSeek による実装バージョン

## 使い方 (qwen 版)

```bash
cd qwen
npm install
npm run build
npm start        # CLI 版
npm run serve    # Web 版 (http://localhost:8080)
```

## GitHub Pages デプロイ (qwen 版)

qwen フォルダをデプロイします：

```bash
cd qwen
npm run build
# GitHub Actions が自動デプロイ
```

または、GitHub Pages の設定で **Source folder** を `/qwen` に設定してください。
