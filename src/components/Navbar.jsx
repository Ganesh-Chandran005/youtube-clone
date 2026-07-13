import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { Menu, Bell, Video, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 24px', 
        backgroundColor: '#0f0f0f', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        height: '56px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#272727'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
          <Menu style={{ color: '#fff', width: '20px', height: '20px', display: 'block' }} />
        </button>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: '#FF0000' }}>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span style={{ color: '#fff', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.05em', fontFamily: '"Arial Alternate", "Helvetica", sans-serif' }}>YouTube</span>
        </Link>
      </div>

      <SearchBar />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#272727'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
          <Video style={{ color: '#fff', width: '20px', height: '20px' }} />
        </button>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#272727'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
          <Bell style={{ color: '#fff', width: '20px', height: '20px' }} />
        </button>
        <button onClick={() => navigate('/')} style={{ border: 'none', padding: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#272727', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: '8px' }}>
          <User style={{ color: '#fff', width: '16px', height: '16px' }} />
        </button>
      </div>
    </div>
  );
}