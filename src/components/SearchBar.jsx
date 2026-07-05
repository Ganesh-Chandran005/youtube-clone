import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Paper 
      component="form" 
      onSubmit={onhandleSubmit} 
      sx={{ 
        borderRadius: 20, 
        border: '1px solid #303030', 
        pl: 2, 
        boxShadow: 'none', 
        mr: { sm: 5 }, 
        display: 'flex', 
        alignItems: 'center',
        backgroundColor: '#121212',
        overflow: 'hidden'
      }}
    >
      <input 
        className="search-bar outline-none border-none text-sm w-[200px] sm:w-[350px]" 
        placeholder="Search" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ backgroundColor: 'transparent', color: '#f1f1f1', border: 'none', outline: 'none' }}
      />
      <IconButton type="submit" sx={{ p: '10px', color: '#f1f1f1', backgroundColor: '#222222', borderRadius: 0, '&:hover': { backgroundColor: '#303030' } }}>
        <Search className="h-5 w-5" />
      </IconButton>
    </Paper>
  );
}