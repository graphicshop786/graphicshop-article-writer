import React, { useState } from 'react';
import ArticleForm from './components/ArticleForm';
import EditorPanel from './components/EditorPanel';
import ExportPanel from './components/ExportPanel';

// Main App Component
function App() {
  const [showLoader, setShowLoader] = useState(true);
  // Show loading placeholder for 1.2s on initial mount
  React.useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [length, setLength] = useState('short');
  const [model, setModel] = useState('auto');
  const [tone, setTone] = useState('Neutral');
  const [customWordError, setCustomWordError] = useState('');
  const [article, setArticle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // Supported models for both Groq and OpenRouter
  const groqModelMap = {
    'Llama 3 8B': 'llama3-8b-8192',
    'Llama 3 70B': 'llama3-70b-8192',
    'Gemma 7B IT': 'gemma-7b-it',
    'Mistral Small': 'mistralai/mistral-small-3.2-24b-instruct:free',
    'Deepseek R1 0528 Qwen3 8B': 'deepseek/deepseek-r1-0528-qwen3-8b:free',
    'Deepseek v3': 'deepseek/deepseek-v3-base:free',
    'Llama 4 Maverick (free)': 'meta-llama/llama-4-maverick:free',
    'Gemma 3 27B (free)': 'google/gemma-3-27b-it:free',
    'auto': 'llama3-70b-8192'
  };

  // Auto-select model based on topic complexity
  const selectModel = (topic) => {
    if (model === 'auto') {
      const complexTopics = ['technical', 'scientific', 'research'];
      const topicWords = topic.toLowerCase().split(' ');
      return complexTopics.some(word => topicWords.includes(word)) ? 'llama3-70b-8192' : 'llama3-8b-8192';
    }
    // Map selected model to Groq or OpenRouter model ID
    return groqModelMap[model] || 'llama3-70b-8192';
  };

  // Generate article using selected API
  const generateArticle = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    const selectedModel = selectModel(topic);
    const wordCount = length === 'short' ? 300 : length === 'medium' ? 600 : length === 'long' ? 1000 : parseInt(length) || 300;

    try {
      let response;
      if (model === 'Mistral Small') {
        // Use OpenRouter API for Mistral Small
        response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json",
            // Optionally add Referer and X-Title headers here
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: "user",
                content: `Write a ${wordCount}-word SEO-optimized article on \"${topic}\" with keywords: ${keywords}`
              }
            ]
          })
        });
      } else if (model === 'Deepseek R1 0528 Qwen3 8B') {
        // Use OpenRouter API for Deepseek R1 0528 Qwen3 8B
        response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json",
            // Optionally add Referer and X-Title headers here
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: "user",
                content: `Write a ${wordCount}-word SEO-optimized article on \"${topic}\" with keywords: ${keywords}`
              }
            ]
          })
        });
      } else if (model === 'Deepseek v3') {
        // Use OpenRouter API for Deepseek v3
        response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json",
            // Optionally add Referer and X-Title headers here
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: "user",
                content: `Write a ${wordCount}-word SEO-optimized article on \"${topic}\" with keywords: ${keywords}`
              }
            ]
          })
        });
      } else if (model === 'Llama 4 Maverick (free)') {
        // Use OpenRouter API for Llama 4 Maverick (free)
        response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json",
            // Optionally add Referer and X-Title headers here
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: "user",
                content: `Write a ${wordCount}-word SEO-optimized article on \"${topic}\" with keywords: ${keywords}`
              }
            ]
          })
        });
      } else if (model === 'Gemma 3 27B (free)') {
        // Use OpenRouter API for Gemma 3 27B (free)
        response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json",
            // Optionally add Referer and X-Title headers here
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: "user",
                content: `Write a ${wordCount}-word SEO-optimized article on \"${topic}\" with keywords: ${keywords}`
              }
            ]
          })
        });
      } else {
        // Use Groq API for other models
        response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: "user",
                content: `Write a ${wordCount}-word SEO-optimized article on \"${topic}\" with keywords: ${keywords}`
              }
            ]
          })
        });
      }
      if (!response.ok) {
        let errorText = `API request failed: ${response.status} ${response.statusText}`;
        try {
          const errJson = await response.json();
          if (errJson && errJson.error && errJson.error.message) {
            errorText += ` - ${errJson.error.message}`;
          }
        } catch {}
        throw new Error(errorText);
      }
      const data = await response.json();
      setArticle(
        data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
          ? data.choices[0].message.content
          : 'Generated article content...'
      );
    } catch (err) {
      setError(`Failed to generate article: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all fields handler
  const handleClear = () => {
    setTopic('');
    setKeywords('');
    setLength('short');
    setModel('auto');
    setTone('Neutral');
    setCustomWordError('');
    setArticle('');
    setError(null);
    setImageUrl('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-gray-800 text-white flex flex-col">
      {showLoader ? (
        <div className="flex flex-1 flex-col items-center justify-center min-h-screen animate-fade-in">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-2xl font-bold text-brand-gold drop-shadow">Loading Graphic Shop Article Writer...</h2>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="backdrop-blur bg-gray-950/80 shadow-lg p-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-800 sticky top-0 z-10">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-extrabold text-brand-gold drop-shadow-lg tracking-tight">Graphic Shop Article Writer</h1>
              <p className="text-sm text-gray-300 mt-1">By <span className="font-semibold text-brand-gold">Bilal Hussain</span></p>
            </div>
            <nav className="flex flex-wrap gap-3 md:gap-6 text-brand-gold text-lg font-medium">
              <a href="https://github.com/graphicshop786" className="hover:text-yellow-400 transition" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.behance.net/graphicshop786" className="hover:text-yellow-400 transition" target="_blank" rel="noopener noreferrer">Behance</a>
              <a href="https://www.instagram.com/graphicshop786/" className="hover:text-yellow-400 transition" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/graphicshop786/" className="hover:text-yellow-400 transition" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://pk.linkedin.com/in/graphicshop786" className="hover:text-yellow-400 transition" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 flex flex-col gap-8 justify-center items-start bg-transparent">
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
              <ArticleForm
                topic={topic}
                setTopic={setTopic}
                keywords={keywords}
                setKeywords={setKeywords}
                length={length}
                setLength={setLength}
                model={model}
                setModel={setModel}
                tone={tone}
                setTone={setTone}
                customWordError={customWordError}
                setCustomWordError={setCustomWordError}
                generateArticle={generateArticle}
                isLoading={isLoading}
                error={error}
                supportedModels={Object.keys(groqModelMap).filter(m => m !== 'auto')}
                onClear={handleClear}
              />
              <div className="flex flex-col gap-8 w-full items-center">
                <EditorPanel article={article} setArticle={setArticle} />
                <div className="w-full max-w-2xl flex justify-center">
                  <ExportPanel article={article} />
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="backdrop-blur bg-gray-950/80 border-t border-gray-800 p-6 text-center mt-8 shadow-inner">
            <p className="text-brand-gold font-semibold">© 2025 Graphic Shop by Bilal Hussain. All rights reserved.</p>
            <p className="text-gray-300 mt-1">Contact: <a href="mailto:graphicshop786@gmail.com" className="text-brand-gold underline hover:text-yellow-400" target="_blank" rel="noopener noreferrer">graphicshop786@gmail.com</a> | WhatsApp: <a href="tel:+923401617879" className="text-brand-gold underline hover:text-yellow-400" target="_blank" rel="noopener noreferrer">+92 340 1617879</a></p>
          </footer>
        </>
      )}
    </div>
  );
}
export default App;