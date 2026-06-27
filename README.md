# Craftorithm Docs

Craftorithm 插件文档站点，基于 VitePress 构建。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址即可预览。

## 构建

```bash
npm run build
```

## 部署

推送到 GitHub 后，GitHub Actions 会自动构建并部署到 GitHub Pages。

### 前置条件

在 GitHub 仓库 Settings → Pages 中，Source 选择 **GitHub Actions**。

## 目录结构

```
├── index.md              # 中文首页
├── guide/                # 入门指南
├── recipe/               # 配方系统
├── trigger/              # 触发器系统
├── script/               # 脚本引擎
├── item/                 # 物品系统
├── config/               # 配置文件
├── ui/                   # UI 系统
├── api/                  # 开发者文档
├── en/                   # 英文版本
└── .vitepress/           # VitePress 配置
```
