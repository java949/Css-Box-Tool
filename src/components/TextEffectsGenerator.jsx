import React, { useState } from 'react';
import { Type } from 'lucide-react';

const PRESETS = {
  ru: [
    { name: 'Кибер Неон', effect: 'neon', color1: '#6366f1', color2: '#ec4899', fontPx: 42 },
    { name: 'Градиент Текст', effect: 'gradient', color1: '#8b5cf6', color2: '#06b6d4', fontPx: 48 },
    { name: 'Ретро 3D', effect: '3d', color1: '#ec4899', color2: '#10b981', fontPx: 44 },
    { name: 'Контур Обводка', effect: 'stroke', color1: '#ffffff', color2: '#6366f1', fontPx: 46 }
  ],
  en: [
    { name: 'Cyber Neon', effect: 'neon', color1: '#6366f1', color2: '#ec4899', fontPx: 42 },
    { name: 'Gradient Text', effect: 'gradient', color1: '#8b5cf6', color2: '#06b6d4', fontPx: 48 },
    { name: 'Retro 3D', effect: '3d', color1: '#ec4899', color2: '#10b981', fontPx: 44 },
    { name: 'Stroke Outline', effect: 'stroke', color1: '#ffffff', color2: '#6366f1', fontPx: 46 }
  ]
};

export default function TextEffectsGenerator({ onChange, t, lang }) {
  const [text, setText] = useState('CSS BOX TOOL');
  const [effect, setEffect] = useState('neon');
  const [fontPx, setFontPx] = useState(44);
  const [fontWeight, setFontWeight] = useState(800);
  const [color1, setColor1] = useState('#6366f1');
  const [color2, setColor2] = useState('#ec4899');
  const [glowRadius, setGlowRadius] = useState(25);

  const generateCss = () => {
    let cssStr = `/* Text Effect */\nfont-size: ${fontPx}px;\nfont-weight: ${fontWeight};\nfont-family: 'Plus Jakarta Sans', sans-serif;\n`;
    let inlineStyle = {
      fontSize: `${fontPx}px`,
      fontWeight: fontWeight,
      fontFamily: `'Plus Jakarta Sans', sans-serif`,
      textAlign: 'center'
    };

    if (effect === 'neon') {
      const shadow = `0 0 10px ${color1}, 0 0 20px ${color1}, 0 0 30px ${color1}, 0 0 40px ${color2}, 0 0 ${glowRadius}px ${color2}`;
      cssStr += `color: #ffffff;\ntext-shadow: ${shadow};`;
      inlineStyle.color = '#ffffff';
      inlineStyle.textShadow = shadow;
    } else if (effect === 'gradient') {
      const grad = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
      cssStr += `background: ${grad};\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;`;
      inlineStyle.background = grad;
      inlineStyle.WebkitBackgroundClip = 'text';
      inlineStyle.WebkitTextFillColor = 'transparent';
    } else if (effect === '3d') {
      const textShadow3d = `1px 1px 0 ${color1}, 2px 2px 0 ${color1}, 3px 3px 0 ${color1}, 4px 4px 0 ${color1}, 5px 5px 0 ${color1}, 6px 6px 15px rgba(0,0,0,0.5)`;
      cssStr += `color: #ffffff;\ntext-shadow: ${textShadow3d};`;
      inlineStyle.color = '#ffffff';
      inlineStyle.textShadow = textShadow3d;
    } else if (effect === 'stroke') {
      cssStr += `color: transparent;\n-webkit-text-stroke: 2px ${color1};\nfilter: drop-shadow(0 0 ${glowRadius}px ${color2});`;
      inlineStyle.color = 'transparent';
      inlineStyle.WebkitTextStroke = `2px ${color1}`;
      inlineStyle.filter = `drop-shadow(0 0 ${glowRadius}px ${color2})`;
    }

    return {
      css: cssStr,
      scss: `// SCSS Text Effect\n.text-effect {\n  ${cssStr.replace(/\/\*.*?\*\/\n/g, '').replace(/\n/g, '\n  ')}\n}`,
      tailwind: `text-[${fontPx}px] font-[${fontWeight}]`,
      html: `<h1 class="text-effect">${text}</h1>`,
      style: inlineStyle,
      textContent: text
    };
  };

  React.useEffect(() => {
    onChange(generateCss());
  }, [text, effect, fontPx, fontWeight, color1, color2, glowRadius]);

  const applyPreset = (p) => {
    setEffect(p.effect);
    setColor1(p.color1);
    setColor2(p.color2);
    setFontPx(p.fontPx);
  };

  const currentPresets = PRESETS[lang] || PRESETS.ru;

  return (
    <div className="controls-card">
      <div className="controls-header">
        <div className="controls-title">
          <Type size={18} color="#10b981" />
          <span>{t.tools.text.title}</span>
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
          <label className="control-label">{t.labels.textInput}</label>
          <input type="text" className="text-input" value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.effectType}</label>
          <select value={effect} onChange={(e) => setEffect(e.target.value)}>
            <option value="neon">Neon Glow</option>
            <option value="gradient">Gradient Text</option>
            <option value="3d">3D Depth</option>
            <option value="stroke">Stroke Outline</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.fontSize} <span className="control-val">{fontPx}px</span></label>
          <input type="range" min="18" max="90" value={fontPx} onChange={(e) => setFontPx(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.fontWeight} <span className="control-val">{fontWeight}</span></label>
          <select value={fontWeight} onChange={(e) => setFontWeight(Number(e.target.value))}>
            <option value={400}>Regular (400)</option>
            <option value={600}>Semi-Bold (600)</option>
            <option value={700}>Bold (700)</option>
            <option value={800}>Extra Bold (800)</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.primaryColor}</label>
          <div className="color-picker-row">
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
            <input type="text" className="text-input" value={color1} onChange={(e) => setColor1(e.target.value)} />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.secondaryColor}</label>
          <div className="color-picker-row">
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
            <input type="text" className="text-input" value={color2} onChange={(e) => setColor2(e.target.value)} />
          </div>
        </div>

        {effect !== 'gradient' && (
          <div className="control-group">
            <label className="control-label">{t.labels.glowRadius} <span className="control-val">{glowRadius}px</span></label>
            <input type="range" min="5" max="60" value={glowRadius} onChange={(e) => setGlowRadius(Number(e.target.value))} />
          </div>
        )}
      </div>
    </div>
  );
}
