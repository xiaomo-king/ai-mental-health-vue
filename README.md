## 📋 项目简介

AI 心理健康助手是一个面向大众用户的**心理健康服务平台**，集成 AI 心理咨询、情绪追踪、心理健康知识科普三大核心服务。

部分截图：

| 页面 | 截图 |
|------|------|
| 🏠 前台首页 | ![](./assets/屏幕截图%202026-07-12%20230401-1783868819104.png) |
| 🤖 AI 咨询对话 | ![](./assets/屏幕截图%202026-07-12%20230636.png) |
| 📔 情绪日记 | ![](./assets/屏幕截图%202026-07-12%20230610.png) |
| 📊 后台数据看板 | ![](./assets/屏幕截图%202026-07-12%20230643.png) |
| 📝 知识管理 | ![](./assets/屏幕截图%202026-07-12%20230555.png) |

- **前台（用户端）**：提供 AI 心理对话（SSE 流式输出）、情绪日记记录、心理健康知识库阅读等功能
- **后台（管理端）**：提供 ECharts 数据可视化看板、知识文章管理（富文本编辑/封面上传）、咨询记录与情绪日志查看等功能

---

## ✨ 核心功能

### 前台（用户端）

| 功能 | 说明 |
|------|------|
| 🏠 **首页** | 品牌展示，引导用户开始倾诉或记录心情 |
| 🤖 **AI 心理咨询** | SSE 流式对话，支持会话管理（新建/切换/删除）、打字动画、Markdown 渲染、情绪分析联动 |
| 📔 **情绪日记** | 记录每日情绪评分（1-10）、主要情绪（8种）、触发因素、睡眠质量和压力水平 |
| 📚 **心理健康知识库** | 文章分类展示、推荐阅读（按阅读量排序）、文章详情 |
| 🔐 **登录 / 注册** | 用户名密码登录，根据角色自动跳转 |

### 后台（管理端）

| 功能 | 说明 |
|------|------|
| 📊 **数据看板** | 4 个统计卡片 + ECharts 可视化（双 Y 轴折线图、柱状图、面积图） |
| 📝 **知识管理** | 文章 CRUD、分类管理、封面上传、富文本编辑、发布/下线/删除 |
| 💬 **咨询记录** | 查看用户会话列表、对话消息详情 |
| 📋 **情绪日志** | 查看用户情绪日记、AI 情绪分析结果（专业建议、风险等级、改善建议） |

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Vue 3](https://vuejs.org/) | ^3.5.30 | 前端框架（Composition API + `<script setup>`） |
| [Vite](https://vitejs.dev/) | ^8.0.0 | 构建工具 |
| [Vue Router](https://router.vuejs.org/) | ^4.6.4 | 路由管理（History 模式 + 懒加载 + 导航守卫） |
| [Pinia](https://pinia.vuejs.org/) | ^3.0.4 | 状态管理 |
| [Element Plus](https://element-plus.org/) | ^2.13.5 | UI 组件库 |
| [Axios](https://axios-http.com/) | ^1.13.6 | HTTP 请求（二次封装） |
| [ECharts](https://echarts.apache.org/) | ^6.0.0 | 数据可视化 |
| [WangEditor](https://www.wangeditor.com/) | ^5.1.23 | 富文本编辑器 |
| [@microsoft/fetch-event-source](https://www.npmjs.com/package/@microsoft/fetch-event-source) | ^2.0.1 | SSE 流式对话 |
| [Sass](https://sass-lang.com/) | ^1.97.2 | CSS 预处理器 |
| [dayjs](https://day.js.org/) | ^1.11.21 | 日期格式化 |

---

## 📁 项目结构

```
src/
├── api/                      # API 接口层
│   ├── admin.js              # 后台接口（15 个）
│   └── frontend.js           # 前台接口（8 个）
├── assets/images/            # 静态资源（14 张图片）
├── components/               # 组件
│   ├── FrontendLayout.vue    # 前台布局
│   ├── BackendLayout.vue     # 后台布局
│   ├── AuthLayout.vue        # 认证布局
│   ├── Navbar.vue            # 后台导航栏
│   ├── Sidebar.vue           # 后台侧边栏
│   ├── PageHead.vue          # 页面头部
│   ├── TableSearch.vue       # 通用搜索表单
│   ├── ArticleDialog.vue     # 文章编辑弹窗
│   ├── RichTextEditor.vue    # 富文本编辑器
│   └── MarkdownRenderer.vue  # Markdown 渲染
├── config/index.js           # 配置文件
├── router/index.js           # 路由配置
├── stores/admin.js           # Pinia 状态管理
├── utils/request.js          # Axios 二次封装
├── views/                    # 页面（11 个）
│   ├── home.vue              # 前台首页
│   ├── login.vue             # 登录
│   ├── register.vue          # 注册
│   ├── consultation.vue      # AI 心理咨询
│   ├── emotionDiary.vue      # 情绪日记
│   ├── frontendKnowledge.vue # 知识库（前台）
│   ├── articleDetail.vue     # 文章详情
│   ├── Dashboard.vue         # 数据看板
│   ├── knowledge.vue         # 知识管理（后台）
│   ├── consultations.vue     # 咨询记录
│   └── emotional.vue         # 情绪日志
├── App.vue
├── main.js
└── style.css
```

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm（推荐）或 npm

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:5173`

### 构建生产版本

```bash
pnpm build
```

产物输出到 `dist/` 目录

---

## ⚙️ 环境配置

项目通过 Vite 代理将 `/api` 请求转发到后端服务：

```js
// vite.config.js
server: {
    proxy: {
        '/api': {
            target: 'http://159.75.169.224:1235',
            changeOrigin: true
        }
    }
}
```

### 测试账户

| 角色 | 说明 |
|------|------|
| 管理员 | 登录后自动跳转 `/back/dashboard` |
| 普通用户 | 登录后跳转前台首页 `/` |

---

## 🌟 项目亮点

1. **SSE 流式 AI 对话**：使用 `@microsoft/fetch-event-source` 通过 SSE 协议实现 AI 回复逐字输出，对话结束后自动触发情绪分析联动更新侧边栏"情绪花园"
2. **前后台双端分离**：三种 Layout 组件（FrontendLayout / BackendLayout / AuthLayout）+ Vue Router 导航守卫实现三级角色权限隔离
3. **通用组件封装**：TableSearch 搜索表单（配置数组驱动 + `<component :is>` 动态渲染）、RichTextEditor 富文本编辑器（v-model 封装 + defineExpose）
4. **ECharts 数据看板**：双 Y 轴折线图、渐变色柱状图、多系列面积图展示运营数据，严格管理图表生命周期防止内存泄漏
5. **Axios 工程化封装**：请求拦截器统一注入 Token，响应拦截器统一解包业务数据与处理登录过期

---

## 🧭 路由一览

| 页面 | 路由 |
|------|------|
| 首页 | `/` |
| AI 咨询 | `/consultation` |
| 情绪日记 | `/emotion-diary` |
| 知识库 | `/knowledge` |
| 文章详情 | `/knowledge/article/:id` |
| 登录 | `/auth/login` |
| 注册 | `/auth/register` |
| 数据看板 | `/back/dashboard` |
| 知识管理 | `/back/knowledge` |
| 咨询记录 | `/back/consultations` |
| 情绪日志 | `/back/emotional` |

---

> **注意**：本项目为纯前端项目，需要配合后端 API 服务使用。前端通过 Vite 代理转发请求，后端服务地址在 `vite.config.js` 中配置。接口文档地址：(https://xsl1e23zpk.apifox.cn/)
