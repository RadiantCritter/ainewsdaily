import React from 'react';
import { Terminal } from 'lucide-react';

export function Logo() {
  return (
    <div className="relative flex items-center">
      <Terminal className="w-8 h-8 text-emerald-400" />
    </div>
  );
}