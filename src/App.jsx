import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CodeOutputPanel from './components/CodeOutputPanel';
import PresetLibrary from './components/PresetLibrary';

import BoxShadowGenerator from './components/BoxShadowGenerator';
import GlassmorphismGenerator from './components/GlassmorphismGenerator';
import GradientGenerator from './components/GradientGenerator';
import BorderRadiusGenerator from './components/BorderRadiusGenerator';
import TextEffectsGenerator from './components/TextEffectsGenerator';
import FlexboxGridGenerator from './components/FlexboxGridGenerator';
import AnimationGenerator from './components/AnimationGenerator';
import FilterGenerator from './components/FilterGenerator';

import { translations } from './translations';
import { Eye, Sun, Moon, Grid, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('css_matrix_lang') || 'ru';
  });

  const [activeTool, setActiveTool] = useState('shadow');
  const [bgMode, setBgMode] = useState('dark');
  const [toastMsg, setToastMsg] = useState(null);
  const [generatedData, setGeneratedData] = useState({ css: '', scss: '', tailwind: '', html: '', style: {} });
  const [savedPresets, setSavedPresets] = useState([]);

  const t = translations[lang] || translations.ru;

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('css_matrix_lang', newLang);
  };

  // Load saved presets from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('css_matrix_presets');
      if (stored) setSavedPresets(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSavePreset = () => {
    const currentToolName = t.tools[activeTool]?.name || activeTool;
    const presetName = prompt(t.savePrompt, `${currentToolName} Style`);
    if (!presetName) return;

    const newPreset = {
      id: Date.now(),
      name: presetName,
      toolId: activeTool,
      toolName: currentToolName,
      data: generatedData
    };

    const updated = [newPreset, ...savedPresets];
    setSavedPresets(updated);
    localStorage.setItem('css_matrix_presets', JSON.stringify(updated));
    showToast(t.savedToast);
  };

  const handleDeletePreset = (id) => {
    const updated = savedPresets.filter(p => p.id !== id);
    setSavedPresets(updated);
    localStorage.setItem('css_matrix_presets', JSON.stringify(updated));
    showToast(t.deletedToast);
  };

  const handleLoadPreset = (preset) => {
    setActiveTool(preset.toolId);
    showToast(`${t.loadedToast}${preset.name}`);
  };

  const renderActiveGenerator = () => {
    const props = { onChange: setGeneratedData, t, lang };
    switch (activeTool) {
      case 'shadow': return <BoxShadowGenerator {...props} />;
      case 'glass': return <GlassmorphismGenerator {...props} />;
      case 'gradient': return <GradientGenerator {...props} />;
      case 'radius': return <BorderRadiusGenerator {...props} />;
      case 'text': return <TextEffectsGenerator {...props} />;
      case 'layout': return <FlexboxGridGenerator {...props} />;
      case 'animation': return <AnimationGenerator {...props} />;
      case 'filter': return <FilterGenerator {...props} />;
      default: return <BoxShadowGenerator {...props} />;
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic Keyframes Injection if present */}
      {generatedData.injectKeyframes && (
        <style>{generatedData.injectKeyframes}</style>
      )}

      <Header 
        lang={lang} 
        setLang={handleSetLang} 
        t={t} 
        onSavePreset={handleSavePreset} 
      />

      <main className="main-content">
        {/* Navigation Sidebar */}
        <Sidebar 
          activeTool={activeTool} 
          setActiveTool={setActiveTool} 
          t={t} 
        />

        {/* Center Workspace (Preview + Controls) */}
        <div className="workspace-area">
          {/* Live Preview Canvas */}
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-title">
                <Eye size={18} color="#6366f1" />
                <span>{t.livePreview}</span>
              </div>

              {/* Background Theme Switcher */}
              <div className="bg-controls">
                <button 
                  className={`bg-btn ${bgMode === 'dark' ? 'active' : ''}`}
                  onClick={() => setBgMode('dark')}
                  title="Dark Background"
                >
                  <Moon size={15} />
                </button>
                <button 
                  className={`bg-btn ${bgMode === 'light' ? 'active' : ''}`}
                  onClick={() => setBgMode('light')}
                  title="Light Background"
                >
                  <Sun size={15} />
                </button>
                <button 
                  className={`bg-btn ${bgMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setBgMode('grid')}
                  title="Grid Pattern"
                >
                  <Grid size={15} />
                </button>
                <button 
                  className={`bg-btn ${bgMode === 'mesh' ? 'active' : ''}`}
                  onClick={() => setBgMode('mesh')}
                  title="Gradient Mesh"
                >
                  <Sparkles size={15} />
                </button>
                <button 
                  className={`bg-btn ${bgMode === 'checker' ? 'active' : ''}`}
                  onClick={() => setBgMode('checker')}
                  title="Checkerboard"
                >
                  <ImageIcon size={15} />
                </button>
              </div>
            </div>

            <div className={`preview-stage-viewport bg-mode-${bgMode}`}>
              {generatedData.isLayoutContainer ? (
                <div style={generatedData.style}>
                  {Array.from({ length: generatedData.itemCount || 3 }).map((_, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
                        padding: '16px 24px', 
                        borderRadius: '12px', 
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        textAlign: 'center'
                      }}
                    >
                      Item #{i + 1}
                    </div>
                  ))}
                </div>
              ) : generatedData.textContent ? (
                <div style={generatedData.style}>
                  {generatedData.textContent}
                </div>
              ) : (
                <div style={generatedData.style}>
                  {t.previewObject}
                </div>
              )}
            </div>
          </div>

          {/* Active Control Panel */}
          {renderActiveGenerator()}

          {/* User Saved Presets Library */}
          <PresetLibrary 
            savedPresets={savedPresets}
            onLoadPreset={handleLoadPreset}
            onDeletePreset={handleDeletePreset}
            t={t}
          />
        </div>

        {/* Right Code Inspector Panel */}
        <CodeOutputPanel 
          cssCode={generatedData.css}
          scssCode={generatedData.scss}
          tailwindCode={generatedData.tailwind}
          htmlCode={generatedData.html}
          onCopy={showToast}
          t={t}
        />
      </main>

      {/* Floating Notification Toast */}
      {toastMsg && (
        <div className="toast-notification">
          <Sparkles size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      <footer className="app-footer" dangerouslySetInnerHTML={{ __html: t.footer }} />
    </div>
  );
}
