import React from 'react';
import { Stack, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { Menu, Bell, Video, User } from 'lucide-react';

export default function Navbar() {
  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      justifyContent="space-between" 
      p={2} 
      sx={{ 
        position: 'sticky', 
        background: '#0f0f0f', 
        top: 0, 
        zIndex: 100,
        height: '56px',
        boxSizing: 'border-box',
        px: 3
      }}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <Menu style={{ color: '#fff', cursor: 'pointer', width: '22px', height: '22px' }} />
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg viewBox="0 0 24 24" style={{ width: '30px', height: '30px', fill: '#FF0000' }}>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', letterSpacing: '-0.04em', fontFamily: '"Oswald", "Arial Black", sans-serif' }}>YouTube</span>
        </Link>
      </Stack>

      <SearchBar />

      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Video style={{ color: '#fff', cursor: 'pointer', width: '20px', height: '20px' }} />
        <Bell style={{ color: '#fff', cursor: 'pointer', width: '20px', height: '20px' }} />
        <Box sx={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#272727', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <User style={{ color: '#fff', width: '18px', height: '18px' }} />
        </Box>
      </Stack>
    </Stack>
  );
}