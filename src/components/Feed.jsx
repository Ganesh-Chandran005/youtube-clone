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
      .then((data) => setVideos(data.items));
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" }, backgroundColor: '#0f0f0f' }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #272727", px: { sx: 0, md: 2 }, width: { sx: '100%', md: '240px' } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Typography variant="body2" sx={{ mt: 1.5, color: "#717171", display: { sx: 'none', md: 'block' }, px: 2, fontSize: '0.75rem' }}>
          © 2026 YouTube Clone
        </Typography>
      </Box>
      <Box p={3} sx={{ overflowY: "auto", height: "90vh", flex: 1, backgroundColor: '#0f0f0f' }}>
        <Typography variant="h5" fontWeight="700" mb={3} sx={{ color: "#f1f1f1", letterSpacing: '-0.02em' }}>
          {selectedCategory} Videos
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
}