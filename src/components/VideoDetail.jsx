import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Videos from './Videos';

export default function VideoDetail() {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setRelatedVideos(data.items || []));
  }, [id]);

  if (!videoDetail?.snippet) {
    return (
      <div style={{ color: '#aaa', padding: '40px', textAlign: 'center', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Loading video streaming channels...
      </div>
    );
  }

  const { snippet: { title, channelId, channelTitle, description }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <div 
      style={{ 
        width: '100%', 
        minHeight: 'calc(100vh - 56px)', 
        backgroundColor: '#0f0f0f', 
        display: 'flex', 
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '24px', 
        boxSizing: 'border-box',
        gap: '24px'
      }}
    >
      {/* Primary Video Container */}
      <div style={{ flex: '1 1 640px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ width: '100%', position: 'relative', paddingTop: '56.25%', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
          <ReactPlayer 
            url={`https://www.youtube.com/watch?v=${id}`} 
            className="react-player" 
            controls 
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>
        
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: '600', mt: 2, fontSize: '1.2rem', lineHeight: '1.6rem' }}>
          {title}
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingBottom: '12px', borderBottom: '1px solid #272727', gap: '12px' }}>
          <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: '500', fontSize: '1rem' }}>
                {channelTitle}
              </Typography>
              <CheckCircle style={{ width: '14px', height: '14px', fill: '#aaa', color: '#0f0f0f' }} />
            </div>
          </Link>
          <div style={{ display: 'flex', gap: '16px', color: '#aaa', fontSize: '0.9rem' }}>
            <span>{parseInt(viewCount).toLocaleString()} views</span>
            <span>{parseInt(likeCount).toLocaleString()} likes</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#272727', padding: '12px', borderRadius: '12px', marginTop: '16px', fontSize: '0.9rem', color: '#f1f1f1', lineHeight: '1.4rem' }}>
          {description?.slice(0, 300)}...
        </div>
      </div>

      {/* Secondary Recommendations Container */}
      <div style={{ flex: '0 0 360px', width: '100%', minWidth: '300px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <Typography variant="h6" sx={{ color: '#fff', fontSize: '1rem', fontWeight: '600', mb: 2 }}>
          Up Next
        </Typography>
        <Videos videos={relatedVideos} direction="column" />
      </div>
    </div>
  );
}