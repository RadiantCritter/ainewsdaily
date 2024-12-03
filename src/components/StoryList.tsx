import React, { useEffect, useState } from 'react';
import { Story } from '../types';
import { fetchTopStories, fetchStory, isAIRelated } from '../utils/api';
import { StoryItem } from './StoryItem';
import { Loader2, Terminal } from 'lucide-react';

export function StoryList() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStories() {
      try {
        const ids = await fetchTopStories();
        const allStories = await Promise.all(ids.map(id => fetchStory(id)));
        const aiStories = allStories
          .filter(story => isAIRelated(story.title))
          .slice(0, 30);
        setStories(aiStories);
      } catch (error) {
        console.error('Failed to load stories:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <Terminal className="w-12 h-12 text-emerald-400 animate-pulse" />
        <div className="text-emerald-400 font-medium">Loading AI News...</div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-emerald-400">No AI-related stories found at the moment.</h2>
        <p className="text-emerald-300 mt-2">Please check back later!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <StoryItem key={story.id} story={story} />
      ))}
    </div>
  );
}