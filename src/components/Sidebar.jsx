import React from 'react';
import { Stack } from '@mui/material';
import { categories } from '../utils/constants';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <Stack 
      direction="row" 
      sx={{ 
        overflowY: 'auto', 
        height: { sx: 'auto', md: '90%' }, 
        flexDirection: { md: 'column' }, 
        py: 1,
        px: { xs: 2, md: 0 }
      }}
    >
      {categories.map((category) => (
        <button 
          key={category.name} 
          onClick={() => setSelectedCategory(category.name)} 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            cursor: 'pointer',
            background: category.name === selectedCategory ? '#272727' : 'transparent',
            border: 'none',
            outline: 'none',
            padding: '10px 16px',
            margin: '2px 0px',
            borderRadius: '10px',
            width: '100%',
            color: '#f1f1f1',
            transition: 'background-color 0.15s ease'
          }}
          onMouseOver={(e) => { if(category.name !== selectedCategory) e.currentTarget.style.backgroundColor = '#212121'; }}
          onMouseOut={(e) => { if(category.name !== selectedCategory) e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <span style={{ color: '#f1f1f1', marginRight: '24px', display: 'flex', alignItems: 'center' }}>
            {category.icon}
          </span>
          <span style={{ fontSize: '14px', fontWeight: category.name === selectedCategory ? '600' : '400', whiteSpace: 'nowrap' }}>
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
}