import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';

const ANIMATIONS = {
  pulse: {
    name: { ru: 'Пульсация (Pulse)', en: 'Pulse Glow' },
    keyframes: `@keyframes pulseGlow {\n  0%, 100% {\n    transform: scale(1);\n    box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);\n  }\n  50% {\n    transform: scale(1.08);\n    box-shadow: 0 0 45px rgba(236, 72, 153, 0.8);\n  }\n}`
  },
  bounce: {
    name: { ru: 'Прыжок (Bounce)', en: 'Bounce Jump' },
    keyframes: `@keyframes bounceJump {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-25px);\n  }\n}`
  },
  spin: {
    name: { ru: 'Вращение (Spin)', en: 'Continuous Spin' },
    keyframes: `@keyframes continuousSpin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}`
  },
  float: {
    name: { ru: 'Парение (Float)', en: 'Floating Levitate' },
    keyframes: `@keyframes floatingLevitate {\n  0%, 100% {\n    transform: translateY(0px) rotate(0deg);\n  }\n  50% {\n    transform: translateY(-15px) rotate(3deg);\n  }\n}`
  },
  shake: {
    name: { ru: 'Тряска (Shake)', en: 'Haptic Shake' },
    keyframes: `@keyframes hapticShake {\n  0%, 100% { transform: translateX(0); }\n  20%, 60% { transform: translateX(-10px); }\n  40%, 80% { transform: translateX(10px); }\n}`
  }
};

export default function AnimationGenerator({ onChange, t, lang }) {
  const [animKey, setAnimKey] = useState('float');
  const [duration, setDuration] = useState(3);
  const [easing, setEasing] = useState('ease-in-out');
  const [iteration, setIteration] = useState('infinite');
  const [bgColor, setBgColor] = useState('#6366f1');

  const selectedAnim = ANIMATIONS[animKey];

  const generateCss = () => {
    const animationProperty = `${animKey} ${duration}s ${easing} ${iteration}`;
    const cssCode = `/* CSS Keyframe Animation */\nbackground-color: ${bgColor};\nanimation: ${animationProperty};\n\n${selectedAnim.keyframes.replace(/pulseGlow|bounceJump|continuousSpin|floatingLevitate|hapticShake/g, animKey)}`;

    return {
      css: cssCode,
      scss: `// SCSS Animation\n.animated-box {\n  background-color: ${bgColor};\n  animation: ${animationProperty};\n}\n\n${selectedAnim.keyframes.replace(/pulseGlow|bounceJump|continuousSpin|floatingLevitate|hapticShake/g, animKey)}`,
      tailwind: `animate-[${animKey}_${duration}s_${easing}_${iteration}]`,
      html: `<div class="animated-box">Animated Card</div>`,
      style: {
        backgroundColor: bgColor,
        width: '200px',
        height: '200px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        animation: animationProperty,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      },
      injectKeyframes: selectedAnim.keyframes.replace(/pulseGlow|bounceJump|continuousSpin|floatingLevitate|hapticShake/g, animKey)
    };
  };

  React.useEffect(() => {
    onChange(generateCss());
  }, [animKey, duration, easing, iteration, bgColor]);

  return (
    <div className="controls-card">
      <div className="controls-header">
        <div className="controls-title">
          <PlayCircle size={18} color="#8b5cf6" />
          <span>{t.tools.animation.title}</span>
        </div>
      </div>

      <div className="preset-bar">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.presets}</span>
        {Object.keys(ANIMATIONS).map((k) => (
          <button 
            key={k} 
            className={`preset-chip ${animKey === k ? 'active' : ''}`}
            onClick={() => setAnimKey(k)}
          >
            {ANIMATIONS[k].name[lang] || ANIMATIONS[k].name.ru}
          </button>
        ))}
      </div>

      <div className="controls-grid">
        <div className="control-group">
          <label className="control-label">{t.labels.objectColor}</label>
          <div className="color-picker-row">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            <input type="text" className="text-input" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.duration} <span className="control-val">{duration}s</span></label>
          <input type="range" min="0.2" max="10" step="0.1" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.easing}</label>
          <select value={easing} onChange={(e) => setEasing(e.target.value)}>
            <option value="ease">ease</option>
            <option value="ease-in-out">ease-in-out</option>
            <option value="linear">linear</option>
            <option value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">cubic-bezier (Bounce)</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.iteration}</label>
          <select value={iteration} onChange={(e) => setIteration(e.target.value)}>
            <option value="infinite">infinite</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
    </div>
  );
}
