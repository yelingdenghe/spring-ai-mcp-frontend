/**
 * SSE (Server-Sent Events) 组合式函数
 * 用于处理服务端推送的流式消息
 */

import { onBeforeUnmount } from 'vue'
import { useChatStore } from '@/stores/chat'
import { marked } from 'marked'

export function useSSE() {
  const chatStore = useChatStore()
  let eventSource: EventSource | null = null

  /**
   * 初始化 SSE 连接
   */
  function initSSE(userId: string) {
    const baseURL = import.meta.env.VITE_API_BASE_URL || ''
    const sseUrl = baseURL
      ? `${baseURL}/sse/connect?userId=${userId}`
      : `/sse/connect?userId=${userId}`
    eventSource = new EventSource(sseUrl)

    // 监听消息添加事件
    eventSource.addEventListener('add', (e: MessageEvent) => {
      const msgId = chatStore.botMsgId
      if (msgId) {
        chatStore.updateBotMessage(msgId, e.data)
      }
    })

    // 监听消息完成事件
    eventSource.addEventListener('finish', (e: MessageEvent) => {
      try {
        const res = JSON.parse(e.data)
        if (res.botMsgId && res.message) {
          // 使用 marked 渲染 Markdown
          const htmlContent = marked.parse(res.message) as string
          chatStore.finishBotMessage(res.botMsgId, htmlContent)
        }
        chatStore.botMsgId = null
      } catch (error) {
        console.error('Failed to parse SSE finish event:', error)
      }
    })

    // 监听错误事件
    eventSource.addEventListener('error', (e) => {
      console.error('SSE connection error:', e)
    })
  }

  /**
   * 关闭 SSE 连接
   */
  function closeSSE() {
    if (eventSource) {
      eventSource.close()
      eventSource = null
    }
  }

  // 组件卸载时自动关闭连接
  onBeforeUnmount(() => {
    closeSSE()
  })

  return {
    initSSE,
    closeSSE,
  }
}
