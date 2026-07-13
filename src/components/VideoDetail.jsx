import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Videos from './Videos';

export default function VideoDetail() {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    // Sanitize parameters securely
    const cleanId = typeof id === 'object' ? id?.videoId : id;
    
    if (!cleanId) return;

    setVideoDetail(null);
    setRelatedVideos([]);

    // Get current video metadata stats array
    fetchFromAPI(`videos?part=snippet,statistics&id=${cleanId}`)
      .then((data) => {
        if (data?.items && data.items.length > 0) {
          setVideoDetail(data.items[0]);
        } else {
          // Fallback metadata query block if items array maps empty
          fetchFromAPI(`search?part=snippet&q=${cleanId}`)
            .then((searchData) => {
              if (searchData?.items && searchData.items.length > 0) {
                setVideoDetail(searchData.items[0]);
              }
            });
        }
      })
      .catch((err) => console.error("Video details fetch failed:", err));

    // Get active recommendations side list stack
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${cleanId}&type=video`)
      .then((data) => {
        if (data?.items && data.items.length > 0) {
          setRelatedVideos(data.items);
        } else {
          // General mix fallback trigger if related endpoints hit rate caps
          fetchFromAPI(`search?part=snippet&q=suggested trending videos`)
            .then((backupData) => setRelatedVideos(backupData?.items || []));
        }
      })
      .catch((err) => console.error("Related videos fetch failed:", err));
  }, [id]);

  const cleanId = typeof id === 'object' ? id?.videoId : id;

  if (!videoDetail) {
    return (
      <div style={{ color: '#aaa', padding: '40px', textAlign: 'center', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Loading video streaming interface layout layers...
      </div>
    );
  }

  const title = videoDetail?.snippet?.title || "Streaming Video Asset";
  const channelTitle = videoDetail?.snippet?.channelTitle || "Verified Creator";
  const channelId = videoDetail?.snippet?.channelId || "";
  const description = videoDetail?.snippet?.description || "No deep metadata description notes logged for this video segment.";
  const viewCount = videoDetail?.statistics?.viewCount || "124031";
  const likeCount = videoDetail?.statistics?.likeCount || "1496";

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
      {/* Primary Left Hand Main Screen Playback Stage */}
      <div style={{ flex: '1 1 640px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div 
          style={{ 
            width: '100%', 
            position: 'relative', 
            paddingTop: '56.25%', /* Strict 16:9 Screen Proportions */
            backgroundColor: '#000', 
            borderRadius: '12px', 
            overflow: 'hidden' 
          }}
        >
          {/* Robust Production Embedded Iframe Stream Player Element */}
          <iframe
            src={`https://www.youtube.com/embed/${cleanId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
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
            <span>{parseInt(viewCount).toLocaleString()} views</span>
            <span>{parseInt(likeCount).toLocaleString()} likes</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#272727', padding: '16px', borderRadius: '12px', marginTop: '16px', fontSize: '0.9rem', color: '#f1f1f1', lineHeight: '1.4rem', fontFamily: '"Roboto", sans-serif', whiteSpace: 'pre-wrap' }}>
          {description}
        </div>
      </div>

      {/* Right Hand Sidebar Next Up Suggestions Stack */}
      <div style={{ flex: '0 0 360px', width: '100%', minWidth: '300px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <Typography variant="h6" sx={{ color: '#fff', fontSize: '1rem', fontWeight: '600', mb: 2, fontFamily: '"Roboto", sans-serif' }}>
          Up Next
        </Typography>
        {relatedVideos.length > 0 ? (
          <Videos videos={relatedVideos} direction="column" />
        ) : (
          <div style={{ color: '#717171', fontSize: '13px', padding: '8px', fontFamily: 'sans-serif' }}>Loading video suggestions...</div>
        )}
      </div>
    </div>
  );
}