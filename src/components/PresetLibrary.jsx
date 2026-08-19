import React from 'react';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';

export default function PresetLibrary({ savedPresets, onLoadPreset, onDeletePreset, t }) {
  if (!savedPresets || savedPresets.length === 0) return null;

  return (
    <div className="controls-card" style={{ marginTop: '20px' }}>
      <div className="controls-header">
        <div className="controls-title">
          <Bookmark size={18} color="#10b981" />
          <span>{t.myLibrary} ({savedPresets.length})</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
        {savedPresets.map((preset) => (
          <div 
            key={preset.id}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {preset.name}
              </span>
              <button 
                onClick={() => onDeletePreset(preset.id)}
                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                title={t.deletePreset}
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {t.tool} <strong style={{ color: 'var(--accent-cyan)' }}>{preset.toolName}</strong>
            </div>

            <button 
              className="btn-secondary"
              onClick={() => onLoadPreset(preset)}
              style={{ fontSize: '0.78rem', padding: '6px 10px', justifyContent: 'space-between' }}
            >
              <span>{t.loadStyle}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
