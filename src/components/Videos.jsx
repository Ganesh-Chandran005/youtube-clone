import React from 'react';
import { Grid, Box } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

export default function Videos({ videos, direction }) {
  if (!videos?.length) return <div className="text-white p-5">Loading Engine Nodes...</div>;
  
  return (
    <Grid container spacing={3} flexDirection={direction || "row"} sx={{ width: '100%', margin: 0 }}>
      {videos.map((item, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%' }}>
            {item.id.videoId && <VideoCard video={item} /> }
            {item.id.channelId && <ChannelCard channelDetail={item} /> }
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}