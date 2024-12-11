import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import background from '../assets/images/landingbackground.jpeg';
import Header from '../components/Header';
import ProductImage from '../assets/images/nicebackground.png'; // Example product image

const Root = styled(Box)({
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const Content = styled(Container)({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  textAlign: 'center',
});

const Tagline = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '2.5rem',
  marginBottom: '16px',
});

const Description = styled(Typography)({
  fontSize: '1.25rem',
  marginBottom: '32px',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const StyledButton = styled(Button)({
  backgroundColor: '#FF8C00',
  color: '#fff',
  padding: '12px 32px',
  '&:hover': {
    backgroundColor: '#FF7000',
  },
});

const ImageContainer = styled(Box)({
  marginTop: '32px',
});

const ProductImg = styled('img')({
  maxWidth: '90%',  // Increase the max width
  width: '500px',   // Set a fixed width
  height: 'auto',   // Maintain aspect ratio
  borderRadius: '8px',
});

const Footer = styled(Box)({
  padding: '16px',
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const LandingPage = () => {
  const navigate = useNavigate(); // Use navigate hook

  // Function to handle button click
  const handleGetStarted = () => {
    navigate('/next'); // Navigate to /next route
  };

  return (
    <Root>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Content>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Tagline variant="h1">
              Anonymise Your Documents Securely
            </Tagline>
            <Description variant="body1">
              With Redactify, protect sensitive information in your documents using our AI-powered redaction and synthesized technology. Upload, preview, and secure your data with ease.
            </Description>
            <StyledButton variant="contained" onClick={handleGetStarted}>
              Get Started
            </StyledButton>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageContainer>
              <ProductImg src={ProductImage} alt="Redactify Product" />
            </ImageContainer>
          </Grid>
        </Grid>
      </Content>

      {/* Footer */}
      <Footer>
        <Typography variant="body2">
          © 2024 Redactify. All rights reserved.
        </Typography>
      </Footer>
    </Root>
  );
};

export default LandingPage;
