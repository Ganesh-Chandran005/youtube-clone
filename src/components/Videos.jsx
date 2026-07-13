import React from 'react';
import { Grid, Box, Container } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

export default function Videos({ videos, direction }) {
  if (!videos?.length) {
    return (
      <Box sx={{ color: '#aaa', p: 3, fontSize: '14px', fontFamily: 'sans-serif', textAlign: 'center', mt: 4 }}>
        Loading feeds...
      </Box>
    );
  }
  
  return (
    <Container maxWidth="xl" sx={{ p: 0, m: 0, width: '100%' }}>
      <Grid 
        container 
        spacing={2} 
        direction={direction || "row"} 
        sx={{ 
          width: '100%', 
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        }}
      >
        {videos.map((item, idx) => (
          <React.Fragment key={idx}>
            {item.id.videoId && (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  padding: '8px !important'
                }}
              >
                <VideoCard video={item} />
              </Grid>
            )}
            {item.id.channelId && (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  padding: '8px !important'
                }}
              >
                <ChannelCard channelDetail={item} />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
}