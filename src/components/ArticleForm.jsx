import React, { useState, useRef, useEffect } from 'react';

// Article Form Component
// Button style helpers
const BUTTON_CLASSES = {
  primary: 'bg-brand-gold text-black font-bold shadow hover:bg-yellow-400 focus:ring-2 focus:ring-brand-gold',
  secondary: 'bg-gray-700 text-white font-bold shadow hover:bg-gray-600 focus:ring-2 focus:ring-brand-gold',
  danger: 'bg-red-700 text-white font-bold shadow hover:bg-red-600 focus:ring-2 focus:ring-red-400',
};

function ArticleForm({
  topic, setTopic,
  keywords, setKeywords,
  length, setLength,
  model, setModel,
  tone, setTone,
  generateArticle,
  isLoading,
  error,
  supportedModels,
  customWordError,
  setCustomWordError,
  onClear
}) {
  const [showModelInfo, setShowModelInfo] = useState(false);

  const modelDescriptions = {
    'Llama 3 8B': 'Fast, general-purpose, good for most topics.',
    'Llama 3 70B': 'High quality, best for complex or technical topics.',
    'Gemma 7B IT': 'Google model, good for informative and technical writing.',
    'Mistral Small': 'Efficient, good for short and simple articles.',
    'Deepseek R1 0528 Qwen3 8B': 'Great for research and technical content.',
    'Deepseek v3': 'Latest Deepseek, strong for reasoning and detail.',
    'Llama 4 Maverick (free)': 'Newest Llama, strong general performance.',
    'Gemma 3 27B (free)': 'Large Google model, excels at long-form and creative writing.'
  };

  // Field refs for accessibility and autofocus
  const topicRef = useRef(null);
  const keywordsRef = useRef(null);
  const lengthRef = useRef(null);
  const toneRef = useRef(null);
  const modelRef = useRef(null);

  // Field error states
  const [topicError, setTopicError] = useState('');
  const [keywordsError, setKeywordsError] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [toneError, setToneError] = useState('');

  // Autofocus first field
  useEffect(() => {
    if (topicRef.current) topicRef.current.focus();
  }, []);

  // Validation on blur
  const validateTopic = () => {
    if (!topic?.trim()) setTopicError('Topic is required.');
    else setTopicError('');
  };
  const validateKeywords = () => {
    if (!keywords?.trim()) setKeywordsError('Keywords are required.');
    else setKeywordsError('');
  };
  const validateLength = () => {
    if (length === 'custom' && !!customWordError) setLengthError(customWordError);
    else if (typeof length === 'number' && (length < 100 || length > 5000)) setLengthError('Word count must be between 100 and 5000.');
    else setLengthError('');
  };
  const validateTone = () => {
    if (!tone) setToneError('Tone is required.');
    else setToneError('');
  };

  const handleCustomWordChange = (e) => {
    const val = e.target.value;
    if (!val || isNaN(val) || parseInt(val, 10) < 100 || parseInt(val, 10) > 5000) {
      setCustomWordError('Word count must be between 100 and 5000.');
      setLength(300);
    } else {
      setCustomWordError('');
      setLength(parseInt(val, 10));
    }
  };

  // (removed duplicate isFormInvalid declaration)

  // ...existing code...
  // Helper for required field check
  const isFormInvalid =
    !topic?.trim() ||
    !keywords?.trim() ||
    (length === 'custom' && !!customWordError) ||
    (typeof length === 'number' && (length < 100 || length > 5000)) ||
    !tone;

  // ...existing code...

  // Responsive, grouped, accessible, animated, themed, error-handling form
  return (
    <form className="w-full max-w-2xl mx-auto bg-gray-900/70 dark:bg-white/80 backdrop-blur-lg shadow-xl p-6 rounded-2xl border border-gray-800 dark:border-gray-200 transition-colors duration-300 flex flex-col items-center justify-center" aria-label="Article Settings Panel">
      <h2 className="text-2xl font-bold text-brand-gold mb-6 tracking-tight drop-shadow flex items-center gap-2">
        Article Settings
        <span className="ml-1 text-base text-gray-400" title="Configure your article preferences here.">
          <i className="fas fa-info-circle"></i>
        </span>
      </h2>
      {/* Content Section */}
      <fieldset className="mb-8" aria-labelledby="content-section-title">
        <legend id="content-section-title" className="text-lg font-semibold text-brand-gold mb-2 flex items-center gap-2">
          <i className="fas fa-file-alt"></i> Content
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-900 flex items-center gap-1" htmlFor="topic-input">
              Topic
              <button type="button" tabIndex={0} aria-label="What is the main subject of your article?" className="ml-1 text-xs text-gray-400 hover:text-brand-gold focus:outline-none" title="What is the main subject of your article?">
                <i className="fas fa-question-circle"></i>
              </button>
            </label>
            <input
              id="topic-input"
              ref={topicRef}
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onBlur={validateTopic}
              className={`w-full p-3 bg-gray-800 dark:bg-white border rounded-lg text-white dark:text-black focus:ring-2 focus:ring-brand-gold focus:outline-none transition ${topicError ? 'border-red-500' : topic?.trim() ? 'border-green-500' : 'border-gray-700'}`}
              placeholder="Enter article topic"
              aria-describedby="topic-help topic-error"
              required
              tabIndex={0}
            />
            <div id="topic-help" className="text-xs text-gray-400 mt-1" aria-live="polite">E.g. "The Future of AI in Healthcare"</div>
            {topicError && <div id="topic-error" className="text-xs text-red-500 mt-1 animate-fade-in" aria-live="assertive">{topicError}</div>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-900 flex items-center gap-1" htmlFor="keywords-input">
              Keywords
              <button type="button" tabIndex={0} aria-label="Comma-separated keywords to guide the article content." className="ml-1 text-xs text-gray-400 hover:text-brand-gold focus:outline-none" title="Comma-separated keywords to guide the article content.">
                <i className="fas fa-question-circle"></i>
              </button>
            </label>
            <input
              id="keywords-input"
              ref={keywordsRef}
              type="text"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              onBlur={validateKeywords}
              className={`w-full p-3 bg-gray-800 dark:bg-white border rounded-lg text-white dark:text-black focus:ring-2 focus:ring-brand-gold focus:outline-none transition ${keywordsError ? 'border-red-500' : keywords?.trim() ? 'border-green-500' : 'border-gray-700'}`}
              placeholder="Enter keywords (comma-separated)"
              aria-describedby="keywords-help keywords-error"
              required
              tabIndex={0}
            />
            <div id="keywords-help" className="text-xs text-gray-400 mt-1" aria-live="polite">E.g. "AI, healthcare, future, technology"</div>
            {keywordsError && <div id="keywords-error" className="text-xs text-red-500 mt-1 animate-fade-in" aria-live="assertive">{keywordsError}</div>}
          </div>
        </div>
      </fieldset>
      {/* Style Section */}
      <fieldset className="mb-8" aria-labelledby="style-section-title">
        <legend id="style-section-title" className="text-lg font-semibold text-brand-gold mb-2 flex items-center gap-2">
          <i className="fas fa-palette"></i> Style
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-900 flex items-center gap-1" htmlFor="length-select">
              Article Length
              <button type="button" tabIndex={0} aria-label="Choose a preset or enter a custom word count." className="ml-1 text-xs text-gray-400 hover:text-brand-gold focus:outline-none" title="Choose a preset or enter a custom word count.">
                <i className="fas fa-ruler-horizontal"></i>
              </button>
            </label>
            <select
              id="length-select"
              ref={lengthRef}
              value={length === 'short' || length === 'medium' || length === 'long' ? length : 'custom'}
              onChange={e => {
                if (e.target.value === 'custom') {
                  if (typeof length !== 'number') setLength(300);
                } else {
                  setLength(e.target.value);
                }
              }}
              onBlur={validateLength}
              className={`w-full p-3 bg-gray-800 dark:bg-white border rounded-lg text-white dark:text-black focus:ring-2 focus:ring-brand-gold focus:outline-none transition ${(lengthError || customWordError) ? 'border-red-500' : (length === 'short' || length === 'medium' || length === 'long' || (typeof length === 'number' && length >= 100 && length <= 5000)) ? 'border-green-500' : 'border-gray-700'}`}
              aria-describedby="length-help length-error"
              required
              tabIndex={0}
            >
              <option value="short">Short (~300 words)</option>
              <option value="medium">Medium (~600 words)</option>
              <option value="long">Long (~1000 words)</option>
              <option value="custom">Custom</option>
            </select>
            {!(length === 'short' || length === 'medium' || length === 'long') && (
              <>
                <input
                  type="number"
                  value={typeof length === 'number' ? length : 300}
                  onChange={handleCustomWordChange}
                  onBlur={validateLength}
                  className={`w-full p-3 bg-gray-800 dark:bg-white border ${customWordError ? 'border-red-500' : 'border-green-500'} rounded-lg text-white dark:text-black mt-2 focus:ring-2 focus:ring-brand-gold focus:outline-none transition`}
                  placeholder="Enter word count"
                  min="100"
                  max="5000"
                  aria-describedby="custom-word-help length-error"
                  required
                  tabIndex={0}
                />
                <div id="custom-word-help" className="text-xs text-red-400 mt-1" aria-live="polite">{customWordError || 'Word count must be between 100 and 5000.'}</div>
              </>
            )}
            {lengthError && <div id="length-error" className="text-xs text-red-500 mt-1 animate-fade-in" aria-live="assertive">{lengthError}</div>}
            <div id="length-help" className="text-xs text-gray-400 mt-1" aria-live="polite">Choose a preset or enter a custom word count.</div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-900 flex items-center gap-1" htmlFor="tone-select">
              Article Tone
              <button type="button" tabIndex={0} aria-label="Choose the style or mood for your article." className="ml-1 text-xs text-gray-400 hover:text-brand-gold focus:outline-none" title="Choose the style or mood for your article.">
                <i className="fas fa-palette"></i>
              </button>
            </label>
            <select
              id="tone-select"
              ref={toneRef}
              value={tone}
              onChange={e => setTone(e.target.value)}
              onBlur={validateTone}
              className={`w-full p-3 bg-gray-800 dark:bg-white border ${toneError ? 'border-red-500' : tone ? 'border-green-500' : 'border-gray-700'} rounded-lg text-white dark:text-black focus:ring-2 focus:ring-brand-gold focus:outline-none transition`}
              aria-describedby="tone-help tone-error"
              required
              tabIndex={0}
            >
              <option value="Neutral">Neutral</option>
              <option value="Formal">Formal</option>
              <option value="Friendly">Friendly</option>
              <option value="Technical">Technical</option>
              <option value="Persuasive">Persuasive</option>
              <option value="Creative">Creative</option>
            </select>
            {toneError && <div id="tone-error" className="text-xs text-red-500 mt-1 animate-fade-in" aria-live="assertive">{toneError}</div>}
            <div id="tone-help" className="text-xs text-gray-400 mt-1" aria-live="polite">Choose the tone/style for your article.</div>
          </div>
        </div>
      </fieldset>
      {/* AI Settings Section */}
      <fieldset className="mb-8" aria-labelledby="ai-section-title">
        <legend id="ai-section-title" className="text-lg font-semibold text-brand-gold mb-2 flex items-center gap-2">
          <i className="fas fa-robot"></i> AI Settings
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-900 flex items-center gap-1" htmlFor="model-select">
              AI Model
              <button type="button" tabIndex={0} aria-label="Learn more about the selected model" className="ml-1 text-xs text-gray-400 hover:text-brand-gold focus:outline-none" title="Learn more about the selected model"
                onMouseEnter={() => setShowModelInfo(true)}
                onMouseLeave={() => setShowModelInfo(false)}
                onFocus={() => setShowModelInfo(true)}
                onBlur={() => setShowModelInfo(false)}
              >
                <i className="fas fa-info-circle"></i>
              </button>
            </label>
            <select
              id="model-select"
              ref={modelRef}
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full p-3 bg-gray-800 dark:bg-white border border-gray-700 dark:border-gray-300 rounded-lg text-white dark:text-black focus:ring-2 focus:ring-brand-gold focus:outline-none transition"
              aria-describedby="model-help"
              required
              tabIndex={0}
            >
              <option value="auto">Auto-Select</option>
              {Array.isArray(supportedModels) && supportedModels.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <div id="model-help" className="text-xs text-gray-400 mt-1" aria-live="polite">Select an AI model or use auto-select for best match.</div>
            {showModelInfo && (
              <div className="absolute z-20 left-0 mt-2 w-72 bg-gray-900 dark:bg-white border border-gray-700 dark:border-gray-300 rounded-lg shadow-lg p-4 text-xs text-gray-900 dark:text-gray-900 animate-fade-in" style={{animation: 'fadeIn 0.2s'}}>
                <strong className="block mb-1 text-brand-gold">Model Info</strong>
                {modelDescriptions[model] || 'No description.'}
              </div>
            )}
          </div>
        </div>
      </fieldset>
      {/* Form Actions */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button
          type="button"
          onClick={onClear}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold ${BUTTON_CLASSES.secondary}`}
          aria-label="Clear form"
          title="Clear all fields"
          tabIndex={0}
        >
          <i className="fas fa-trash"></i>
          <span className="hidden md:inline">Clear</span>
        </button>
        <button
          type="submit"
          onClick={e => { e.preventDefault(); generateArticle(); }}
          disabled={isLoading || isFormInvalid}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold ${BUTTON_CLASSES.primary} ${isLoading || isFormInvalid ? 'opacity-60 cursor-not-allowed' : ''}`}
          aria-label="Generate Article"
          aria-disabled={isLoading || isFormInvalid}
          tabIndex={0}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
          ) : null}
          {isLoading ? 'Generating...' : 'Generate Article'}
        </button>
      </div>
      {/* Global error */}
      {error && <p className="text-red-400 mt-4 font-medium bg-red-900/30 p-2 rounded-lg border border-red-700" role="alert" aria-live="polite">{error}</p>}
      {/* Theme toggle (demo) */}
      <div className="mt-8 flex justify-end">
        <button type="button" className="text-xs px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-400 dark:border-gray-700 hover:bg-brand-gold hover:text-black transition" onClick={() => {
          document.documentElement.classList.toggle('dark');
        }} aria-label="Toggle dark/light theme">
          <i className="fas fa-adjust"></i> Toggle Theme
        </button>
      </div>
    </form>
  );
}

export default ArticleForm;