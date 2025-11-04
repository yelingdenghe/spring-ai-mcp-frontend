<script setup lang="ts">
/**
 * 功能模式选择组件
 */
import { useChatStore } from '@/stores/chat'
import { ElMessage } from 'element-plus'
import type { ChatMode } from '@/types'

const chatStore = useChatStore()

/**
 * 切换模式
 */
function handleModeSwitch(mode: ChatMode) {
  chatStore.switchMode(mode)

  // 图生文模式需要智谱模型
  if (mode === 'imageDesc' && chatStore.selectedModel !== 'zhipu') {
    ElMessage.info('图生文功能目前仅支持智谱(zhipu)模型。')
  }
}
</script>

<template>
  <div class="section-box">
    <div class="section-title">功能模式</div>
    <div class="mode-selector-grid">
      <button
        :class="['mode-button', { selected: chatStore.activeMode === 'chat' }]"
        @click="handleModeSwitch('chat')"
      >
        标准对话
      </button>
      <button
        :class="['mode-button', { selected: chatStore.activeMode === 'knowledge' }]"
        @click="handleModeSwitch('knowledge')"
      >
        知识库
      </button>
      <button
        :class="['mode-button', { selected: chatStore.activeMode === 'internet' }]"
        @click="handleModeSwitch('internet')"
      >
        联网搜索
      </button>
      <button
        :class="['mode-button', { selected: chatStore.activeMode === 'image' }]"
        @click="handleModeSwitch('image')"
      >
        图片生成
      </button>
      <button
        :class="['mode-button', { selected: chatStore.activeMode === 'tts' }]"
        @click="handleModeSwitch('tts')"
      >
        文本转语音
      </button>
      <button
        :class="['mode-button', { selected: chatStore.activeMode === 'imageDesc' }]"
        @click="handleModeSwitch('imageDesc')"
      >
        图生文
      </button>
      <button
        :class="['mode-button', { selected: chatStore.activeMode === 'video' }]"
        @click="handleModeSwitch('video')"
      >
        视频生成
      </button>
      <button
        :class="['mode-button', { selected: chatStore.activeMode === 'frameVideo' }]"
        @click="handleModeSwitch('frameVideo')"
      >
        首尾帧视频
      </button>
    </div>
  </div>
</template>

<style scoped>
.section-box {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.section-title {
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.mode-selector-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.mode-button {
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  font-size: 14px;
}

.mode-button:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.mode-button.selected {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  font-weight: bold;
}
</style>
