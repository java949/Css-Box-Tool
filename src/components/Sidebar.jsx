import React from 'react';
import { 
  Box, 
  Layers, 
  Palette, 
  CircleDot, 
  Type, 
  LayoutGrid, 
  PlayCircle, 
  Sliders 
} from 'lucide-react';

export const TOOL_CONFIG = [
  { id: 'shadow', icon: Box },
  { id: 'glass', icon: Layers },
  { id: 'gradient', icon: Palette },
  { id: 'radius', icon: CircleDot },
  { id: 'text', icon: Type },
  { id: 'layout', icon: LayoutGrid },
  { id: 'animation', icon: PlayCircle },
  { id: 'filter', icon: Sliders }
];

export default function Sidebar({ activeTool, setActiveTool, t }) {
  return (
    <aside className="sidebar-panel">
      <div className="sidebar-title">{t.toolsTitle}</div>
      {TOOL_CONFIG.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;
        const toolName = t.tools[tool.id]?.name || tool.id;
        return (
          <button
            key={tool.id}
            className={`tool-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTool(tool.id)}
          >
            <span className="icon-wrapper">
              <Icon size={18} />
            </span>
            <span>{toolName}</span>
          </button>
        );
      })}
    </aside>
  );
}
