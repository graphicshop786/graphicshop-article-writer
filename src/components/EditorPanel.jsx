import React, { useRef, useState } from 'react';

// Editor Panel Component
function EditorPanel({ article, setArticle }) {
  const textareaRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleClear = () => {
    setArticle('');
    if (textareaRef.current) textareaRef.current.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900/70 dark:bg-white/80 backdrop-blur-lg shadow-xl p-6 rounded-2xl border border-gray-800 dark:border-gray-200 flex flex-col relative transition-colors duration-300">
      <h2 className="text-2xl font-bold text-brand-gold mb-6 tracking-tight drop-shadow flex items-center gap-2">
        Article Editor
        <span className="ml-auto flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-brand-gold hover:text-black transition text-lg"
            title="Copy to clipboard"
          >
            <i className={`fa-regular fa-copy ${copied ? 'text-green-400' : ''}`}></i>
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-red-500 hover:text-white transition text-lg"
            title="Clear article"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </span>
      </h2>
      <textarea
        ref={textareaRef}
        value={article}
        onChange={(e) => setArticle(e.target.value)}
        className="w-full h-96 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand-gold focus:outline-none transition resize-none text-base shadow-inner"
        placeholder="Your article will appear here..."
      />
      {copied && (
        <div className="absolute top-4 right-4 bg-green-700/90 text-white px-3 py-1 rounded shadow text-sm animate-fade-in">
          Copied!
        </div>
      )}
    </div>
  );
}

export default EditorPanel;