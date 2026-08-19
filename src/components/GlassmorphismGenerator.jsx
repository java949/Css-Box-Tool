import React, { useState } from 'react';
import { Layers } from 'lucide-react';

const PRESETS = {
  ru: [
    { name: 'Тёмный Иней', blur: 16, opacity: 0.2, color: '#ffffff', borderOpacity: 0.15, shadow: 0.25 },
    { name: 'Чистый Блеск', blur: 25, opacity: 0.5, color: '#ffffff', borderOpacity: 0.3, shadow: 0.15 },
    { name: 'Неон Кристалл', blur: 12, opacity: 0.25, color: '#6366f1', borderOpacity: 0.4, shadow: 0.35 },
    { name: 'Киберпанк Дым', blur: 20, opacity: 0.35, color: '#ec4899', borderOpacity: 0.2, shadow: 0.4 }
  ],
  en: [
    { name: 'Dark Frosted', blur: 16, opacity: 0.2, color: '#ffffff', borderOpacity: 0.15, shadow: 0.25 },
    { name: 'Apple Clean', blur: 25, opacity: 0.5, color: '#ffffff', borderOpacity: 0.3, shadow: 0.15 },
    { name: 'Neon Crystal', blur: 12, opacity: 0.25, color: '#6366f1', borderOpacity: 0.4, shadow: 0.35 },
    { name: 'Cyber Smoke', blur: 20, opacity: 0.35, color: '#ec4899', borderOpacity: 0.2, shadow: 0.4 }
  ]
};

export default function GlassmorphismGenerator({ onChange, t, lang }) {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(0.2);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [borderOpacity, setBorderOpacity] = useState(0.15);
  const [borderRadius, setBorderRadius] = useState(20);
  const [shadowOpacity, setShadowOpacity] = useState(0.2);

  const hexToRgba = (hex, alpha) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const r = parseInt(c.substring(0, 2), 16) || 0;
    const g = parseInt(c.substring(2, 4), 16) || 0;
    const b = parseInt(c.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const generateCss = () => {
    const bgRgba = hexToRgba(bgColor, opacity);
    const borderRgba = hexToRgba(borderColor, borderOpacity);
    const shadowRgba = `rgba(0, 0, 0, ${shadowOpacity})`;

    return {
      css: `/* Glassmorphism Effect */\nbackground: ${bgRgba};\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: ${borderWidth}px solid ${borderRgba};\nborder-radius: ${borderRadius}px;\nbox-shadow: 0 8px 32px 0 ${shadowRgba};`,
      scss: `// Glassmorphism SCSS\n.glass-card {\n  background: ${bgRgba};\n  backdrop-filter: blur(${blur}px);\n  -webkit-backdrop-filter: blur(${blur}px);\n  border: ${borderWidth}px solid ${borderRgba};\n  border-radius: ${borderRadius}px;\n  box-shadow: 0 8px 32px 0 ${shadowRgba};\n}`,
      tailwind: `bg-[${bgRgba}] backdrop-blur-[${blur}px] border-[${borderWidth}px] border-[${borderRgba}] rounded-[${borderRadius}px] shadow-lg`,
      html: `<div class="glass-card">\n  <h3>Glassmorphism Card</h3>\n  <p>Modern frosted glass visual effect.</p>\n</div>`,
      style: {
        background: bgRgba,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: `${borderWidth}px solid ${borderRgba}`,
        borderRadius: `${borderRadius}px`,
        boxShadow: `0 8px 32px 0 ${shadowRgba}`,
        padding: '30px',
        width: '280px',
        color: '#ffffff',
        textAlign: 'center'
      }
    };
  };

  React.useEffect(() => {
    onChange(generateCss());
  }, [blur, opacity, bgColor, borderWidth, borderColor, borderOpacity, borderRadius, shadowOpacity]);

  const applyPreset = (p) => {
    setBlur(p.blur);
    setOpacity(p.opacity);
    setBgColor(p.color);
    setBorderOpacity(p.borderOpacity);
    setShadowOpacity(p.shadow);
  };

  const currentPresets = PRESETS[lang] || PRESETS.ru;

  return (
    <div className="controls-card">
      <div className="controls-header">
        <div className="controls-title">
          <Layers size={18} color="#8b5cf6" />
          <span>{t.tools.glass.title}</span>
        </div>
      </div>

      <div className="preset-bar">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.presets}</span>
        {currentPresets.map((p, i) => (
          <button key={i} className="preset-chip" onClick={() => applyPreset(p)}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="controls-grid">
        <div className="control-group">
          <label className="control-label">{t.labels.blur} <span className="control-val">{blur}px</span></label>
          <input type="range" min="0" max="50" value={blur} onChange={(e) => setBlur(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.opacity} <span className="control-val">{Math.round(opacity * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.glassBg}</label>
          <div className="color-picker-row">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            <input type="text" className="text-input" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.borderWidth} <span className="control-val">{borderWidth}px</span></label>
          <input type="range" min="0" max="10" value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.borderOpacity} <span className="control-val">{Math.round(borderOpacity * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={borderOpacity} onChange={(e) => setBorderOpacity(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.borderColor}</label>
          <div className="color-picker-row">
            <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
            <input type="text" className="text-input" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.borderRadius} <span className="control-val">{borderRadius}px</span></label>
          <input type="range" min="0" max="50" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.shadowDepth} <span className="control-val">{Math.round(shadowOpacity * 100)}%</span></label>
          <input type="range" min="0" max="1" step="0.01" value={shadowOpacity} onChange={(e) => setShadowOpacity(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
