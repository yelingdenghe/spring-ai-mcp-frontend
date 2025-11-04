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
      <div v-if="item.isAudio" class="text">
        <audio controls :src="item.content"></audio>
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
