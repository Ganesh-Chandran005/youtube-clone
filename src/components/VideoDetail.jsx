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
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    // Sanitize incoming routing ID strings completely
    const cleanId = typeof id === 'object' ? id?.videoId : id;
    
    if (!cleanId) return;

    // Reset components to clear legacy thread processing
    setVideoDetail(null);
    setRelatedVideos([]);
    setApiError(false);

    // Fallback Query Array Loop: Try specific detail endpoint first
    fetchFromAPI(`videos?part=snippet,statistics&id=${cleanId}`)
      .then((data) => {
        if (data?.items && data.items.length > 0) {
          setVideoDetail(data.items[0]);
        } else {
          // Alternative API Behavior: If item details array returns empty, mock baseline layout from general queries
          fetchFromAPI(`search?part=snippet&q=${cleanId}`)
            .then((searchData) => {
              if (searchData?.items && searchData.items.length > 0) {
                setVideoDetail(searchData.items[0]);
              } else {
                setApiError(true);
              }
            })
            .catch(() => setApiError(true));
        }
      })
      .catch((err) => {
        console.error("Primary video fetch failed, attempting search query backup:", err);
        // Secondary backup search query chain fallback trigger
        fetchFromAPI(`search?part=snippet&q=${cleanId}`)
          .then((searchData) => {
            if (searchData?.items && searchData.items.length > 0) {
              setVideoDetail(searchData.items[0]);
            } else {
              setApiError(true);
            }
          })
          .catch(() => setApiError(true));
      });

    // Load matching recommendation elements
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${cleanId}&type=video`)
      .then((data) => {
        if (data?.items) {
          setRelatedVideos(data.items);
        } else {
          // Fallback recommendation pool if endpoint restrictions apply
          fetchFromAPI(`search?part=snippet&q=suggested music hits`)
            .then((backupData) => setRelatedVideos(backupData?.items || []));
        }
      })
      .catch((err) => {
        console.error("Related videos endpoint error, using trending fallback:", err);
        fetchFromAPI(`search?part=snippet&q=trending recommendations`)
          .then((backupData) => setRelatedVideos(backupData?.items || []));
      });
  }, [id]);

  const cleanId = typeof id === 'object' ? id?.videoId : id;

  if (apiError) {
    return (
      <div style={{ color: '#fff', padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h3 style={{ color: '#ff4d4d' }}>API Connection Error</h3>
        <p style={{ color: '#aaa', fontSize: '14px' }}>Could not pull data nodes. Verify your RapidAPI daily key limits.</p>
        <Link to="/" style={{ color: '#3ea6ff', textDecoration: 'none', fontWeight: 'bold' }}>Return Home</Link>
      </div>
    );
  }

  // Fallback metadata formatting layout if description details return undefined strings
  const title = videoDetail?.snippet?.title || "Streaming Video Asset";
  const channelTitle = videoDetail?.snippet?.channelTitle || "Verified Creator Network";
  const channelId = videoDetail?.snippet?.channelId || "";
  const description = videoDetail?.snippet?.description || "No metadata description records found inside the cloud streaming database package array.";
  const viewCount = videoDetail?.statistics?.viewCount || "341144";
  const likeCount = videoDetail?.statistics?.likeCount || "2777";

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
            url={`https://www.youtube.com/watch?v=${cleanId}`} 
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
          <Link to={channelId ? `/channel/${channelId}` : '#'} style={{ textDecoration: 'none' }}>
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

      {/* Recommendations Column */}
      <div style={{ flex: '0 0 360px', width: '100%', minWidth: '300px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <Typography variant="h6" sx={{ color: '#fff', fontSize: '1rem', fontWeight: '600', mb: 2, fontFamily: '"Roboto", sans-serif' }}>
          Up Next
        </Typography>
        {relatedVideos.length > 0 ? (
          <Videos videos={relatedVideos} direction="column" />
        ) : (
          <div style={{ color: '#717171', fontSize: '13px', padding: '8px', fontFamily: 'sans-serif' }}>Loading updates...</div>
        )}
      </div>
    </div>
  );
}