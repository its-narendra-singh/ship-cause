import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import assets from '../../assets'; // Ensure your images are properly imported

const SectionWrapper = styled(Box)`
  position: relative;
  background-image: url(${assets.get_started_background});
  background-size: cover;
  background-color: #D7DFE1;
  background-position: center;
  background-repeat: no-repeat;
  padding: 80px 16px;
  text-align: center;
  font-family: 'Raleway', sans-serif;
  overflow: hidden;
`;

const Heading = styled(Typography)`
  font-size: 2.4rem;
  font-weight: 700;
  color: #333;

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const HighlightText = styled('span')`
  color: #6a1b9a;
`;

const CTAButton = styled(Button)`
  background-color: #6a1b9a;
  color: #fff;
  padding: 12px 28px;
  border-radius: 24px;
  text-transform: none;
  font-weight: 700;
  font-size: 16px;
  margin-top: 24px;

  &:hover {
    background-color: #4a148c;
  }
`;

const ObstacleImage = styled('img')<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.position === 'left' ? 'left: 0;' : 'right: 0;')}
  transform: translateY(-50%);
  height: 100%;
  z-index: 1;

//   @media (max-width: 600px) {
//     width: 80px;
//   }
`;

const GetStarted: React.FC = () => {
  return (
    <SectionWrapper>
      <ObstacleImage src={assets.get_started_left} alt="Left Food" position="left" />
      <ObstacleImage src={assets.get_started_right} alt="Right Food" position="right" />

      <Heading>
        Next Day Shipping is<br />
        our <HighlightText>“Sweet Spot.”</HighlightText>
      </Heading>

      <CTAButton endIcon={<ArrowForwardIcon />}>
        Get Started
      </CTAButton>
    </SectionWrapper>
  );
};

export default GetStarted;
