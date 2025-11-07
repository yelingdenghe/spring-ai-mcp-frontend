# Spring AI Frontend Vue

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue-3.5.22-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF.svg)
![Element Plus](https://img.shields.io/badge/Element%20Plus-2.11-409EFF.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**基于 Vue 3 + TypeScript 的 AI 智能对话前端应用**

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [技术栈](#-技术栈) • [项目结构](#-项目结构) • [配置说明](#-配置说明)

</div>

---

## 📖 项目简介

Spring AI Frontend Vue 是一个现代化的 AI 智能对话前端应用，为 Spring AI 后端服务提供完整的用户交互界面。该项目采用 Vue 3 Composition API + TypeScript 开发，支持多种 AI 模型和多模态交互功能。

### 💡 项目亮点

- 🎨 **现代化 UI**：基于 Element Plus 的精美界面设计
- 🚀 **高性能**：Vite 7.x 构建，开发体验极佳
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🔄 **实时通信**：SSE 流式传输，WebSocket 语音识别
- 🎯 **类型安全**：完整的 TypeScript 类型定义
- 🔌 **模块化架构**：组件化开发，易于维护和扩展

---

## ✨ 功能特性

### 🤖 多模式智能对话

- **标准对话**：支持 DeepSeek、通义千问、智谱 AI 等多种大语言模型
- **知识库问答（RAG）**：基于向量数据库的智能检索问答
- **联网搜索**：实时获取互联网信息并生成回答
- **流式输出**：基于 SSE 的实时消息流式传输
- **上下文管理**：多轮对话上下文保持

### 🎤 语音交互

- **实时语音识别（ASR）**：
  - WebSocket 实时语音转文字
  - 支持通义千问语音模型
  - 实时显示识别结果
- **语音合成（TTS）**：
  - 文字转语音功能
  - 多种音色选择
  - 在线播放和下载

### 🖼️ 图像处理

- **图像生成**：
  - 支持 Flux.1、通义千问等图像模型
  - 文字描述生成图片
  - 实时预览和下载

- **图像理解**：
  - 上传图片进行智能分析
  - 图片内容描述
  - 基于图片的智能问答

### 🎬 视频处理

- **视频生成**：
  - CogVideoX-Flash 文生视频
  - 自定义视频尺寸和质量
  - 支持添加音频和水印

- **关键帧视频**：
  - 首尾帧插值生成视频
  - Wanx2.1-KF2V-Plus 模型
  - 任务状态实时追踪

### 📚 知识库管理

- **文档上传**：支持多种文档格式（PDF、DOCX、Markdown 等）
- **命名空间管理**：隔离不同知识库
- **智能检索**：基于向量相似度的精准检索

---

## 🚀 快速开始

### 前置要求

- ✅ Node.js 20.19.0+ 或 22.12.0+
- ✅ npm 或 pnpm
- ✅ Spring AI 后端服务 [后端项目地址](https://github.com/yelingdenghe/spring-ai-mcp-backend)

### 安装步骤

#### 1️⃣ 克隆项目

```bash
git clone https://github.com/yelingdenghe/spring-ai-frontend.git
cd spring-ai-frontend-vue
```

#### 2️⃣ 安装依赖

```bash
npm install
# 或使用 pnpm
pnpm install
```

#### 3️⃣ 配置环境变量

创建环境配置文件：

```bash
# 开发环境
cp .env.example .env.development

# 生产环境
cp .env.example .env.production
```

编辑 `.env.development` 文件：

```env
NODE_ENV=development

# 后端服务地址
VITE_BACKEND_URL=http://localhost:9009

# API Base URL (开发环境留空使用代理)
VITE_API_BASE_URL=

# WebSocket 地址
VITE_WS_BASE_URL=ws://localhost:5173

# 开发工具
VITE_ENABLE_DEV_TOOLS=true
VITE_ENABLE_CONSOLE_LOG=true
```

#### 4️⃣ 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

#### 5️⃣ 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

---

## 🛠️ 技术栈

### 核心框架

| 技术       | 版本   | 说明                   |
| ---------- | ------ | ---------------------- |
| Vue        | 3.5.22 | 渐进式 JavaScript 框架 |
| TypeScript | 5.9.0  | JavaScript 的超集      |
| Vite       | 7.1.11 | 下一代前端构建工具     |
| Vue Router | 4.6.3  | Vue.js 官方路由        |
| Pinia      | 3.0.3  | Vue.js 状态管理库      |

### UI 与样式

| 技术               | 版本   | 说明            |
| ------------------ | ------ | --------------- |
| Element Plus       | 2.11.7 | Vue 3 UI 组件库 |
| Element Plus Icons | 2.3.2  | 图标库          |

### 工具库

| 技术      | 版本   | 说明            |
| --------- | ------ | --------------- |
| Axios     | 1.13.1 | HTTP 客户端     |
| Marked    | 16.4.1 | Markdown 解析器 |
| js-cookie | 3.0.5  | Cookie 操作库   |

### 开发工具

| 技术              | 说明                |
| ----------------- | ------------------- |
| ESLint            | 代码质量检查        |
| Prettier          | 代码格式化          |
| Vue DevTools      | Vue 开发者工具      |
| TypeScript ESLint | TypeScript 代码检查 |

---

## 📁 项目结构

```
spring-ai-frontend-vue/
├── src/
│   ├── api/                      # API 接口定义
│   │   ├── chat.ts              # 聊天相关 API
│   │   ├── media.ts             # 媒体处理 API
│   │   └── index.ts             # API 统一导出
│   │
│   ├── components/               # 可复用组件
│   │   ├── ASRControls.vue      # 语音识别控制组件
│   │   ├── ChatHeader.vue       # 聊天页头部组件
│   │   ├── ChatInput.vue        # 消息输入组件
│   │   ├── ChatMessages.vue     # 消息列表组件
│   │   ├── ChatSidebar.vue      # 侧边栏组件
│   │   ├── FrameVideoControls.vue   # 关键帧视频控制
│   │   ├── ImageDescUpload.vue  # 图像描述上传组件
│   │   ├── KnowledgeUpload.vue  # 知识库上传组件
│   │   ├── ModelSelector.vue    # 模型选择器
│   │   ├── ModeSelector.vue     # 模式选择器
│   │   ├── RealtimeASR.vue      # 实时语音识别组件
│   │   ├── RecognizedTextDialog.vue # 识别文本对话框
│   │   └── VideoControls.vue    # 视频控制组件
│   │
│   ├── composables/              # 组合式函数
│   │   ├── useRealtimeASR.ts    # 实时语音识别逻辑
│   │   ├── useRecording.ts      # 录音功能逻辑
│   │   ├── useScrollToBottom.ts # 自动滚动逻辑
│   │   ├── useSSE.ts            # SSE 连接逻辑
│   │   └── index.ts             # 统一导出
│   │
│   ├── stores/                   # 状态管理
│   │   ├── app.ts               # 应用全局状态
│   │   └── chat.ts              # 聊天状态管理
│   │
│   ├── types/                    # TypeScript 类型定义
│   │   ├── chat.ts              # 聊天相关类型
│   │   ├── response.ts          # API 响应类型
│   │   └── index.ts             # 类型统一导出
│   │
│   ├── utils/                    # 工具函数
│   │   └── request.ts           # Axios 封装
│   │
│   ├── views/                    # 页面视图
│   │   └── ChatView.vue         # 聊天主页面
│   │
│   ├── router/                   # 路由配置
│   │   └── index.ts             # 路由定义
│   │
│   ├── assets/                   # 静态资源
│   │   └── styles/
│   │       └── global.css       # 全局样式
│   │
│   ├── App.vue                   # 根组件
│   └── main.ts                   # 应用入口
│
├── public/                       # 公共静态资源
│   └── favicon.ico              # 网站图标
│
├── dist/                         # 构建输出目录（生成）
│
├── .env.example                  # 环境变量示例
├── .env.development              # 开发环境配置
├── .env.production               # 生产环境配置
│
├── Dockerfile                    # Docker 镜像构建文件
├── Dockerfile.simple             # 简化版 Docker 构建
├── nginx.conf                    # Nginx 配置文件
│
├── vite.config.ts                # Vite 配置
├── tsconfig.json                 # TypeScript 配置
├── package.json                  # 项目依赖配置
├── .gitignore                    # Git 忽略配置
├── .editorconfig                 # 编辑器配置
├── .prettierrc.json              # Prettier 配置
├── eslint.config.ts              # ESLint 配置
└── README.md                     # 项目文档（本文件）
```

---

## ⚙️ 配置说明

### 环境变量

项目支持多环境配置，通过不同的 `.env` 文件管理：

| 文件               | 用途                         |
| ------------------ | ---------------------------- |
| `.env`             | 所有环境共享的配置           |
| `.env.development` | 开发环境专用配置             |
| `.env.production`  | 生产环境专用配置             |
| `.env.local`       | 本地覆盖配置（不提交到 Git） |
| `.env.example`     | 环境变量示例模板             |

#### 环境变量说明

```env
# 运行环境
NODE_ENV=development|production

# 后端服务地址（用于 Vite 代理）
VITE_BACKEND_URL=http://localhost:9009

# API 基础地址
# 开发环境建议留空，使用 Vite 代理
# 生产环境填写完整后端地址
VITE_API_BASE_URL=

# WebSocket 地址
# 开发环境：ws://localhost:5173（通过 Vite 代理）
# 生产环境：ws://your-server:9009
VITE_WS_BASE_URL=ws://localhost:5173

# 开发工具开关
VITE_ENABLE_DEV_TOOLS=true
VITE_ENABLE_CONSOLE_LOG=true
```

### Vite 代理配置

开发环境下，Vite 会自动代理以下路径到后端服务：

- `/api/*` - 通用 API 接口
- `/sse/*` - SSE 事件流
- `/chat/*` - 聊天接口
- `/rag/*` - RAG 知识库接口
- `/internet/*` - 联网搜索接口

配置位置：`vite.config.ts`

### TypeScript 配置

项目使用严格的 TypeScript 配置，主要配置文件：

- `tsconfig.json` - 项目级 TypeScript 配置
- `tsconfig.app.json` - 应用代码 TypeScript 配置
- `tsconfig.node.json` - Node.js 相关配置

---

## 🐳 Docker 部署

### 方式一：使用 Dockerfile

```bash
# 构建镜像
docker build -t spring-ai-frontend:latest .

# 运行容器
docker run -d \
  --name spring-ai-frontend \
  -p 80:80 \
  spring-ai-frontend:latest
```

### 方式二：使用 Dockerfile.simple（推荐）

适用于本地已构建好 `dist/` 目录的场景：

```bash
# 先在本地构建
npm run build

# 使用简化版 Dockerfile
docker build -f Dockerfile.simple -t spring-ai-frontend:latest .

# 运行容器
docker run -d \
  --name spring-ai-frontend \
  -p 80:80 \
  spring-ai-frontend:latest
```

### Nginx 配置

容器内使用 Nginx 提供服务，主要配置：

- 端口：80
- 支持 History 路由模式
- Gzip 压缩
- 静态资源缓存
- 反向代理支持

详细配置见 `nginx.conf` 文件。

---

## 🔌 API 接口说明

### 聊天相关

```typescript
// 标准对话
doChat(data: ChatRequest): Promise<ApiResponse>

// RAG 知识库搜索
ragSearch(data: ChatRequest): Promise<ApiResponse>

// 联网搜索
internetSearch(data: ChatRequest): Promise<ApiResponse>

// 上传知识库文档
uploadRagDoc(formData: FormData): Promise<ApiResponse>
```

### 媒体处理

```typescript
// 图像生成
generateImage(data: ImageGenerateRequest): Promise<ApiResponse>

// 图像描述
describeImage(formData: FormData): Promise<ApiResponse>

// 语音合成（TTS）
generateTTS(data: TTSGenerateRequest): Promise<ApiResponse>

// 视频生成
generateVideo(data: VideoGenerateRequest): Promise<ApiResponse>

// 关键帧视频生成
generateFrameVideo(formData: FormData): Promise<ApiResponse>

// 查询视频任务状态
getVideoTaskStatus(taskId: string): Promise<VideoTaskResponse>
```

---

## 🎨 主要功能模块

### 1. 聊天模式切换

支持以下聊天模式：

- **chat** - 标准对话
- **knowledge** - 知识库问答
- **internet** - 联网搜索
- **image** - 图像生成
- **imageDesc** - 图像理解
- **tts** - 语音合成
- **video** - 视频生成
- **frameVideo** - 关键帧视频

### 2. 模型选择

支持切换不同的 AI 模型：

- **DeepSeek** - 高性价比对话模型
- **通义千问（Qwen）** - 阿里云 AI 模型
- **智谱 AI（GLM）** - 清华智谱 AI 模型

### 3. SSE 实时消息

通过 Server-Sent Events 实现流式消息传输：

```typescript
// 使用示例
const { initSSE } = useSSE()
initSSE(userId)
```

### 4. WebSocket 语音识别

实时语音识别功能：

```typescript
// 使用示例
const { startRecording, stopRecording } = useRealtimeASR()
startRecording()
```

---

## 📝 开发指南

### 代码规范

项目使用 ESLint + Prettier 进行代码规范约束：

```bash
# 代码检查
npm run lint

# 代码格式化
npm run format
```

### 类型检查

```bash
# TypeScript 类型检查
npm run type-check
```

### 组件开发规范

1. **文件命名**：使用 PascalCase（如 `ChatInput.vue`）
2. **使用 Composition API**：统一使用 `<script setup>` 语法
3. **类型定义**：为 props、emits、ref 等添加完整类型
4. **组件注释**：每个组件顶部添加功能说明注释

示例：

```vue
<script setup lang="ts">
/**
 * 聊天输入组件
 * 功能：消息输入、发送、文件上传等
 */
import { ref } from 'vue'

interface Props {
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  send: [message: string]
}>()
</script>
```

### 状态管理规范

使用 Pinia 进行状态管理，遵循以下原则：

1. **模块化**：按功能划分 store（如 `chatStore`、`appStore`）
2. **类型安全**：为 state、actions 添加类型定义
3. **持久化**：使用 `js-cookie` 持久化关键数据

---

## 🔧 常见问题

### Q1: 启动时提示端口被占用？

**A**: 修改 `vite.config.ts` 中的端口配置：

```typescript
server: {
  port: 5174, // 修改为其他端口
}
```

### Q2: 连接后端失败？

**A**: 检查以下几点：

1. 后端服务是否正常运行（默认端口 9009）
2. `.env.development` 中的 `VITE_BACKEND_URL` 是否正确
3. 网络防火墙是否阻止了连接

### Q3: 构建后刷新页面 404？

**A**: 这是 History 路由模式的常见问题。解决方案：

- **Nginx**: 使用提供的 `nginx.conf` 配置
- **其他服务器**: 配置将所有请求重定向到 `index.html`

### Q4: WebSocket 连接失败？

**A**: 检查：

1. 后端是否支持 WebSocket
2. `.env` 中的 `VITE_WS_BASE_URL` 是否正确
3. 代理配置是否包含 WebSocket 支持

### Q5: 生产环境 API 请求 404？

**A**: 生产环境需要：

1. 设置正确的 `VITE_API_BASE_URL`
2. 或配置 Nginx 反向代理到后端服务

---

## 📦 NPM 脚本

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 仅构建（不进行类型检查）
npm run build-only

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 代码格式化
npm run format
```

---

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 提交规范

使用语义化提交信息：

- `feat:` 新功能
- `fix:` 修复 Bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构代码
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具相关

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。

---

## 🔗 相关链接

- **后端项目**: [SpringAI-MCP-RAG-Dev](https://github.com/yelingdenghe/spring-ai-mcp-backend)
- **Vue 3 文档**: https://vuejs.org/
- **Vite 文档**: https://vitejs.dev/
- **Element Plus 文档**: https://element-plus.org/
- **TypeScript 文档**: https://www.typescriptlang.org/

---



<div align="center">

**Made with ❤️ by Yeling**

[⬆ 回到顶部](#spring-ai-frontend-vue)

</div>
