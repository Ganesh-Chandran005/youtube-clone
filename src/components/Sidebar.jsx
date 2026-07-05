import React from 'react';
import { Stack } from '@mui/material';
import { categories } from '../utils/constants';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <Stack direction="row" sx={{ overflowY: 'auto', height: { sx: 'auto', md: '95%' }, flexDirection: { md: 'column' }, py: 1 }}>
      {categories.map((category) => (
        <button 
          key={category.name} 
          onClick={() => setSelectedCategory(category.name)} 
          className="category-btn" 
          style={{ 
            backgroundColor: category.name === selectedCategory ? '#272727' : 'transparent',
            fontWeight: category.name === selectedCategory ? '600' : '500'
          }}
        >
          <span style={{ color: '#f1f1f1', marginRight: '24px', display: 'flex', alignItems: 'center' }}>
            {category.icon}
          </span>
          <span style={{ color: '#f1f1f1' }}>
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
}