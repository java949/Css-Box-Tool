import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';

export default function CodeOutputPanel({ cssCode, scssCode, tailwindCode, htmlCode, onCopy, t }) {
  const [activeTab, setActiveTab] = useState('css');
  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    switch (activeTab) {
      case 'scss': return scssCode || cssCode;
      case 'tailwind': return tailwindCode || '/* Tailwind version */';
      case 'html': return htmlCode || '<div className="generated-element">Content</div>';
      default: return cssCode;
    }
  };

  const handleCopyClick = () => {
    const textToCopy = getActiveCode();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    if (onCopy) onCopy(t.copiedToast);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-panel">
      <div className="controls-title" style={{ justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code size={18} color="#6366f1" />
          <span>{t.codeGenerator}</span>
        </span>
      </div>

      <div className="code-tabs">
        <button 
          className={`code-tab ${activeTab === 'css' ? 'active' : ''}`}
          onClick={() => setActiveTab('css')}
        >
          CSS
        </button>
        <button 
          className={`code-tab ${activeTab === 'scss' ? 'active' : ''}`}
          onClick={() => setActiveTab('scss')}
        >
          SCSS
        </button>
        <button 
          className={`code-tab ${activeTab === 'tailwind' ? 'active' : ''}`}
          onClick={() => setActiveTab('tailwind')}
        >
          Tailwind
        </button>
        <button 
          className={`code-tab ${activeTab === 'html' ? 'active' : ''}`}
          onClick={() => setActiveTab('html')}
        >
          HTML
        </button>
      </div>

      <div className="code-box">
        {getActiveCode()}
      </div>

      <button className="btn-primary" onClick={handleCopyClick}>
        {copied ? <Check size={18} /> : <Copy size={18} />}
        <span>{copied ? t.copied : t.copyCode}</span>
      </button>
    </div>
  );
}
