import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        borderRadius: 20, 
        border: '1px solid #303030', 
        pl: 2, 
        boxShadow: 'none', 
        display: 'flex', 
        alignItems: 'center',
        backgroundColor: '#121212',
        overflow: 'hidden',
        height: '40px',
        width: { xs: '200px', sm: '380px', md: '520px' }
      }}
    >
      <input 
        className="search-bar" 
        placeholder="Search" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ 
          backgroundColor: 'transparent', 
          color: '#f1f1f1', 
          border: 'none', 
          outline: 'none',
          flex: 1,
          fontSize: '15px'
        }}
      />
      <IconButton 
        type="submit" 
        sx={{ 
          p: '10px 20px', 
          color: '#f1f1f1', 
          backgroundColor: '#222222', 
          borderRadius: 0, 
          borderLeft: '1px solid #303030',
          '&:hover': { backgroundColor: '#303030' } 
        }}
      >
        <Search style={{ width: '18px', height: '18px' }} />
      </IconButton>
    </Paper>
  );
}