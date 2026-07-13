import React from 'react';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

export default function Videos({ videos, direction }) {
  if (!videos?.length) {
    return (
      <div style={{ color: '#aaa', padding: '24px', fontSize: '14px', fontFamily: 'sans-serif', textAlign: 'center', marginTop: '32px' }}>
        Loading layout feeds...
      </div>
    );
  }
  
  const isColumn = direction === 'column';
  
  return (
    <div 
      style={{ 
        display: 'grid',
        // If column, make it a strict single row list. If row, use the 4-column responsive adaptive auto-fill grid
        gridTemplateColumns: isColumn ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
        width: '100%',
        boxSizing: 'border-box',
        padding: isColumn ? '0' : '0 8px'
      }}
    >
      {videos.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.id.videoId && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <VideoCard video={item} />
            </div>
          )}
          {item.id.channelId && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <ChannelCard channelDetail={item} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}