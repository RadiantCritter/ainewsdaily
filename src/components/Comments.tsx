import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Comment } from '../types';
import { fetchComment } from '../utils/api';
import { CommentItem } from './CommentItem';

interface CommentsProps {
  storyId: number;
  commentIds: number[];
}

export function Comments({ storyId, commentIds }: CommentsProps) {
  if (!commentIds || commentIds.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <MessageSquare className="w-8 h-8 mx-auto mb-2" />
        <p>No comments yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {commentIds.map(commentId => (
        <CommentItem key={commentId} commentId={commentId} />
      ))}
    </div>
  );
}