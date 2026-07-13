import React from 'react';
import { Grid, Box } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

export default function Videos({ videos, direction }) {
  if (!videos?.length) return <Box sx={{ color: '#fff', p: 3, fontSize: '14px', fontFamily: 'sans-serif' }}>Loading layout feeds...</Box>;
  
  return (
    <Grid container spacing={2.5} direction={direction || "row"} sx={{ width: '100%', margin: 0 }}>
      {videos.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.id.videoId && (
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%' }}>
                <VideoCard video={item} />
              </Box>
            </Grid>
          )}
          {item.id.channelId && (
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%' }}>
                <ChannelCard channelDetail={item} />
              </Box>
            </Grid>
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
}