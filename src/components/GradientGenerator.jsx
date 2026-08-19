import React, { useState } from 'react';
import { Palette, Plus, Trash2 } from 'lucide-react';

const PRESETS = {
  ru: [
    { name: 'Гипер Неон', type: 'linear', angle: 135, stops: [{ color: '#6366f1', pos: 0 }, { color: '#8b5cf6', pos: 50 }, { color: '#ec4899', pos: 100 }] },
    { name: 'Изумрудное Сияние', type: 'linear', angle: 90, stops: [{ color: '#059669', pos: 0 }, { color: '#10b981', pos: 50 }, { color: '#06b6d4', pos: 100 }] },
    { name: 'Закат', type: 'linear', angle: 45, stops: [{ color: '#ff7e5f', pos: 0 }, { color: '#feb47b', pos: 100 }] },
    { name: 'Космос Радиальный', type: 'radial', angle: 0, stops: [{ color: '#311042', pos: 0 }, { color: '#0f172a', pos: 100 }] }
  ],
  en: [
    { name: 'Hyper Neon', type: 'linear', angle: 135, stops: [{ color: '#6366f1', pos: 0 }, { color: '#8b5cf6', pos: 50 }, { color: '#ec4899', pos: 100 }] },
    { name: 'Emerald Aurora', type: 'linear', angle: 90, stops: [{ color: '#059669', pos: 0 }, { color: '#10b981', pos: 50 }, { color: '#06b6d4', pos: 100 }] },
    { name: 'Sunset Bliss', type: 'linear', angle: 45, stops: [{ color: '#ff7e5f', pos: 0 }, { color: '#feb47b', pos: 100 }] },
    { name: 'Cosmic Radial', type: 'radial', angle: 0, stops: [{ color: '#311042', pos: 0 }, { color: '#0f172a', pos: 100 }] }
  ]
};

export default function GradientGenerator({ onChange, t, lang }) {
  const [type, setType] = useState('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState([
    { color: '#6366f1', pos: 0 },
    { color: '#ec4899', pos: 100 }
  ]);

  const generateGradientStr = () => {
    const sorted = [...stops].sort((a, b) => a.pos - b.pos);
    const stopStrs = sorted.map(s => `${s.color} ${s.pos}%`).join(', ');

    if (type === 'linear') {
      return `linear-gradient(${angle}deg, ${stopStrs})`;
    } else if (type === 'radial') {
      return `radial-gradient(circle at center, ${stopStrs})`;
    } else {
      return `conic-gradient(from ${angle}deg at 50% 50%, ${stopStrs})`;
    }
  };

  const generateCss = () => {
    const gradient = generateGradientStr();
    return {
      css: `/* CSS Gradient Background */\nbackground: ${stops[0].color};\nbackground: ${gradient};`,
      scss: `// SCSS Gradient\n.gradient-bg {\n  background: ${gradient};\n}`,
      tailwind: `bg-[${gradient.replace(/\s+/g, '_')}]`,
      html: `<div class="gradient-box">Gradient Element</div>`,
      style: {
        background: gradient,
        width: '260px',
        height: '260px',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
      }
    };
  };

  React.useEffect(() => {
    onChange(generateCss());
  }, [type, angle, stops]);

  const updateStop = (idx, key, val) => {
    const newStops = [...stops];
    newStops[idx][key] = val;
    setStops(newStops);
  };

  const addStop = () => {
    if (stops.length >= 5) return;
    setStops([...stops, { color: '#06b6d4', pos: 50 }]);
  };

  const removeStop = (idx) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== idx));
  };

  const applyPreset = (p) => {
    setType(p.type);
    setAngle(p.angle);
    setStops(p.stops);
  };

  const currentPresets = PRESETS[lang] || PRESETS.ru;

  return (
    <div className="controls-card">
      <div className="controls-header">
        <div className="controls-title">
          <Palette size={18} color="#ec4899" />
          <span>{t.tools.gradient.title}</span>
        </div>
        <button className="btn-secondary" onClick={addStop} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          <Plus size={14} /> {t.tools.gradient.addColor}
        </button>
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
          <label className="control-label">{t.labels.gradientType}</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
            <option value="conic">Conic</option>
          </select>
        </div>

        {type !== 'radial' && (
          <div className="control-group">
            <label className="control-label">{t.labels.angle} <span className="control-val">{angle}°</span></label>
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>{t.tools.gradient.colorPoints}</span>
        {stops.map((stop, idx) => (
          <div key={idx} className="color-picker-row" style={{ background: 'var(--bg-input)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
            <input type="color" value={stop.color} onChange={(e) => updateStop(idx, 'color', e.target.value)} />
            <input type="range" min="0" max="100" value={stop.pos} onChange={(e) => updateStop(idx, 'pos', Number(e.target.value))} style={{ flex: 1 }} />
            <span className="control-val">{stop.pos}%</span>
            {stops.length > 2 && (
              <button onClick={() => removeStop(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
