import React from 'react';
import { Header } from './components/Header';
import { StoryList } from './components/StoryList';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <StoryList />
      </main>
    </div>
  );
}