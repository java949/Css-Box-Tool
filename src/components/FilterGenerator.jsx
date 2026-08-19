import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

const PRESETS = {
  ru: [
    { name: 'Кибер Матрица', blur: 0, brightness: 120, contrast: 140, grayscale: 0, hueRotate: 120, invert: 0, saturate: 200, sepia: 0 },
    { name: 'Винтаж Пленка', blur: 0, brightness: 90, contrast: 110, grayscale: 20, hueRotate: 0, invert: 0, saturate: 80, sepia: 50 },
    { name: 'Нуар Монохром', blur: 0, brightness: 100, contrast: 180, grayscale: 100, hueRotate: 0, invert: 0, saturate: 0, sepia: 0 },
    { name: 'Мягкое Свечение', blur: 4, brightness: 115, contrast: 105, grayscale: 0, hueRotate: 45, invert: 0, saturate: 160, sepia: 0 }
  ],
  en: [
    { name: 'Cyber Matrix', blur: 0, brightness: 120, contrast: 140, grayscale: 0, hueRotate: 120, invert: 0, saturate: 200, sepia: 0 },
    { name: 'Vintage Film', blur: 0, brightness: 90, contrast: 110, grayscale: 20, hueRotate: 0, invert: 0, saturate: 80, sepia: 50 },
    { name: 'Noir Monochrome', blur: 0, brightness: 100, contrast: 180, grayscale: 100, hueRotate: 0, invert: 0, saturate: 0, sepia: 0 },
    { name: 'Dreamy Glow', blur: 4, brightness: 115, contrast: 105, grayscale: 0, hueRotate: 45, invert: 0, saturate: 160, sepia: 0 }
  ]
};

export default function FilterGenerator({ onChange, t, lang }) {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);
  const [invert, setInvert] = useState(0);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);

  const generateFilterStr = () => {
    const filters = [];
    if (blur > 0) filters.push(`blur(${blur}px)`);
    if (brightness !== 100) filters.push(`brightness(${brightness}%)`);
    if (contrast !== 100) filters.push(`contrast(${contrast}%)`);
    if (grayscale > 0) filters.push(`grayscale(${grayscale}%)`);
    if (hueRotate > 0) filters.push(`hue-rotate(${hueRotate}deg)`);
    if (invert > 0) filters.push(`invert(${invert}%)`);
    if (saturate !== 100) filters.push(`saturate(${saturate}%)`);
    if (sepia > 0) filters.push(`sepia(${sepia}%)`);

    return filters.length > 0 ? filters.join(' ') : 'none';
  };

  const generateCss = () => {
    const filterStr = generateFilterStr();
    return {
      css: `/* CSS Filter Effects */\nfilter: ${filterStr};`,
      scss: `// SCSS Filter\n.filtered-element {\n  filter: ${filterStr};\n}`,
      tailwind: `filter ${filterStr !== 'none' ? `[filter:${filterStr.replace(/\s+/g, '_')}]` : ''}`,
      html: `<img class="filtered-element" src="image.jpg" alt="Filter preview" />`,
      style: {
        filter: filterStr,
        width: '260px',
        height: '260px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
      }
    };
  };

  React.useEffect(() => {
    onChange(generateCss());
  }, [blur, brightness, contrast, grayscale, hueRotate, invert, saturate, sepia]);

  const applyPreset = (p) => {
    setBlur(p.blur);
    setBrightness(p.brightness);
    setContrast(p.contrast);
    setGrayscale(p.grayscale);
    setHueRotate(p.hueRotate);
    setInvert(p.invert);
    setSaturate(p.saturate);
    setSepia(p.sepia);
  };

  const currentPresets = PRESETS[lang] || PRESETS.ru;

  return (
    <div className="controls-card">
      <div className="controls-header">
        <div className="controls-title">
          <Sliders size={18} color="#ec4899" />
          <span>{t.tools.filter.title}</span>
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
          <input type="range" min="0" max="25" value={blur} onChange={(e) => setBlur(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.brightness} <span className="control-val">{brightness}%</span></label>
          <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.contrast} <span className="control-val">{contrast}%</span></label>
          <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.grayscale} <span className="control-val">{grayscale}%</span></label>
          <input type="range" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.hueRotate} <span className="control-val">{hueRotate}°</span></label>
          <input type="range" min="0" max="360" value={hueRotate} onChange={(e) => setHueRotate(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.invert} <span className="control-val">{invert}%</span></label>
          <input type="range" min="0" max="100" value={invert} onChange={(e) => setInvert(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.saturate} <span className="control-val">{saturate}%</span></label>
          <input type="range" min="0" max="300" value={saturate} onChange={(e) => setSaturate(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.sepia} <span className="control-val">{sepia}%</span></label>
          <input type="range" min="0" max="100" value={sepia} onChange={(e) => setSepia(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
