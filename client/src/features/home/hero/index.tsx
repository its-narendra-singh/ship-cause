import React, { useState } from 'react';
import { Box, Container, Typography, Link, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import assets from '../../../assets';

const tabs = [
    'Ship Pros',
    'Lower Rates',
    'E-commerce Network',
    'Easy Connection',
];

// Styled components
const SectionWrapper = styled(Box)`
  background-color: #6a1b9a;
  background-image: url(${assets.hero_background}); /* replace with actual texture */
  background-size: cover;
  background-position: center;
  color: white;
  padding: 80px 16px;
  font-family: 'Raleway', sans-serif;
`;

const TabsWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const TabButton = styled(Button) <{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#F1F0FE' : 'transparent')};
  color: ${({ active }) => (active ? '#572A84' : '#838383')};
  font-weight: ${({ active }) => (active ? 700 : 500)};
  text-transform: none;
  padding: 6px 18px;
  border-radius: 12px;
  font-size: 0.95rem;

  &:hover {
    color: #572A84;
  }
`;

const Heading = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Description = styled(Typography)`
  font-size: 1rem;
  line-height: 1.6;
  color: #eee;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const LearnMore = styled(Link)`
  color: #ff8c00;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HeroSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <SectionWrapper>
            <Container maxWidth="lg">
                {/* Tabs */}
                <TabsWrapper>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: "4px"
                        }}
                    >
                        {tabs.map((label, index) => (
                            <TabButton
                                key={index}
                                active={activeTab === index}
                                onClick={() => setActiveTab(index)}
                            >
                                {label}
                            </TabButton>
                        ))}
                    </Box>
                </TabsWrapper>

                {/* Content */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Box
                            component="img"
                            src={assets.hero_human_resource}
                            sx={{
                                width: '500%',
                                maxWidth: '500px',
                                aspectRatio: '4 / 3',
                                borderRadius: '12px',
                                backgroundColor: '#ccc',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    </Box>
                    <Box sx={{width: '50%'}}>
                        <Heading>
                            Receive Support from <br />
                            Ship Cause Pros
                        </Heading>
                        <Description>
                            With our concierge shipping services, you don’t have to be a specialist in shipping. Your assigned shipping liaison becomes an extension of your team. You will be assigned a dedicated concierge service representative to assist you with any questions or concerns you or your customers may have throughout the entirety of the shipping process.
                            <br /><br />
                            Your liaison can assist with any claims, supply orders, rerouting of packages and last-minute address changes.
                        </Description>
                        <LearnMore href="#">
                            Learn more about the benefits of a live liaison →
                        </LearnMore>
                    </Box>
                </Box>
            </Container>
        </SectionWrapper>
    );
};

export default HeroSection;
