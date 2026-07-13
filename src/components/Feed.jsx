import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import Videos from './Videos';

export default function Feed() {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items || []));
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" }, backgroundColor: '#0f0f0f' }}>
      <Box 
        sx={{ 
          height: { sx: "auto", md: "calc(100vh - 56px)" }, 
          px: { sx: 0, md: 2 }, 
          width: { sx: '100%', md: '240px' },
          boxSizing: 'border-box',
          position: 'sticky',
          top: '56px'
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Typography variant="body2" sx={{ mt: 2, color: "#aaa", display: { sx: 'none', md: 'block' }, px: 2, fontSize: '11px', lineHeight: '16px' }}>
          About Press Copyright<br />Contact us Creators<br />Advertise Developers<br /><br />© 2026 YouTube LLC
        </Typography>
      </Box>
      <Box p={3} sx={{ overflowY: "auto", height: "calc(100vh - 56px)", flex: 1, backgroundColor: '#0f0f0f', boxSizing: 'border-box' }}>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
}