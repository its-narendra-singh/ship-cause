import React from 'react';
import { Box, Grid, Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const FooterContainer = styled(Box)`
  background-color: #fff;
  padding: 1rem 4rem;
  font-family: 'Raleway', sans-serif;
  border-top: 1px solid #ddd;
`;

const SectionTitle = styled(Typography)`
  font-weight: 600;
  color: #6a1b9a;
  margin-bottom: 16px;
`;

const FooterLink = styled(Link)`
  display: block;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: #6a1b9a;
  }
`;

const SocialIcon = styled(Box)`
  display: flex;
  gap: 12px;
  margin-top: 12px;

  & svg {
    color: #f15a24;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const FacebookBox = styled(Box)`
  background-color: #f6f6f6;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  max-width: 250px;
  gap: 12px;
  font-weight: bold;
  color: #4a0072;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 1.3;
`;

const FooterBottom = styled(Box)`
  text-align: center;
  font-size: 14px;
  margin-top: 32px;
  padding-top: 16px;
  color: #444;
  border-top: 1px solid #ccc;
`;

const Footer: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <FooterContainer>
            <Grid container spacing={10}>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 500 }}>
                        Say goodbye to shipping woes <br /> and say hello to the Ship Cause Pros.
                    </Typography>
                    <SocialIcon>
                        <FacebookIcon />
                        <InstagramIcon />
                        <TwitterIcon />
                        <YouTubeIcon />
                    </SocialIcon>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <SectionTitle>Links</SectionTitle>
                    <FooterLink href="#">About</FooterLink>
                    <FooterLink href="#">Contact</FooterLink>
                    <FooterLink href="#">Integrations</FooterLink>
                    <FooterLink href="#">Features</FooterLink>
                    <FooterLink href="#">Blog</FooterLink>
                    <FooterLink href="#">Quick Quote</FooterLink>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <SectionTitle>Resources</SectionTitle>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Terms of Service</FooterLink>
                    <FooterLink href="#">FAQ</FooterLink>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <SectionTitle>Actions</SectionTitle>
                    <FooterLink href="#">Sign Up</FooterLink>
                    <FooterLink href="#">Log in</FooterLink>
                    <FooterLink href="#">Careers</FooterLink>
                </Grid>

                <Grid item xs={12} md={3}>
                    <FacebookBox>
                        <FacebookIcon fontSize="medium" />
                        Join Our <br /> Facebook Community
                    </FacebookBox>
                </Grid>
            </Grid>

            <FooterBottom>© 2023 Ship Cause</FooterBottom>
        </FooterContainer>
    );
};

export default Footer;
