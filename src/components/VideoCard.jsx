import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants';

export default function VideoCard({ video: { id: { videoId }, snippet } }) {
  return (
    <Card sx={{ width: '100%', boxShadow: 'none', borderRadius: 0, background: 'transparent', cursor: 'pointer' }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia 
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} 
          alt={snippet?.title} 
          sx={{ 
            width: '100%', 
            aspectRatio: '16/9', 
            borderRadius: '12px',
            backgroundColor: '#272727',
            transition: 'border-radius 0.15s ease'
          }} 
        />
      </Link>
      <CardContent sx={{ backgroundColor: 'transparent', p: '12px 0 0 0 !important' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <Typography variant="subtitle1" sx={{ fontWeight: '500', color: '#f1f1f1', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.3rem', fontSize: '0.95rem', mb: '4px' }}>
              {snippet?.title || demoVideoTitle}
            </Typography>
          </Link>
          <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
            <Typography variant="subtitle2" sx={{ color: '#aaa', display: 'flex', alignItems: 'center', fontSize: '0.85rem', '&:hover': { color: '#f1f1f1' } }}>
              {snippet?.channelTitle || demoChannelTitle}
              <CheckCircle className="h-3 w-3 text-gray-400 ml-1 fill-gray-400" />
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}