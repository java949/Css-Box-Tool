import React from 'react';
import { Sparkles, Bookmark, Globe } from 'lucide-react';

export default function Header({ lang, setLang, t, onSavePreset }) {
  const toggleLang = () => {
    setLang(lang === 'ru' ? 'en' : 'ru');
  };

  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-icon">
          <Sparkles size={22} />
        </div>
        <div className="brand-text">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
      </div>

      <div className="header-actions">
        {/* Language Switcher */}
        <button 
          className="btn-secondary"
          onClick={toggleLang}
          title="Switch Language / Переключить язык"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}
        >
          <Globe size={16} />
          <span>{lang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}</span>
        </button>

        <button 
          className="btn-secondary" 
          onClick={onSavePreset}
          title={t.saveStyle}
        >
          <Bookmark size={16} />
          <span>{t.saveStyle}</span>
        </button>
      </div>
    </header>
  );
}
