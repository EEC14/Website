import React, { useState, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ChatMessage: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSubmit,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      
      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [setInput]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-effect p-3 sm:p-4">
      <div className="max-w-3xl mx-auto flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your health question..."
          className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 
                   rounded-xl text-[15px] sm:text-base
                   text-gray-800 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={toggleListening}
          className={`px-4 rounded-xl transition-colors duration-200 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {isListening ? (
            <MicOff className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          )}
        </button>
        <button
          type="submit"
          disabled={!String(input || '').trim()}
          className="px-4 sm:px-6 bg-blue-900 text-white rounded-xl hover:bg-blue-800 
                  transition-colors duration-200 shadow-sm
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Send className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </form>
  );
};

export default ChatMessage;