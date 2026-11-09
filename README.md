# Agenote Web

**Agenote 的黑客松展示站，介绍 AI Voice 录音卡与 AI 会议助手。**

在浏览器里走完一场模拟会议，从准备议题、查看逐字稿，到整理纪要、跟进行动项和在微信界面里追问。会议演示使用本地样例数据，转写、术语解释和微信问答都由前端模拟。

[本地运行](#本地运行) · [表单接入](#表单接入) · [构建与部署](#构建与部署)

## 可以体验什么

- **会前到会后**　从首页的「交互体验 · 模拟一场会」开始，依次体验录音卡按键、逐字稿中的术语解释、待办状态切换和微信追问。
- **产品展示**　设备页介绍录音卡的使用流程，功能页展示 Agenote App 的界面与会议管理场景，FAQ 汇总常见问题。
- **联系与试用**　网站包含联系表单和体验申请表单。真实提交依赖对应的外部服务。

## 本地运行

使用 Node.js 22.12+（或 Node.js 20.19+ 的 20.x 版本）和 npm。在仓库根目录运行以下命令。

```bash
npm ci
npm run dev
```

打开 [首页交互演示](http://localhost:3000/#interactive)，滚动到各阶段即可操作。浏览演示可以跳过表单配置，开发者控制台会提示 Supabase 环境变量缺失。产品图片、字体和图标使用外部地址，完整显示需要能访问对应服务。

## 表单接入

### 体验申请 `/apply`

在仓库根目录创建 `.env.local`，填入自己有权使用的 Supabase 项目信息，随后重启开发服务器。生产构建也需要在构建时注入这两个变量。

```dotenv
VITE_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
VITE_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

`VITE_PUBLIC_SUPABASE_ANON_KEY` 接受前端可公开的 publishable key 或旧版 anon key。Vite 会把这些值打包到浏览器代码里，`service_role`、secret key 和 Webhook 地址应留在服务端。

申请表写入 `trial_applications`，字段为 `name`、`email`、`phone`、`company`、`team_size`、`preferred_time` 和 `scenario`。仓库尚无建表和行级安全策略迁移。开放表单前，需要在自己的 Supabase 项目建表、启用 RLS，并验证匿名访问只具备所需的插入权限。

申请入库后，前端调用 [`notify-feishu-trial-application`](supabase/functions/notify-feishu-trial-application/index.ts) 发送飞书通知。启用通知时需单独部署 Edge Function，并把 `FEISHU_BOT_WEBHOOK_URL` 配置为服务端 Secret。开放入口前应为通知增加服务端校验和限流。通知失败时，已入库的申请仍显示提交成功。

### 联系表单 `/contact`

联系表单提交到 [`ContactForm.tsx`](src/pages/contact/components/ContactForm.tsx) 中指定的 Readdy 表单地址。启用真实提交前，需要确认该地址的接收方和数据处理方式，或换成自己的接收端。

## 构建与部署

```bash
npm run lint
npm run type-check
npm run build
npm run preview
```

生产文件输出到 `out/`。默认以 `/` 为站点根路径。GitHub Pages 项目站点通常位于 `/<仓库名>/`，需要在构建环境设置 `BASE_PATH=/<仓库名>/`，再通过 GitHub Actions 发布 `out/`。

当前使用 `BrowserRouter`。在 GitHub Pages 上，直接打开或刷新 `/<仓库名>/features` 这样的子页会请求一个静态文件路径。部署前需要选择 Hash 路由或补上 Pages 的 SPA 回退方案，再验证子页能直接访问和刷新。配置说明见 [Vite 的 GitHub Pages 部署指南](https://vite.dev/guide/static-deploy.html#github-pages) 和 [GitHub Pages 的自定义 404 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)。

## 项目结构

- [`src/pages/`](src/pages/)　首页、设备介绍、功能展示、FAQ、联系和体验申请。
- [`src/pages/home/components/live-demo/`](src/pages/home/components/live-demo/)　首页的四阶段交互演示。
- [`src/mocks/`](src/mocks/)　会议样例、任务、承诺和展示素材地址。
- [`supabase/functions/`](supabase/functions/)　体验申请的飞书通知函数。

前端使用 React 19、TypeScript、Vite、Tailwind CSS 和 React Router。
