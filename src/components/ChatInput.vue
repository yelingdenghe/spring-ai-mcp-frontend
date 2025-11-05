<script setup lang="ts">
/**
 * 聊天输入区域组件
 */
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useScrollToBottom } from '@/composables'
import { doChat, ragSearch, internetSearch } from '@/api/chat'
import {
  generateImage,
  generateTTS,
  imageDesc,
  generateVideo,
  submitGenerateVideoFromFrames,
  getVideoTaskStatus,
} from '@/api/media'
import { ElMessage } from 'element-plus'
import VideoControls from './VideoControls.vue'
import FrameVideoControls from './FrameVideoControls.vue'
import ImageDescUpload from './ImageDescUpload.vue'

const chatStore = useChatStore()
const { scrollToBottom } = useScrollToBottom()

const userInput = ref<string>('')

/**
 * 处理聊天发送
 */
async function handleSend() {
  const input = userInput.value.trim()

  // 验证输入（首尾帧视频可以没有文本输入）
  if (input === '' && chatStore.activeMode !== 'frameVideo') {
    return
  }

  // 添加用户消息
  if (input) {
    chatStore.addMessage({ content: input, chatType: 'user' })
    scrollToBottom('chat-messages')
  }

  // 生成机器人消息 ID
  chatStore.botMsgId = chatStore.generateRandomId(12)

  // 根据不同模式调用不同的 API
  try {
    switch (chatStore.activeMode) {
      case 'chat':
        await handleChat(input)
        break
      case 'knowledge':
        await handleKnowledge(input)
        break
      case 'internet':
        await handleInternet(input)
        break
      case 'image':
        await handleImageGenerate(input)
        break
      case 'tts':
        await handleTTS(input)
        break
      case 'imageDesc':
        await handleImageDesc(input)
        break
      case 'video':
        await handleVideoGenerate(input)
        break
      case 'frameVideo':
        await handleFrameVideo(input)
        break
    }
  } catch (error) {
    console.error('Chat error:', error)
  }

  // 清空输入框
  userInput.value = ''
}

/**
 * 标准对话
 */
async function handleChat(message: string) {
  const request = {
    currentUserName: chatStore.currentUserName,
    message,
    botMsgId: chatStore.botMsgId!,
    modelName: chatStore.selectedModel,
  }
  await doChat(request)
}

/**
 * 知识库搜索
 */
async function handleKnowledge(message: string) {
  const request = {
    currentUserName: chatStore.currentUserName,
    message,
    botMsgId: chatStore.botMsgId!,
    modelName: chatStore.selectedModel,
  }
  await ragSearch(request)
}

/**
 * 联网搜索
 */
async function handleInternet(message: string) {
  const request = {
    currentUserName: chatStore.currentUserName,
    message,
    botMsgId: chatStore.botMsgId!,
    modelName: chatStore.selectedModel,
  }
  await internetSearch(request)
}

/**
 * 图像生成
 */
async function handleImageGenerate(prompt: string) {
  try {
    const res = await generateImage({
      query: prompt,
      model: chatStore.selectedImageModel,
    })

    const url = URL.createObjectURL(new Blob([res], { type: 'image/png' }))
    chatStore.addMessage({
      content: url,
      chatType: 'bot',
      isImage: true,
    })
    scrollToBottom('chat-messages')
  } catch (error) {
    ElMessage.error('图像生成失败')
  }
}

/**
 * 文本转语音
 */
async function handleTTS(content: string) {
  try {
    ElMessage.info('正在生成音频...')
    chatStore.isTTSGenerating = true

    const res = await generateTTS({
      content,
      model: chatStore.selectedTTSModel,
    })

    // 将ArrayBuffer转换为Base64 data URL
    // 避免blob URL不支持Range请求的问题
    const base64 = btoa(
      new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''),
    )
    const dataUrl = `data:audio/wav;base64,${base64}`

    chatStore.addMessage({
      content: dataUrl,
      chatType: 'bot',
      isAudio: true,
    })

    ElMessage.success('音频生成成功！')
    scrollToBottom('chat-messages')
  } catch (error) {
    ElMessage.error('音频生成失败！')
  } finally {
    chatStore.isTTSGenerating = false
  }
}

/**
 * 图生文
 */
async function handleImageDesc(prompt: string) {
  if (!chatStore.selectedImageFile) {
    ElMessage.error('请先上传一张图片')
    return
  }

  if (chatStore.selectedModel !== 'zhipu') {
    ElMessage.error('图生文仅支持智谱模型。')
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', chatStore.selectedImageFile)
    formData.append('query', prompt)
    formData.append('userId', chatStore.currentUserName)
    formData.append('botMsgId', chatStore.botMsgId!)

    await imageDesc(formData)

    // 清除图片选择
    chatStore.selectedImageFile = null
    chatStore.imagePreview = null
  } catch (error) {
    ElMessage.error('图生文请求失败')
  }
}

/**
 * 视频生成
 */
async function handleVideoGenerate(prompt: string) {
  try {
    ElMessage.info('正在生成视频，请稍候...')

    const res = await generateVideo({
      prompt,
      model: chatStore.selectedVideoModel,
      quality: chatStore.selectedVideoQuality,
      size: chatStore.selectedVideoSize,
      with_audio: chatStore.withAudio,
      watermark: !chatStore.removeWatermark,
    })

    if (res.status === 200 && res.data) {
      chatStore.addMessage({
        content: res.data,
        chatType: 'bot',
        isVideo: true,
      })
      ElMessage.success('视频生成成功！')
    } else {
      ElMessage.error(res.msg || '视频生成失败')
    }

    scrollToBottom('chat-messages')
  } catch (error) {
    ElMessage.error('视频生成请求失败')
  }
}

/**
 * 首尾帧视频生成
 */
async function handleFrameVideo(prompt: string) {
  if (!chatStore.firstFrameFile || !chatStore.lastFrameFile) {
    ElMessage.error('请确保已上传首帧和尾帧图片。')
    return
  }

  if (chatStore.frameVideoTask.status === 'polling') {
    ElMessage.warning('已有视频正在生成中，请稍候...')
    return
  }

  try {
    ElMessage.info('正在提交首尾帧视频生成任务...')

    const formData = new FormData()
    formData.append('prompt', prompt)
    formData.append('model', chatStore.selectedFrameVideoModel)
    formData.append('firstFrame', chatStore.firstFrameFile)
    formData.append('lastFrame', chatStore.lastFrameFile)

    const res = await submitGenerateVideoFromFrames(formData)

    if (res.status === 200 && res.data) {
      chatStore.frameVideoTask.taskId = res.data
      chatStore.frameVideoTask.status = 'polling'

      ElMessage.success(`任务提交成功！ID: ${res.data}，开始轮询状态...`)

      // 清除帧文件
      chatStore.firstFrameFile = null
      chatStore.lastFrameFile = null

      // 开始轮询
      startPolling()
    } else {
      ElMessage.error(res.msg || '任务提交失败')
    }
  } catch (error) {
    ElMessage.error('任务提交请求失败')
  }
}

/**
 * 开始轮询视频任务状态
 */
function startPolling() {
  const interval = setInterval(async () => {
    if (!chatStore.frameVideoTask.taskId) return

    try {
      const res = await getVideoTaskStatus(chatStore.frameVideoTask.taskId)

      if (res.status === 200 && res.data) {
        const task = res.data
        chatStore.frameVideoTask.status = task.taskStatus

        if (task.taskStatus === 'SUCCEEDED') {
          stopPolling()
          ElMessage.success('视频生成成功！')

          if (task.videoUrl) {
            chatStore.addMessage({
              content: task.videoUrl,
              chatType: 'bot',
              isVideo: true,
            })
            scrollToBottom('chat-messages')
          }
        } else if (task.taskStatus === 'FAILED' || task.taskStatus === 'CANCELED') {
          stopPolling()
          ElMessage.error(`视频生成失败: ${task.message}`)
        }
      }
    } catch (error) {
      stopPolling()
      ElMessage.error('查询任务状态失败')
    }
  }, 5000)

  chatStore.frameVideoTask.pollingInterval = interval as unknown as number
}

/**
 * 停止轮询
 */
function stopPolling() {
  if (chatStore.frameVideoTask.pollingInterval) {
    clearInterval(chatStore.frameVideoTask.pollingInterval)
    chatStore.resetFrameVideoTask()
  }
}

/**
 * 键盘回车发送
 */
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div class="chat-input-container">
    <!-- 视频生成控制 -->
    <VideoControls v-if="chatStore.activeMode === 'video'" />

    <!-- 首尾帧视频控制 -->
    <FrameVideoControls v-if="chatStore.activeMode === 'frameVideo'" />

    <!-- 图生文上传 -->
    <ImageDescUpload v-if="chatStore.activeMode === 'imageDesc'" />

    <!-- 输入框 -->
    <div class="chat-input">
      <input
        v-model="userInput"
        type="text"
        class="user-input"
        placeholder="请输入内容..."
        @keydown="handleKeydown"
      />
      <button
        class="btn-chat"
        :disabled="chatStore.isTTSGenerating || chatStore.isPolling"
        @click="handleSend"
      >
        {{ chatStore.isPolling ? '生成中...' : '发送' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-input-container {
  padding: 20px;
  border-top: 1px solid var(--border-color);
  background: var(--secondary-color);
}

.chat-input {
  display: flex;
  gap: 10px;
}

.user-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s;
}

.user-input:focus {
  border-color: var(--primary-color);
}

.btn-chat {
  padding: 12px 25px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.btn-chat:hover {
  background-color: #357abd;
}

.btn-chat:disabled {
  background-color: #357abd;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
