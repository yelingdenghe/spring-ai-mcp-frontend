/**
 * 聊天相关类型定义
 */

// 聊天模式类型
export type ChatMode =
  | 'chat'
  | 'knowledge'
  | 'internet'
  | 'image'
  | 'tts'
  | 'imageDesc'
  | 'video'
  | 'frameVideo'

// 聊天类型（用户/机器人）
export type ChatType = 'user' | 'bot'

// 模型类型
export type ModelType = 'deepseek' | 'qwen' | 'zhipu'
export type ImageModelType = 'qwen' | 'flux_1'
export type TTSModelType = 'qwen'
export type ASRModelType = 'qwen3-asr' | 'qwen-audio'
export type VideoModelType = 'cogvideox-flash'
export type FrameVideoModelType = 'wanx2.1-kf2v-plus'

// 视频质量类型
export type VideoQuality = 'speed' | 'quality'
export type VideoSize = '1024x1024' | '1920x1080' | '1080x1920'

// 聊天消息接口
export interface ChatMessage {
  content: string
  chatType: ChatType
  isImage?: boolean
  isAudio?: boolean
  isVideo?: boolean
  botMsgId?: string
}

// 聊天请求
export interface ChatRequest {
  currentUserName: string
  message: string
  botMsgId: string
  modelName: ModelType
}

// 图像生成请求
export interface ImageGenerateRequest {
  query: string
  model: ImageModelType
}

// TTS 生成请求
export interface TTSGenerateRequest {
  content: string
  model: TTSModelType
}

// 视频生成请求
export interface VideoGenerateRequest {
  prompt: string
  model: VideoModelType
  quality: VideoQuality
  size: VideoSize
  with_audio: boolean
  watermark: boolean
}

// 首尾帧视频任务状态
export type FrameVideoTaskStatus = 'idle' | 'polling' | 'SUCCEEDED' | 'FAILED' | 'CANCELED'

// 首尾帧视频任务
export interface FrameVideoTask {
  pollingInterval: number | null
  taskId: string | null
  status: FrameVideoTaskStatus
}

// 视频任务响应
export interface VideoTaskResponse {
  taskStatus: FrameVideoTaskStatus
  videoUrl?: string
  message?: string
}
