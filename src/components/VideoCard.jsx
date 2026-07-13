import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import { CheckCircle } from 'lucide-react';

export default function VideoCard({ video: { id: { videoId }, snippet } }) {
  return (
    <Card 
      sx={{ 
        width: '100%', 
        boxShadow: 'none', 
        borderRadius: 0, 
        background: 'transparent',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
      }}
    >
      {/* 16:9 Thumbnail Mask Frame */}
      <Link to={videoId ? `/video/${videoId}` : '#'} style={{ width: '100%', textDecoration: 'none' }}>
        <Box 
          sx={{ 
            width: '100%', 
            position: 'relative', 
            paddingTop: '56.25%', /* Pure 16:9 Aspect Ratio Boundary */
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#272727',
            transition: 'border-radius 0.15s ease-in-out',
            '&:hover': {
              borderRadius: '0px'
            }
          }}
        >
          <CardMedia 
            image={snippet?.thumbnails?.high?.url || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7'} 
            alt={snippet?.title} 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} 
          />
        </Box>
      </Link>

      {/* Accurate Typography Metadata Layout */}
      <CardContent sx={{ backgroundColor: 'transparent', p: '12px 0 0 0 !important', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Link to={videoId ? `/video/${videoId}` : '#'} style={{ textDecoration: 'none' }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: '500', 
                color: '#f1f1f1', 
                display: '-webkit-box', 
                WebkitLineClamp: 2, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden', 
                lineHeight: '1.25rem', 
                fontSize: '0.92rem', 
                mb: '4px',
                fontFamily: '"Roboto", "Arial", sans-serif'
              }}
            >
              {snippet?.title || 'YouTube Video Title Example Details'}
            </Typography>
          </Link>
          
          <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : '#'} style={{ textDecoration: 'none', width: 'fit-content' }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: '#aaa', 
                display: 'flex', 
                alignItems: 'center', 
                fontSize: '0.8rem', 
                fontWeight: '400', 
                mt: '2px',
                fontFamily: '"Roboto", "Arial", sans-serif',
                '&:hover': { color: '#f1f1f1' } 
              }}
            >
              {snippet?.channelTitle || 'Channel Title'}
              <CheckCircle style={{ width: '12px', height: '12px', marginLeft: '4px', fill: '#aaa', color: '#0f0f0f' }} />
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}