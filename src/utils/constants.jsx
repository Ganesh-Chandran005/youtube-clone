import React from 'react';
import { 
  Home, 
  Tv, 
  Music2, 
  GraduationCap, 
  Podcast, 
  Clapperboard, 
  Gamepad2, 
  Radio, 
  Trophy, 
  Shirt, 
  Sparkles 
} from 'lucide-react';

export const categories = [
  { name: 'Home', icon: <Home style={{ width: '20px', height: '20px' }} /> },
  { name: 'Shorts', icon: <Tv style={{ width: '20px', height: '20px' }} /> },
  { name: 'Music', icon: <Music2 style={{ width: '20px', height: '20px' }} /> },
  { name: 'Education', icon: <GraduationCap style={{ width: '20px', height: '20px' }} /> },
  { name: 'Podcast', icon: <Podcast style={{ width: '20px', height: '20px' }} /> },
  { name: 'Movies', icon: <Clapperboard style={{ width: '20px', height: '20px' }} /> },
  { name: 'Gaming', icon: <Gamepad2 style={{ width: '20px', height: '20px' }} /> },
  { name: 'Live', icon: <Radio style={{ width: '20px', height: '20px' }} /> },
  { name: 'Sports', icon: <Trophy style={{ width: '20px', height: '20px' }} /> },
  { name: 'Fashion', icon: <Shirt style={{ width: '20px', height: '20px' }} /> },
  { name: 'Beauty', icon: <Sparkles style={{ width: '20px', height: '20px' }} /> },
];

export const demoThumbnailUrl = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7';
export const demoVideoUrl = '/video/dQw4w9WgXcQ';
export const demoVideoTitle = 'YouTube Video Title Placeholder';
export const demoChannelUrl = '/channel/UCmXmlB4-HJytD7wek0Uo97A';
export const demoChannelTitle = 'YouTube Channel';
export const demoProfilePicture = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde';