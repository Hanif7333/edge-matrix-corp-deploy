'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'system';
  content: string;
}

export function TerminalAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'system', content: 'Edge Matrix OS v4.2.0 initialized.' },
    { id: '2', type: 'system', content: 'Type "help" to view available commands or ask a question.' },
  ]);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const handleCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();
    let response = '';

    if (lowerCmd === 'help') {
      response = 'Available commands:\n- `about`: Learn about Edge Matrix\n- `services`: View capabilities\n- `contact`: Initiate comms\n- `clear`: Clear terminal';
    } else if (lowerCmd === 'about') {
      response = 'Edge Matrix Corporation is a global Industry 5.0 technology partner engineering intelligent AI, Robotics, and Automation systems.';
    } else if (lowerCmd === 'services') {
      response = 'We engineer: Vision AI, Voice AI, Robotics, Predictive Analytics, Digital Twins, and IIoT architectures.';
    } else if (lowerCmd === 'contact') {
      response = 'Initializing routing protocol... Navigate to /contact to schedule an executive briefing.';
    } else if (lowerCmd === 'clear') {
      setMessages([]);
      return;
    } else {
      response = `Command not recognized: '${cmd}'. Natural Language Processing module offline. Type 'help'.`;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), type: 'system', content: response }]);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), type: 'user', content: inputValue };
    setMessages(prev => [...prev, newMsg]);
    handleCommand(inputValue);
    setInputValue('');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-em-surface/80 backdrop-blur-xl border border-em-border shadow-2xl flex items-center justify-center text-em-text hover:text-em-primary hover:border-em-primary/50 transition-colors group"
            aria-label="Open Matrix OS terminal assistant"
            aria-haspopup="dialog"
            aria-controls="matrix-os-terminal-window"
            aria-expanded={isOpen}
          >
            <Terminal className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 rounded-full border border-em-primary/30 animate-ping opacity-50" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '48px' : '400px'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[450px] em-glass-strong border border-em-border rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-sm"
            id="matrix-os-terminal-window"
            role="dialog"
            aria-modal="false"
            aria-label="Matrix OS terminal assistant window"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-em-border bg-em-surface select-none">
              <div className="flex items-center gap-2 text-em-text text-xs font-semibold">
                <Terminal className="w-4 h-4 text-em-primary" />
                <span>matrix_os_terminal</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-em-text-muted hover:text-em-primary transition-colors cursor-none"
                  aria-label={isMinimized ? "Maximize terminal window" : "Minimize terminal window"}
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-em-text-muted hover:text-em-primary transition-colors cursor-none"
                  aria-label="Close terminal window"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            {!isMinimized && (
              <>
                <div 
                  className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-em-primary/20"
                  role="log"
                  aria-live="polite"
                  aria-relevant="additions"
                >
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <span className="shrink-0 font-bold">
                        {msg.type === 'system' ? (
                          <span className="text-em-primary">sys&gt;</span>
                        ) : (
                          <span className="text-em-accent">usr$</span>
                        )}
                      </span>
                      <span className={`whitespace-pre-wrap ${msg.type === 'system' ? 'text-em-text-secondary' : 'text-em-text font-semibold'}`}>
                        {msg.content}
                      </span>
                    </div>
                  ))}
                  <div ref={endOfMessagesRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-em-border bg-em-surface flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-em-primary shrink-0" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-em-text placeholder:text-em-text-muted/60"
                    placeholder="Enter command..."
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                    aria-label="Terminal command prompt input"
                  />
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
