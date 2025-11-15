export enum Feature {
  Chatbot = "Chatbot",
  ImageAnalyzer = "Analiz AI",
  VoiceAssistant = "Voice Assistant",
  AudioTranscriber = "Audio Transcriber",
}

export interface ChatMessagePart {
  text?: string;
  inlineData?: {
      base64: string;
      mimeType: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: ChatMessagePart[];
}
