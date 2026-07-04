import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, InputBase, Box, IconButton, 
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid, Card, CardMedia, CardContent, Avatar
} from '@mui/material';
import { 
  Search as SearchIcon, Menu as MenuIcon, Home, Whatshot, 
  Subscriptions, VideoLibrary, History, WatchLater 
} from '@mui/icons-material';

export default function App() {
  const videos = [
    {
      id: 1,
      title: "Building a Responsive Budget Tracker Application in React",
      channel: "Ganesh Code Lab",
      views: "15K views",
      time: "2 days ago",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "How to Build a Custom Video Dashboard Layout Using Material UI",
      channel: "Design Hub",
      views: "340K views",
      time: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "Learn JavaScript ES6 Promise Chains and Async/Await Mechanics",
      channel: "JS Masterclass",
      views: "89K views",
      time: "3 weeks ago",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      title: "React Hooks Explained Simply - State and Effect Demystified",
      channel: "React Academy",
      views: "1.2M views",
      time: "1 month ago",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* 1. TOP NAVBAR PANEL */}
      <AppBar position="fixed" sx={{ bgcolor: '#ffffff', color: '#0f0f0f', boxShadow: 'none', borderBottom: '1px solid #e5e5e5' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            {/* Updated title brand name string configuration */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: '-1px', color: '#ff0000', display: 'flex', alignItems: 'center' }}>
              🔴 <span style={{ color: '#0f0f0f', marginLeft: '5px' }}>UTube</span>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f8f8f8', border: '1px solid #ccc', borderRadius: '40px', px: 2, py: 0.5, width: '40%' }}>
            <InputBase placeholder="Search videos..." sx={{ ml: 1, flex: 1, fontSize: '14px' }} />
            <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>

          <Avatar sx={{ bgcolor: '#2563eb', fontSize: '14px' }}>G</Avatar>
        </Toolbar>
      </AppBar>

      {/* MAIN BODY WRAPPER FRAME */}
      <Box sx={{ display: 'flex', pt: '64px' }}>
        
        {/* 2. SIDEBAR NAVIGATION CONTROLS PANEL */}
        <Box sx={{ width: '240px', bgcolor: '#ffffff', height: 'calc(100vh - 64px)', position: 'fixed', left: 0, borderRight: '1px solid #e5e5e5', display: { xs: 'none', md: 'block' } }}>
          <List>
            {[
              { text: 'Home', icon: <Home /> },
              { text: 'Trending', icon: <Whatshot /> },
              { text: 'Subscriptions', icon: <Subscriptions /> },
              { text: 'Library', icon: <VideoLibrary /> },
              { text: 'History', icon: <History /> },
              { text: 'Watch Later', icon: <WatchLater /> }
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: '#0f0f0f' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} slotProps={{ typography: { fontSize: '14px', fontWeight: 500 } }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* 3. DYNAMIC VIDEO MAIN STREAM LIST GRID */}
        <Box sx={{ flexGrow: 1, ml: { xs: 0, md: '240px' }, p: 3 }}>
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Card sx={{ boxShadow: 'none', bgcolor: 'transparent', cursor: 'pointer' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={video.thumbnail}
                    alt={video.title}
                    sx={{ borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <CardContent sx={{ px: 1, py: 1.5, display: 'flex', gap: '12px' }}>
                    <Avatar sx={{ width: 36, height: 36 }}>{video.channel[0]}</Avatar>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', lineHeight: '1.2rem', mb: 0.5, fontSize: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {video.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#606060', fontSize: '12px' }}>
                        {video.channel}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#606060', fontSize: '12px' }}>
                        {video.views} • {video.time}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Box>
    </Box>
  );
}