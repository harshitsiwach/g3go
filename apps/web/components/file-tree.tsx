'use client';

import { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

const defaultFiles: FileNode[] = [
  {
    name: 'project',
    path: '/project',
    type: 'folder',
    children: [
      {
        name: 'scenes',
        path: '/project/scenes',
        type: 'folder',
        children: [
          { name: 'main.tscn', path: '/project/scenes/main.tscn', type: 'file' },
          { name: 'player.tscn', path: '/project/scenes/player.tscn', type: 'file' },
        ],
      },
      {
        name: 'scripts',
        path: '/project/scripts',
        type: 'folder',
        children: [
          { name: 'main.gd', path: '/project/scripts/main.gd', type: 'file' },
          { name: 'player.gd', path: '/project/scripts/player.gd', type: 'file' },
        ],
      },
      {
        name: 'assets',
        path: '/project/assets',
        type: 'folder',
        children: [
          { name: 'icon.png', path: '/project/assets/icon.png', type: 'file' },
        ],
      },
      { name: 'project.godot', path: '/project/project.godot', type: 'file' },
    ],
  },
];

interface FileTreeProps {
  onFileSelect?: (path: string) => void;
  selectedFile?: string;
}

export function FileTree({ onFileSelect, selectedFile }: FileTreeProps) {
  const [files, setFiles] = useState<FileNode[]>(defaultFiles);

  return (
    <div className="bg-gray-900 border-r border-gray-800 w-64 h-full overflow-auto">
      <div className="p-3 border-b border-gray-800 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300">Files</span>
        <button className="p-1 text-gray-400 hover:text-white transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="p-2">
        {files.map((node) => (
          <TreeNode
            key={node.path}
            node={node}
            level={0}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
    </div>
  );
}

interface TreeNodeProps {
  node: FileNode;
  level: number;
  selectedFile?: string;
  onFileSelect?: (path: string) => void;
}

function TreeNode({ node, level, selectedFile, onFileSelect }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  const isSelected = selectedFile === node.path;

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect?.(node.path);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          'w-full flex items-center gap-2 px-2 py-1 text-sm rounded-lg transition-colors text-left',
          isSelected
            ? 'bg-brand-600/20 text-brand-400'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {node.type === 'folder' ? (
          <>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            )}
            <Folder className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          </>
        ) : (
          <>
            <span className="w-4" />
            <File className="w-4 h-4 text-blue-400 flex-shrink-0" />
          </>
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              level={level + 1}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
