/**
 * 聊天状态管理 Store
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {
  ChatMessage,
  ChatMode,
  ModelType,
  ImageModelType,
  TTSModelType,
  ASRModelType,
  VideoModelType,
  FrameVideoModelType,
  VideoQuality,
  VideoSize,
  FrameVideoTask,
} from '@/types'

export const useChatStore = defineStore('chat', () => {
  // ========== 状态定义 ==========

  // 聊天消息列表
  const chatList = ref<ChatMessage[]>([])

  // 当前用户ID
  const currentUserName = ref<string>('')

  // 当前机器人消息ID
  const botMsgId = ref<string | null>(null)

  // 当前激活的功能模式
  const activeMode = ref<ChatMode>('chat')

  // ========== 模型选择 ==========

  // 对话模型
  const selectedModel = ref<ModelType>('deepseek')

  // 图像模型
  const selectedImageModel = ref<ImageModelType>('qwen')

  // TTS 模型
  const selectedTTSModel = ref<TTSModelType>('qwen')

  // ASR 模型
  const selectedASRModel = ref<ASRModelType>('qwen3-asr')

  // 视频模型
  const selectedVideoModel = ref<VideoModelType>('cogvideox-flash')

  // 首尾帧视频模型
  const selectedFrameVideoModel = ref<FrameVideoModelType>('wanx2.1-kf2v-plus')

  // ========== 视频生成参数 ==========

  const selectedVideoQuality = ref<VideoQuality>('speed')
  const selectedVideoSize = ref<VideoSize>('1920x1080')
  const withAudio = ref<boolean>(false)
  const removeWatermark = ref<boolean>(true)

  // ========== 首尾帧视频任务 ==========

  const frameVideoTask = ref<FrameVideoTask>({
    pollingInterval: null,
    taskId: null,
    status: 'idle',
  })

  // 首尾帧文件
  const firstFrameFile = ref<File | null>(null)
  const lastFrameFile = ref<File | null>(null)

  // ========== TTS 状态 ==========

  const isTTSGenerating = ref<boolean>(false)

  // ========== 语音识别 ==========

  const recognizedText = ref<string | null>(null)

  // ========== 图生文 ==========

  const selectedImageFile = ref<File | null>(null)
  const imagePreview = ref<string | null>(null)

  // ========== Getters ==========

  const chatCount = computed(() => chatList.value.length)
  const isPolling = computed(() => frameVideoTask.value.status === 'polling')

  // ========== Actions ==========

  /**
   * 添加聊天消息
   */
  function addMessage(message: ChatMessage) {
    chatList.value.push(message)
  }

  /**
   * 更新机器人消息（流式返回时追加内容）
   */
  function updateBotMessage(msgId: string, content: string) {
    const msg = chatList.value.find((m) => m.botMsgId === msgId)
    if (msg) {
      msg.content += content
    } else {
      chatList.value.push({
        content,
        chatType: 'bot',
        botMsgId: msgId,
      })
    }
  }

  /**
   * 完成机器人消息（替换整个内容，用于 Markdown 渲染）
   */
  function finishBotMessage(msgId: string, content: string) {
    const msg = chatList.value.find((m) => m.botMsgId === msgId)
    if (msg) {
      msg.content = content
    }
  }

  /**
   * 切换功能模式
   */
  function switchMode(mode: ChatMode) {
    activeMode.value = mode
  }

  /**
   * 生成随机ID
   */
  function generateRandomId(length: number = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join('')
  }

  /**
   * 清空聊天记录
   */
  function clearChat() {
    chatList.value = []
  }

  /**
   * 重置首尾帧任务
   */
  function resetFrameVideoTask() {
    if (frameVideoTask.value.pollingInterval) {
      clearInterval(frameVideoTask.value.pollingInterval)
    }
    frameVideoTask.value = {
      pollingInterval: null,
      taskId: null,
      status: 'idle',
    }
    firstFrameFile.value = null
    lastFrameFile.value = null
  }

  /**
   * 初始化用户ID
   */
  function initUserId() {
    if (!currentUserName.value) {
      currentUserName.value = Math.random().toString(36).substring(2, 12)
    }
  }

  return {
    // State
    chatList,
    currentUserName,
    botMsgId,
    activeMode,
    selectedModel,
    selectedImageModel,
    selectedTTSModel,
    selectedASRModel,
    selectedVideoModel,
    selectedFrameVideoModel,
    selectedVideoQuality,
    selectedVideoSize,
    withAudio,
    removeWatermark,
    frameVideoTask,
    firstFrameFile,
    lastFrameFile,
    isTTSGenerating,
    recognizedText,
    selectedImageFile,
    imagePreview,

    // Getters
    chatCount,
    isPolling,

    // Actions
    addMessage,
    updateBotMessage,
    finishBotMessage,
    switchMode,
    generateRandomId,
    clearChat,
    resetFrameVideoTask,
    initUserId,
  }
})
