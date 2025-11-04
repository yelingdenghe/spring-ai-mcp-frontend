<script setup lang="ts">
/**
 * 聊天主视图
 */
import { onMounted, ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useSSE } from '@/composables'
import ChatHeader from '@/components/ChatHeader.vue'
import ChatSidebar from '@/components/ChatSidebar.vue'
import ChatMessages from '@/components/ChatMessages.vue'
import ChatInput from '@/components/ChatInput.vue'
import RecognizedTextDialog from '@/components/RecognizedTextDialog.vue'

const chatStore = useChatStore()
const { initSSE } = useSSE()

// 用于 ChatInput 的 ref
const chatInputRef = ref<InstanceType<typeof ChatInput>>()

/**
 * 组件挂载时初始化
 */
onMounted(() => {
  // 初始化用户ID
  chatStore.initUserId()

  // 初始化 SSE 连接
  initSSE(chatStore.currentUserName)
})

/**
 * 处理发送识别文本到AI
 */
function handleSendRecognizedText(text: string) {
  // 这里可以直接调用 ChatInput 的发送方法
  // 或者通过其他方式处理
  console.log('Send to AI:', text)
}
</script>

<template>
  <div class="chat-container">
    <!-- 语音识别结果对话框 -->
    <RecognizedTextDialog @send-to-ai="handleSendRecognizedText" />

    <!-- 页面头部 -->
    <ChatHeader />

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 侧边栏 -->
      <ChatSidebar />

      <!-- 聊天面板 -->
      <div class="control-panel">
        <!-- 消息列表 -->
        <ChatMessages />

        <!-- 输入区域 -->
        <ChatInput ref="chatInputRef" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.chat-container {
  width: 90%;
  max-width: 1200px;
  height: 95vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.control-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}
</style>
