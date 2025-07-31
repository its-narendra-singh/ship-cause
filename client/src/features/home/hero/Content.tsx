import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const Title = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(Typography)`
  color: #eee;
  font-size: 1rem;
  margin: 16px 0;
  line-height: 1.6;
`;

const LearnMore = styled(Link)`
  color: #ff8c00;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const Content: React.FC = () => {
    return (
        <Box>
            <Title>Receive Support from Ship Cause Pros</Title>
            <Description>
                With our concierge shipping services, you don't have to be a specialist in shipping. Your assigned shipping liaison becomes an extension of your team.
                <br /><br />
                You will be assigned a dedicated concierge service representative to assist you with any questions or concerns you or your customers may have throughout the entirety of the shipping process.
                <br /><br />
                Your liaison can assist with any claims, supply orders, rerouting of packages and last-minute address changes.
            </Description>
            <LearnMore href="#">
                Learn more about the benefits of a live liaison →
            </LearnMore>
        </Box>
    );
};

export default Content;
