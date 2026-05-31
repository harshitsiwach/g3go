'use client';

import { Save, Download, Undo, Redo, Play, Bug, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  onSave?: () => void;
  onExport?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onPlay?: () => void;
  onDebug?: () => void;
  onSettings?: () => void;
  disabled?: boolean;
}

export function EditorToolbar({
  onSave,
  onExport,
  onUndo,
  onRedo,
  onPlay,
  onDebug,
  onSettings,
  disabled = false,
}: ToolbarProps) {
  return (
    <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-2">
      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={Undo}
          label="Undo"
          onClick={onUndo}
          disabled={disabled}
        />
        <ToolbarButton
          icon={Redo}
          label="Redo"
          onClick={onRedo}
          disabled={disabled}
        />
      </div>

      <div className="h-6 w-px bg-gray-700 mx-2" />

      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={Save}
          label="Save"
          onClick={onSave}
          disabled={disabled}
        />
        <ToolbarButton
          icon={Download}
          label="Export"
          onClick={onExport}
          disabled={disabled}
          variant="primary"
        />
      </div>

      <div className="h-6 w-px bg-gray-700 mx-2" />

      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={Play}
          label="Play"
          onClick={onPlay}
          disabled={disabled}
          variant="success"
        />
        <ToolbarButton
          icon={Bug}
          label="Debug"
          onClick={onDebug}
          disabled={disabled}
        />
      </div>

      <div className="flex-1" />

      <ToolbarButton
        icon={Wrench}
        label="Settings"
        onClick={onSettings}
        disabled={disabled}
      />
    </div>
  );
}

interface ToolbarButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'success';
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  variant = 'default',
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={cn(
        'p-2 rounded-lg transition-colors',
        disabled && 'opacity-50 cursor-not-allowed',
        variant === 'default' && 'text-gray-400 hover:text-white hover:bg-gray-700',
        variant === 'primary' && 'text-brand-400 hover:text-brand-300 hover:bg-brand-900/30',
        variant === 'success' && 'text-green-400 hover:text-green-300 hover:bg-green-900/30'
      )}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
