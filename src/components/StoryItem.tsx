import React, { useState } from 'react';
import { ExternalLink, MessageSquare, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { Story } from '../types';
import { formatTime } from '../utils/api';
import { Comments } from './Comments';

interface StoryItemProps {
  story: Story;
}

export function StoryItem({ story }: StoryItemProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-all border border-gray-700">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center pt-1">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">{story.score}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {story.title}
            </a>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
            <span className="text-emerald-400 font-medium">by {story.by}</span>
            <span>•</span>
            <span>{formatTime(story.time)}</span>
            <span>•</span>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{story.descendants || 0} comments</span>
              {story.descendants > 0 && (
                showComments ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
      {showComments && story.kids && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <Comments storyId={story.id} commentIds={story.kids} />
        </div>
      )}
    </div>
  );
}