<script setup lang="ts">
/**
 * 聊天侧边栏组件 - 包含所有配置选项
 */
import ModeSelector from './ModeSelector.vue'
import ModelSelector from './ModelSelector.vue'
import KnowledgeUpload from './KnowledgeUpload.vue'
import ASRControls from './ASRControls.vue'
import RealtimeASR from './RealtimeASR.vue'
</script>

<template>
  <aside class="sidebar">
    <!-- 功能模式选择 -->
    <ModeSelector />

    <!-- 模型配置 -->
    <ModelSelector />

    <!-- 知识库文档上传 -->
    <KnowledgeUpload />

    <!-- 语音识别控制 -->
    <ASRControls />

    <!-- 实时识别 -->
    <RealtimeASR />
  </aside>
</template>

<style scoped>
.sidebar {
  width: 320px;
  background: var(--secondary-color);
  padding: 20px;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

/* 滚动条样式 */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
