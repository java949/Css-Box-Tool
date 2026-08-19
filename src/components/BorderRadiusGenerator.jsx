import React, { useState } from 'react';
import { CircleDot } from 'lucide-react';

const PRESETS = {
  ru: [
    { name: 'Органический Блоб', tlX: 60, trX: 40, brX: 30, blX: 70, tlY: 40, trY: 60, brY: 70, blY: 30 },
    { name: 'Жидкий Щит', tlX: 50, trX: 50, brX: 20, blX: 20, tlY: 80, trY: 80, brY: 20, blY: 20 },
    { name: 'Форма Яйца', tlX: 50, trX: 50, brX: 50, blX: 50, tlY: 60, trY: 60, brY: 40, blY: 40 },
    { name: 'Абстрактный Камень', tlX: 30, trX: 70, brX: 70, blX: 30, tlY: 30, trY: 30, brY: 70, blY: 70 }
  ],
  en: [
    { name: 'Organic Blob', tlX: 60, trX: 40, brX: 30, blX: 70, tlY: 40, trY: 60, brY: 70, blY: 30 },
    { name: 'Liquid Shield', tlX: 50, trX: 50, brX: 20, blX: 20, tlY: 80, trY: 80, brY: 20, blY: 20 },
    { name: 'Egg Shape', tlX: 50, trX: 50, brX: 50, blX: 50, tlY: 60, trY: 60, brY: 40, blY: 40 },
    { name: 'Abstract Pebble', tlX: 30, trX: 70, brX: 70, blX: 30, tlY: 30, trY: 30, brY: 70, blY: 70 }
  ]
};

export default function BorderRadiusGenerator({ onChange, t, lang }) {
  const [tlX, setTlX] = useState(60);
  const [trX, setTrX] = useState(40);
  const [brX, setBrX] = useState(30);
  const [blX, setBlX] = useState(70);

  const [tlY, setTlY] = useState(40);
  const [trY, setTrY] = useState(60);
  const [brY, setBrY] = useState(70);
  const [blY, setBlY] = useState(30);

  const [animate, setAnimate] = useState(false);
  const [bgColor, setBgColor] = useState('#6366f1');

  const borderRadiusVal = `${tlX}% ${trX}% ${brX}% ${blX}% / ${tlY}% ${trY}% ${brY}% ${blY}%`;

  const generateCss = () => {
    const keyframesCss = `@keyframes morphBlob {\n  0%, 100% {\n    border-radius: ${borderRadiusVal};\n  }\n  50% {\n    border-radius: ${trX}% ${tlX}% ${blX}% ${brX}% / ${trY}% ${tlY}% ${blY}% ${brY}%;\n  }\n}`;

    const cssVal = animate
      ? `/* Fluid Morphing Blob */\nbackground-color: ${bgColor};\nborder-radius: ${borderRadiusVal};\nanimation: morphBlob 8s ease-in-out infinite;\n\n${keyframesCss}`
      : `/* CSS Organic Blob Shape */\nbackground-color: ${bgColor};\nborder-radius: ${borderRadiusVal};`;

    return {
      css: cssVal,
      scss: `// SCSS Blob Shape\n.blob-element {\n  background-color: ${bgColor};\n  border-radius: ${borderRadiusVal};\n  ${animate ? 'animation: morphBlob 8s ease-in-out infinite;' : ''}\n}`,
      tailwind: `rounded-[${borderRadiusVal.replace(/\s+/g, '_')}] bg-[${bgColor}]`,
      html: `<div class="blob-shape">Blob</div>`,
      style: {
        backgroundColor: bgColor,
        borderRadius: borderRadiusVal,
        width: '240px',
        height: '240px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        transition: animate ? 'none' : 'border-radius 0.3s ease',
        boxShadow: '0 15px 35px rgba(99, 102, 241, 0.4)'
      }
    };
  };

  React.useEffect(() => {
    onChange(generateCss());
  }, [tlX, trX, brX, blX, tlY, trY, brY, blY, animate, bgColor]);

  const applyPreset = (p) => {
    setTlX(p.tlX); setTrX(p.trX); setBrX(p.brX); setBlX(p.blX);
    setTlY(p.tlY); setTrY(p.trY); setBrY(p.brY); setBlY(p.blY);
  };

  const currentPresets = PRESETS[lang] || PRESETS.ru;

  return (
    <div className="controls-card">
      <div className="controls-header">
        <div className="controls-title">
          <CircleDot size={18} color="#06b6d4" />
          <span>{t.tools.radius.title}</span>
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
          <label className="control-label">{t.labels.shapeBg}</label>
          <div className="color-picker-row">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            <label className="switch-control" style={{ marginLeft: 'auto', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem' }}>{t.tools.radius.morphAnim}</span>
              <div className={`toggle-switch ${animate ? 'active' : ''}`} onClick={() => setAnimate(!animate)}>
                <div className="toggle-slider"></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="controls-grid">
        <div className="control-group">
          <label className="control-label">Top Left X <span className="control-val">{tlX}%</span></label>
          <input type="range" min="0" max="100" value={tlX} onChange={(e) => setTlX(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">Top Right X <span className="control-val">{trX}%</span></label>
          <input type="range" min="0" max="100" value={trX} onChange={(e) => setTrX(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">Bottom Right X <span className="control-val">{brX}%</span></label>
          <input type="range" min="0" max="100" value={brX} onChange={(e) => setBrX(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">Bottom Left X <span className="control-val">{blX}%</span></label>
          <input type="range" min="0" max="100" value={blX} onChange={(e) => setBlX(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">Top Left Y <span className="control-val">{tlY}%</span></label>
          <input type="range" min="0" max="100" value={tlY} onChange={(e) => setTlY(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">Top Right Y <span className="control-val">{trY}%</span></label>
          <input type="range" min="0" max="100" value={trY} onChange={(e) => setTrY(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">Bottom Right Y <span className="control-val">{brY}%</span></label>
          <input type="range" min="0" max="100" value={brY} onChange={(e) => setBrY(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">Bottom Left Y <span className="control-val">{blY}%</span></label>
          <input type="range" min="0" max="100" value={blY} onChange={(e) => setBlY(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
