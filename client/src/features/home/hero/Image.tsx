import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import assets from '../../../assets';

const ImageBox = styled(() => <Box component='img' src={assets.hero_human_resource} />)`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4 / 3;
  background-color: #ccc;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
`;

const Image: React.FC = () => {
    return (
        <ImageBox />
    );
};

export default Image;
