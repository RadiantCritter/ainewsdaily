import React, { useState } from 'react';
import { Logo } from './Logo';
import { PricingModal } from './PricingModal';

export function Header() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-500">
                AI News
              </h1>
              <p className="text-xs text-emerald-400 font-medium">
                Where AI meets innovation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm font-medium text-emerald-400">
              Curating tomorrow's intelligence, today
            </div>
            <button
              onClick={() => setIsPricingOpen(true)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
            >
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </header>
  );
}