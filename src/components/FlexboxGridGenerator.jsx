import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';

const PRESETS = {
  ru: [
    { name: 'Центрирование', mode: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, wrap: 'nowrap' },
    { name: 'Навигационная панель', mode: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16, wrap: 'nowrap' },
    { name: 'Сетка 3 Колонки', mode: 'grid', gridCols: 3, gap: 20 },
    { name: 'Вертикальный стек', mode: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', gap: 14, wrap: 'nowrap' }
  ],
  en: [
    { name: 'Perfect Center', mode: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, wrap: 'nowrap' },
    { name: 'Space-Between Nav', mode: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16, wrap: 'nowrap' },
    { name: '3-Column Grid', mode: 'grid', gridCols: 3, gap: 20 },
    { name: 'Vertical Stack', mode: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', gap: 14, wrap: 'nowrap' }
  ]
};

export default function FlexboxGridGenerator({ onChange, t, lang }) {
  const [mode, setMode] = useState('flex');
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('center');
  const [alignItems, setAlignItems] = useState('center');
  const [gap, setGap] = useState(16);
  const [wrap, setWrap] = useState('wrap');
  const [gridCols, setGridCols] = useState(3);
  const [itemCount, setItemCount] = useState(4);

  const generateCss = () => {
    let cssStr = '';
    let styleObj = {};

    if (mode === 'flex') {
      cssStr = `/* CSS Flexbox Layout */\ndisplay: flex;\nflex-direction: ${flexDirection};\njustify-content: ${justifyContent};\nalign-items: ${alignItems};\ngap: ${gap}px;\nflex-wrap: ${wrap};`;
      styleObj = {
        display: 'flex',
        flexDirection: flexDirection,
        justifyContent: justifyContent,
        alignItems: alignItems,
        gap: `${gap}px`,
        flexWrap: wrap,
        width: '100%',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)'
      };
    } else {
      cssStr = `/* CSS Grid Layout */\ndisplay: grid;\ngrid-template-columns: repeat(${gridCols}, 1fr);\ngap: ${gap}px;\nalign-items: ${alignItems};`;
      styleObj = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gap: `${gap}px`,
        alignItems: alignItems,
        width: '100%',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)'
      };
    }

    const itemsHtml = Array.from({ length: itemCount }).map((_, i) => `  <div class="layout-item">Box ${i + 1}</div>`).join('\n');
    const htmlVal = `<div class="container">\n${itemsHtml}\n</div>`;

    return {
      css: cssStr,
      scss: `// SCSS Layout\n.layout-container {\n  ${cssStr.replace(/\/\*.*?\*\/\n/g, '').replace(/\n/g, '\n  ')}\n}`,
      tailwind: mode === 'flex' ? `flex flex-${flexDirection} justify-${justifyContent} items-${alignItems} gap-[${gap}px]` : `grid grid-cols-${gridCols} gap-[${gap}px]`,
      html: htmlVal,
      style: styleObj,
      isLayoutContainer: true,
      itemCount: itemCount
    };
  };

  React.useEffect(() => {
    onChange(generateCss());
  }, [mode, flexDirection, justifyContent, alignItems, gap, wrap, gridCols, itemCount]);

  const applyPreset = (p) => {
    setMode(p.mode);
    if (p.flexDirection) setFlexDirection(p.flexDirection);
    if (p.justifyContent) setJustifyContent(p.justifyContent);
    if (p.alignItems) setAlignItems(p.alignItems);
    if (p.gap !== undefined) setGap(p.gap);
    if (p.wrap) setWrap(p.wrap);
    if (p.gridCols) setGridCols(p.gridCols);
  };

  const currentPresets = PRESETS[lang] || PRESETS.ru;

  return (
    <div className="controls-card">
      <div className="controls-header">
        <div className="controls-title">
          <LayoutGrid size={18} color="#06b6d4" />
          <span>{t.tools.layout.title}</span>
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
          <label className="control-label">{t.labels.layoutMode}</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="flex">Flexbox Container</option>
            <option value="grid">CSS Grid Container</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.previewBlocks} <span className="control-val">{itemCount}</span></label>
          <input type="range" min="2" max="10" value={itemCount} onChange={(e) => setItemCount(Number(e.target.value))} />
        </div>

        <div className="control-group">
          <label className="control-label">{t.labels.gap} <span className="control-val">{gap}px</span></label>
          <input type="range" min="0" max="60" value={gap} onChange={(e) => setGap(Number(e.target.value))} />
        </div>

        {mode === 'flex' ? (
          <>
            <div className="control-group">
              <label className="control-label">{t.labels.flexDir}</label>
              <select value={flexDirection} onChange={(e) => setFlexDirection(e.target.value)}>
                <option value="row">row</option>
                <option value="column">column</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column-reverse">column-reverse</option>
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">{t.labels.justify}</label>
              <select value={justifyContent} onChange={(e) => setJustifyContent(e.target.value)}>
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">{t.labels.align}</label>
              <select value={alignItems} onChange={(e) => setAlignItems(e.target.value)}>
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
                <option value="stretch">stretch</option>
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">{t.labels.wrap}</label>
              <select value={wrap} onChange={(e) => setWrap(e.target.value)}>
                <option value="wrap">wrap</option>
                <option value="nowrap">nowrap</option>
              </select>
            </div>
          </>
        ) : (
          <div className="control-group">
            <label className="control-label">{t.labels.gridCols} <span className="control-val">{gridCols}</span></label>
            <input type="range" min="1" max="6" value={gridCols} onChange={(e) => setGridCols(Number(e.target.value))} />
          </div>
        )}
      </div>
    </div>
  );
}
