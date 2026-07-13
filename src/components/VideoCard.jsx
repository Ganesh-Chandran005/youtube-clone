import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { CheckCircle } from 'lucide-react';

export default function VideoCard({ video }) {
  // Extract videoId from nested object if present, otherwise fall back to raw id string
  const videoId = typeof video?.id === 'object' ? video?.id?.videoId : video?.id;
  const snippet = video?.snippet;

  // Abort rendering if no valid routing key exists to prevent generating broken paths
  if (!videoId) return null;

  return (
    <div 
      style={{ 
        width: '100%', 
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      <Link to={`/video/${videoId}`} style={{ width: '100%', textDecoration: 'none' }}>
        <div 
          style={{ 
            width: '100%', 
            position: 'relative', 
            paddingTop: '56.25%', 
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#1e1e1e'
          }}
        >
          <img 
            src={snippet?.thumbnails?.high?.url || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7'} 
            alt={snippet?.title} 
            style={{ 
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} 
          />
        </div>
      </Link>

      <div style={{ padding: '12px 0 0 0', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Link to={`/video/${videoId}`} style={{ textDecoration: 'none' }}>
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
              {snippet?.title || 'YouTube Video Title Placeholder'}
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
        </div>
      </div>
    </div>
  );
}