<script setup lang="ts">
/**
 * 聊天消息列表组件
 */
import { computed, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useScrollToBottom } from '@/composables'

const chatStore = useChatStore()
const { scrollToBottom } = useScrollToBottom()

const messages = computed(() => chatStore.chatList)

// 监听消息变化，自动滚动到底部
watch(
  () => chatStore.chatList.length,
  () => {
    scrollToBottom('chat-messages')
  },
)

// 音频加载完成
function handleAudioLoaded(event: Event) {
  const audio = event.target as HTMLAudioElement
  console.log('音频加载成功，时长:', audio.duration, '秒')
}

// 音频加载错误
function handleAudioError(event: Event) {
  const audio = event.target as HTMLAudioElement
  console.error('音频加载失败:', audio.error)
}
</script>

<template>
  <div id="chat-messages" class="chat-messages">
    <div v-for="(item, index) in messages" :key="index" :class="['message', item.chatType]">
      <!-- 机器人头像 -->
      <div v-if="item.chatType === 'bot'" class="avatar">AI</div>

      <!-- 文本消息 -->
      <div
        v-if="!item.isImage && !item.isAudio && !item.isVideo"
        class="text"
        v-html="item.content"
      ></div>

      <!-- 图片消息 -->
      <div v-if="item.isImage" class="text">
        <img :src="item.content" class="message-image" />
      </div>

      <!-- 音频消息 -->
      <div v-if="item.isAudio" class="text audio-container">
        <audio
          controls
          :src="item.content"
          preload="metadata"
          @error="handleAudioError"
          @loadedmetadata="handleAudioLoaded"
        ></audio>
        <a :href="item.content" download="generated_audio.wav" class="download-btn"> 下载音频 </a>
      </div>

      <!-- 视频消息 -->
      <div v-if="item.isVideo" class="text">
        <video controls width="300">
          <source :src="item.content" type="video/mp4" />
        </video>
      </div>

      <!-- 用户头像 -->
      <div v-if="item.chatType === 'user'" class="user-avatar">我</div>
    </div>
  </div>
</template>

<style scoped>
.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: var(--container-bg);
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 10px;
}

.message.user {
  justify-content: flex-end;
}

.avatar,
.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
}

.avatar {
  background: var(--primary-color);
  color: white;
}

.user-avatar {
  background: #67c23a;
  color: white;
}

.text {
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 8px;
  word-wrap: break-word;
  line-height: 1.6;
}

.message.bot .text {
  background-color: var(--bot-msg-bg);
  border: 1px solid var(--border-color);
}

.message.user .text {
  background-color: var(--user-msg-bg);
}

.message-image {
  max-width: 300px;
  border-radius: 5px;
  display: block;
}

.audio-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 320px;
}

.audio-container audio {
  width: 100%;
  min-width: 320px;
  height: 40px;
  outline: none;
}

.download-btn {
  display: inline-block;
  padding: 6px 12px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  transition: background-color 0.3s;
}

.download-btn:hover {
  background-color: #357abd;
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
