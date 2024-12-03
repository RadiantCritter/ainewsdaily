import React, { useState, useEffect } from 'react';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Comment } from '../types';
import { fetchComment, formatTime } from '../utils/api';

interface CommentItemProps {
  commentId: number;
  level?: number;
}

export function CommentItem({ commentId, level = 0 }: CommentItemProps) {
  const [comment, setComment] = useState<Comment | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [childComments, setChildComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComment() {
      try {
        const data = await fetchComment(commentId);
        setComment(data);
        if (data.kids && isExpanded) {
          const children = await Promise.all(data.kids.map(fetchComment));
          setChildComments(children.filter(c => c && !c.deleted));
        }
      } catch (error) {
        console.error('Failed to load comment:', error);
      } finally {
        setLoading(false);
      }
    }

    loadComment();
  }, [commentId]);

  if (loading) {
    return (
      <div className="animate-pulse flex space-x-4 ml-[calc(1rem*var(--level))]" style={{ '--level': level }}>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!comment || comment.deleted) return null;

  return (
    <div className="ml-[calc(1rem*var(--level))]" style={{ '--level': level }}>
      <div className="border-l-2 border-gray-700 pl-4 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span className="font-medium text-emerald-400">{comment.by}</span>
          <span>•</span>
          <span>{formatTime(comment.time)}</span>
          {comment.kids && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {comment.kids.length} replies
            </button>
          )}
        </div>
        <div 
          className="mt-2 text-gray-300 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      </div>
      {isExpanded && childComments.map(child => (
        <CommentItem key={child.id} commentId={child.id} level={level + 1} />
      ))}
    </div>
  );
}