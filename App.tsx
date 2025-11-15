
import React, { useState } from 'react';
import { Feature, ChatMessage } from './types';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';
import ImageAnalyzer from './components/ImageAnalyzer';
import VoiceAssistant from './components/VoiceAssistant';
import AudioTranscriber from './components/AudioTranscriber';
import Notification from './components/Notification';

const App: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<Feature>(Feature.ImageAnalyzer);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [notification, setNotification] = useState<{ message: string; visible: boolean } | null>(null);
  const [newAnalysisForChat, setNewAnalysisForChat] = useState<{ id: string; content: string } | null>(null);

  const handleAnalysisComplete = (result: string) => {
    setNewAnalysisForChat({ id: Date.now().toString(), content: result });
    setActiveFeature(Feature.Chatbot);
    setNotification({ message: "Аналіз завершено! Перегляньте результати в чаті.", visible: true });
  };
  
  const handleNewAnalysisConsumed = () => {
    setNewAnalysisForChat(null);
  };

  const handleNotificationDismiss = () => {
    setNotification(prev => prev ? { ...prev, visible: false } : null);
  };

  const renderFeature = () => {
    switch (activeFeature) {
      case Feature.Chatbot:
        return <Chatbot 
          newAnalysisForChat={newAnalysisForChat}
          onNewAnalysisConsumed={handleNewAnalysisConsumed} 
        />;
      case Feature.ImageAnalyzer:
        return <ImageAnalyzer onAnalysisComplete={handleAnalysisComplete} />;
      case Feature.VoiceAssistant:
        return <VoiceAssistant />;
      case Feature.AudioTranscriber:
        return <AudioTranscriber />;
      default:
        return <ImageAnalyzer onAnalysisComplete={handleAnalysisComplete} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {renderFeature()}
      </main>
      {notification?.visible && (
        <Notification 
          message={notification.message} 
          onDismiss={handleNotificationDismiss} 
        />
      )}
    </div>
  );
};

export default App;
