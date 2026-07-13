import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import { CheckCircle } from 'lucide-react';

export default function VideoCard({ video: { id: { videoId }, snippet } }) {
  return (
    <Card sx={{ width: '100%', boxShadow: 'none', borderRadius: 0, background: 'transparent' }}>
      <Link to={videoId ? `/video/${videoId}` : '#'}>
        <CardMedia 
          image={snippet?.thumbnails?.high?.url || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7'} 
          alt={snippet?.title} 
          sx={{ 
            width: '100%', 
            aspectRatio: '16/9', 
            borderRadius: '12px',
            backgroundColor: '#272727',
            transition: 'border-radius 0.2s ease',
            '&:hover': { borderRadius: '0px' }
          }} 
        />
      </Link>
      <CardContent sx={{ backgroundColor: 'transparent', p: '12px 0 0 0 !important' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Link to={videoId ? `/video/${videoId}` : '#'}>
            <Typography variant="subtitle1" sx={{ fontWeight: '500', color: '#f1f1f1', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.3rem', fontSize: '0.92rem', mb: '4px' }}>
              {snippet?.title || 'YouTube Video Title Example Details'}
            </Typography>
          </Link>
          <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : '#'}>
            <Typography variant="subtitle2" sx={{ color: '#aaa', display: 'flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: '400', '&:hover': { color: '#f1f1f1' } }}>
              {snippet?.channelTitle || 'Channel Title'}
              <CheckCircle style={{ width: '12px', height: '12px', marginLeft: '4px', fill: '#aaa', color: '#0f0f0f' }} />
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}