# 💞 第 33 回 茨香祭

![第33回茨香祭のロゴ](https://raw.githubusercontent.com/shikosai33/shikosai33-web/main/.github/shikosai33.png)

2024 年 10 月 26 日 ~ 27 日に茨城工業高等専門学校で開催される、第 33 回 茨香祭の公式ウェブサイトです。

## 技術スタック

- **Bun** 🥟 依存関係の管理とユニットテストの実行
- **Astro** 🚀 静的サイト生成用
- **Tailwind CSS** 💨 トークンを用いたデザインシステムの構築
- ~~**Storybook** 📕 アクセシビリティやインタラクションテストの実行と見た目の確認~~
- **Playwright** 🎭 E2E テストの実行
- **Biome** 🌊 リンター・フォーマッター

## 環境構築の手順

### 実行環境の作成

コマンドラインから、[prototools](https://moonrepo.dev/docs/proto/install) `proto`が利用可能である必要があります。以下のいずれかの方法で環境を作成してください。

- Windows Subsystem for Linux (WSL) もしくは MacOS のローカル環境に、 `proto` をインストールする
- Docker Desktop もしくは Orbstack を利用して、 自身のコンピュータ上に設定済み開発用コンテナを立ち上げる
- GitHub Codespaces を用いて、クラウド上で設定済み開発用コンテナを立ち上げる

### 依存関係のインストール

[Bun](https://bun.sh/) `bun` のバージョン管理に [prototools](https://moonrepo.dev/docs/proto/install) `proto` を使用しています。まずは、以下のコマンドを実行するか、`.prototools`に記述されているバージョンのものを手動でインストールしてください。

```sh
proto use
bun i
bun lefthook install # コミット時チェックのGitフック管理ツールのインストール (初回のみ)
bun playwright install --with-deps # StorybookのインタラクションテストのCLI実行 & E2Eテストの実行に必要
```

#### 各種タスクの実行

開発中によく実行するタスクは、スクリプトとして`package.json`に定義されています。例を以下に示します。

```sh
bun dev # Astroの開発サーバーを起動
bun run build # Astroのビルド
bun preview # Astroのビルド結果を起動

bun check # リントとフォーマットの実行
bun check:fix # リントとフォーマットの自動修正可能なエラーを修正
bun check:astro # Astroが提供するリント

bun test # ユニットテストの実行
bun test:e2e # E2Eテストの実行
```
