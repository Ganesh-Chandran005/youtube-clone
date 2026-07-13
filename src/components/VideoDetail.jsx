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
    // Standardize video identifier key mapping
    const videoParamId = typeof id === 'object' ? id?.videoId : id;
    
    if (!videoParamId) return;

    setVideoDetail(null);
    setRelatedVideos(false);

    fetchFromAPI(`videos?part=snippet,statistics&id=${videoParamId}`)
      .then((data) => {
        if (data?.items?.length > 0) {
          setVideoDetail(data.items[0]);
        }
      })
      .catch((err) => console.error("Error loading stream items:", err));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${videoParamId}&type=video`)
      .then((data) => {
        setRelatedVideos(data?.items || []);
      })
      .catch((err) => console.error("Error loading related feeds:", err));
  }, [id]);

  if (!videoDetail?.snippet) {
    return (
      <div style={{ color: '#aaa', padding: '40px', textAlign: 'center', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Loading video stream and recommendation panels...
      </div>
    );
  }

  const { snippet: { title, channelId, channelTitle, description }, statistics: { viewCount, likeCount } } = videoDetail;
  const videoParamId = typeof id === 'object' ? id?.videoId : id;

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
      <div style={{ flex: '1 1 640px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ width: '100%', position: 'relative', paddingTop: '56.25%', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
          <ReactPlayer 
            url={`https://www.youtube.com/watch?v=${videoParamId}`} 
            className="react-player" 
            controls 
            playing
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>
        
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: '600', mt: 2, fontSize: '1.2rem', lineHeight: '1.6rem', fontFamily: '"Roboto", sans-serif' }}>
          {title}
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingBottom: '12px', borderBottom: '1px solid #272727', gap: '12px' }}>
          <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: '500', fontSize: '1rem', fontFamily: '"Roboto", sans-serif' }}>
                {channelTitle}
              </Typography>
              <CheckCircle style={{ width: '14px', height: '14px', fill: '#aaa', color: '#0f0f0f' }} />
            </div>
          </Link>
          <div style={{ display: 'flex', gap: '16px', color: '#aaa', fontSize: '0.9rem', fontFamily: '"Roboto", sans-serif' }}>
            <span>{viewCount ? parseInt(viewCount).toLocaleString() : '0'} views</span>
            <span>{likeCount ? parseInt(likeCount).toLocaleString() : '0'} likes</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#272727', padding: '16px', borderRadius: '12px', marginTop: '16px', fontSize: '0.9rem', color: '#f1f1f1', lineHeight: '1.4rem', fontFamily: '"Roboto", sans-serif', whiteSpace: 'pre-wrap' }}>
          {description}
        </div>
      </div>

      <div style={{ flex: '0 0 360px', width: '100%', minWidth: '300px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <Typography variant="h6" sx={{ color: '#fff', fontSize: '1rem', fontWeight: '600', mb: 2, fontFamily: '"Roboto", sans-serif' }}>
          Up Next
        </Typography>
        {relatedVideos ? (
          <Videos videos={relatedVideos} direction="column" />
        ) : (
          <div style={{ color: '#717171', fontSize: '13px' }}>Loading recommendations...</div>
        )}
      </div>
    </div>
  );
}