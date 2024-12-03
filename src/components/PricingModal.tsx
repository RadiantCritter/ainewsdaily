import React from 'react';
import { X, Check } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_your_publishable_key');

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null;

  const handleSubscribe = async (priceId: string) => {
    const stripe = await stripePromise;
    if (!stripe) return;

    // In a real application, you would make an API call to your backend
    // to create a Stripe Checkout Session and redirect to it
    console.log('Subscribe to:', priceId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-4xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-emerald-400 mb-8 text-center">
          Upgrade to AI News Premium
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <div className="border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Free</h3>
            <p className="text-3xl font-bold text-emerald-400 mb-6">$0<span className="text-lg font-normal text-gray-400">/month</span></p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 mr-2" />
                Basic AI news access
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 mr-2" />
                Standard comments
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 mr-2" />
                Basic filtering
              </li>
            </ul>

            <button
              className="w-full py-2 px-4 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              disabled
            >
              Current Plan
            </button>
          </div>

          {/* Premium Tier */}
          <div className="border border-emerald-500 rounded-lg p-6 bg-gray-800">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 rounded-bl-lg text-sm">
              Popular
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Premium</h3>
            <p className="text-3xl font-bold text-emerald-400 mb-6">$9.99<span className="text-lg font-normal text-gray-400">/month</span></p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 mr-2" />
                Everything in Free
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 mr-2" />
                Advanced AI news filtering
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 mr-2" />
                Bookmark & save articles
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 mr-2" />
                Ad-free experience
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-emerald-400 mr-2" />
                Early access to new features
              </li>
            </ul>

            <button
              onClick={() => handleSubscribe('price_premium')}
              className="w-full py-2 px-4 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}