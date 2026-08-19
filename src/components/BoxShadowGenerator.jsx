import React, { useState } from 'react';
import { Plus, Trash2, Box } from 'lucide-react';

const PRESETS = {
  ru: [
    {
      name: 'Мягкая глубина',
      shadows: [
        { x: 0, y: 10, blur: 25, spread: -5, color: '#000000', opacity: 0.3, inset: false },
        { x: 0, y: 8, blur: 10, spread: -6, color: '#000000', opacity: 0.2, inset: false }
      ]
    },
    {
      name: 'Неон Кибер',
      shadows: [
        { x: 0, y: 0, blur: 20, spread: 2, color: '#6366f1', opacity: 0.8, inset: false },
        { x: 0, y: 0, blur: 40, spread: 10, color: '#ec4899', opacity: 0.4, inset: false }
      ]
    },
    {
      name: 'Внутреннее свечение',
      shadows: [
        { x: 0, y: 0, blur: 15, spread: 0, color: '#ffffff', opacity: 0.3, inset: true },
        { x: 0, y: 15, blur: 30, spread: 0, color: '#000000', opacity: 0.4, inset: false }
      ]
    },
    {
      name: 'Ретро 3D',
      shadows: [
        { x: 6, y: 6, blur: 0, spread: 0, color: '#6366f1', opacity: 1, inset: false }
      ]
    }
  ],
  en: [
    {
      name: 'Soft Depth',
      shadows: [
        { x: 0, y: 10, blur: 25, spread: -5, color: '#000000', opacity: 0.3, inset: false },
        { x: 0, y: 8, blur: 10, spread: -6, color: '#000000', opacity: 0.2, inset: false }
      ]
    },
    {
      name: 'Neon Glow',
      shadows: [
        { x: 0, y: 0, blur: 20, spread: 2, color: '#6366f1', opacity: 0.8, inset: false },
        { x: 0, y: 0, blur: 40, spread: 10, color: '#ec4899', opacity: 0.4, inset: false }
      ]
    },
    {
      name: 'Inner Glow',
      shadows: [
        { x: 0, y: 0, blur: 15, spread: 0, color: '#ffffff', opacity: 0.3, inset: true },
        { x: 0, y: 15, blur: 30, spread: 0, color: '#000000', opacity: 0.4, inset: false }
      ]
    },
    {
      name: 'Retro 3D',
      shadows: [
        { x: 6, y: 6, blur: 0, spread: 0, color: '#6366f1', opacity: 1, inset: false }
      ]
    }
  ]
};

export default function BoxShadowGenerator({ onChange, t, lang }) {
  const [bgColor, setBgColor] = useState('#1e293b');
  const [borderRadius, setBorderRadius] = useState(16);
  const [shadows, setShadows] = useState([
    { x: 0, y: 10, blur: 25, spread: 0, color: '#6366f1', opacity: 0.35, inset: false }
  ]);

  const hexToRgba = (hex, opacity) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const r = parseInt(c.substring(0, 2), 16) || 0;
    const g = parseInt(c.substring(2, 4), 16) || 0;
    const b = parseInt(c.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const generateCss = () => {
    const shadowStrings = shadows.map(s => {
      const rgba = hexToRgba(s.color, s.opacity);
      const insetStr = s.inset ? 'inset ' : '';
      return `${insetStr}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${rgba}`;
    });

    const shadowVal = shadowStrings.join(',\n  ');

    return {
      css: `/* Box Shadow Effect */\nbackground-color: ${bgColor};\nborder-radius: ${borderRadius}px;\nbox-shadow: \n  ${shadowVal};`,
      scss: `// SCSS Box Shadow\n.box-shadow-card {\n  background-color: ${bgColor};\n  border-radius: ${borderRadius}px;\n  box-shadow: \n    ${shadowVal};\n}`,
      tailwind: `bg-[${bgColor}] rounded-[${borderRadius}px] shadow-[${shadowStrings.join(',')}]`,
      html: `<div class="shadow-box">Box Shadow Preview</div>`,
      style: {
        backgroundColor: bgColor,
        borderRadius: `${borderRadius}px`,
        boxShadow: shadowStrings.join(', '),
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '0.9rem'
      }
    };
  };

  React.useEffect(() => {
    onChange(generateCss());
  }, [shadows, bgColor, borderRadius]);

  const updateShadow = (index, key, value) => {
    const newShadows = [...shadows];
    newShadows[index][key] = value;
    setShadows(newShadows);
  };

  const addShadowLayer = () => {
    setShadows([...shadows, { x: 0, y: 5, blur: 15, spread: 0, color: '#8b5cf6', opacity: 0.4, inset: false }]);
  };

  const removeShadowLayer = (index) => {
    if (shadows.length === 1) return;
    setShadows(shadows.filter((_, i) => i !== index));
  };

  const currentPresets = PRESETS[lang] || PRESETS.ru;

  return (
    <div className="controls-card">
      <div className="controls-header">
        <div className="controls-title">
          <Box size={18} color="#6366f1" />
          <span>{t.tools.shadow.title}</span>
        </div>
        <button className="btn-secondary" onClick={addShadowLayer} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          <Plus size={14} /> {t.tools.shadow.addLayer}
        </button>
      </div>

      <div className="preset-bar">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.presets}</span>
        {currentPresets.map((p, i) => (
          <button key={i} className="preset-chip" onClick={() => setShadows(p.shadows)}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="controls-grid">
        <div className="control-group">
          <label className="control-label">
            <span>{t.labels.cardBg}</span>
            <span className="control-val">{bgColor}</span>
          </label>
          <div className="color-picker-row">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            <input type="text" className="text-input" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">
            <span>{t.labels.borderRadius}</span>
            <span className="control-val">{borderRadius}px</span>
          </label>
          <input type="range" min="0" max="60" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} />
        </div>
      </div>

      {shadows.map((s, idx) => (
        <div key={idx} style={{ 
          background: 'rgba(255,255,255,0.02)', 
          padding: '16px', 
          borderRadius: 'var(--radius-md)', 
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
              {t.tools.shadow.layer}{idx + 1}
            </span>
            {shadows.length > 1 && (
              <button 
                onClick={() => removeShadowLayer(idx)}
                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <div className="controls-grid">
            <div className="control-group">
              <label className="control-label">{t.labels.offsetX} <span className="control-val">{s.x}px</span></label>
              <input type="range" min="-100" max="100" value={s.x} onChange={(e) => updateShadow(idx, 'x', Number(e.target.value))} />
            </div>

            <div className="control-group">
              <label className="control-label">{t.labels.offsetY} <span className="control-val">{s.y}px</span></label>
              <input type="range" min="-100" max="100" value={s.y} onChange={(e) => updateShadow(idx, 'y', Number(e.target.value))} />
            </div>

            <div className="control-group">
              <label className="control-label">{t.labels.blur} <span className="control-val">{s.blur}px</span></label>
              <input type="range" min="0" max="150" value={s.blur} onChange={(e) => updateShadow(idx, 'blur', Number(e.target.value))} />
            </div>

            <div className="control-group">
              <label className="control-label">{t.labels.spread} <span className="control-val">{s.spread}px</span></label>
              <input type="range" min="-50" max="100" value={s.spread} onChange={(e) => updateShadow(idx, 'spread', Number(e.target.value))} />
            </div>

            <div className="control-group">
              <label className="control-label">{t.labels.opacity} <span className="control-val">{Math.round(s.opacity * 100)}%</span></label>
              <input type="range" min="0" max="1" step="0.01" value={s.opacity} onChange={(e) => updateShadow(idx, 'opacity', Number(e.target.value))} />
            </div>

            <div className="control-group">
              <label className="control-label">{t.labels.shadowColor}</label>
              <div className="color-picker-row">
                <input type="color" value={s.color} onChange={(e) => updateShadow(idx, 'color', e.target.value)} />
                <label className="switch-control" style={{ marginLeft: 'auto', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem' }}>{t.labels.inset}</span>
                  <div className={`toggle-switch ${s.inset ? 'active' : ''}`} onClick={() => updateShadow(idx, 'inset', !s.inset)}>
                    <div className="toggle-slider"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
