import React from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

export default function ChannelCard({ channelDetail, marginTop }) {
  return (
    <Box sx={{ boxShadow: 'none', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: { xs: '356px', md: '320px' }, height: '326px', margin: 'auto', marginTop }}>
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
          <CardMedia image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture} alt={channelDetail?.snippet?.title} sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }} />
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {channelDetail?.snippet?.title}
            <CheckCircle className="h-4 w-4 text-gray-400 ml-1 fill-gray-400" />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray', mt: 1 }}>
              {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
}