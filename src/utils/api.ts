const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export async function fetchTopStories(): Promise<number[]> {
  const response = await fetch(`${BASE_URL}/topstories.json`);
  const ids = await response.json();
  return ids.slice(0, 100); // Fetch more stories to filter for AI content
}

export async function fetchStory(id: number) {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  return response.json();
}

export async function fetchComment(id: number) {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  return response.json();
}

export function formatTime(timestamp: number): string {
  const now = new Date();
  const date = new Date(timestamp * 1000);
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours < 1) return 'just now';
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  
  const days = Math.floor(hours / 24);
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export function isAIRelated(title: string): boolean {
  const aiKeywords = [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
    'neural network', 'gpt', 'llm', 'chatgpt', 'openai', 'anthropic', 'claude',
    'gemini', 'stable diffusion', 'midjourney', 'dall-e', 'transformer',
    'large language model', 'diffusion model', 'autonomous', 'automation'
  ];
  
  const lowerTitle = title.toLowerCase();
  return aiKeywords.some(keyword => lowerTitle.includes(keyword));
}