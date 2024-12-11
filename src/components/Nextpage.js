import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import Header from './Header';
import RedactImage from '../assets/images/redactnow.png';
import DownloadImage from '../assets/images/download redacted files.png';
import background from '../assets/images/landingbackground.jpeg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Root = styled(Box)({
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',
});

const Content = styled(Container)({
  flexGrow: 1,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '64px', // Adjust this value if necessary to account for header height
});

const StyledCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  maxWidth: '900px', 
  width: '100%',
  marginBottom: '32px',
});

// Image container styling inside the card
const ImageContainer = styled(Box)({
  flex: 1.5, // Increased to make image larger
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Button styling
const StyledButton = styled(Button)({
  backgroundColor: '#FF8C00',
  color: '#fff',
  padding: '12px 24px',
  '&:hover': {
    backgroundColor: '#FF7000',
  },
  marginTop: '16px',
});

// Card content styling for text and button
const TextContent = styled(CardContent)({
  flex: 1,
  paddingLeft: '24px', // Add some padding to the left for spacing
});

const Footer = styled(Box)({
  padding: '16px',
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const ExplorePage = () => {
  const navigate = useNavigate(); // Use navigate hook

  const handleGetStarted = () => {
    navigate('/redact'); // Navigate to /next route
  };


  return (
    <Root>
      <Header />
      {/* Main Content */}
      <Content>
        <StyledCard>
          <ImageContainer>
            <img src={RedactImage} alt="Redact Files" style={{ width: '90%', borderRadius: '8px' }} />
          </ImageContainer>
          <TextContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Redact New Files
            </Typography>
            <Typography variant="body1" paragraph>
              Secure your documents by redacting sensitive information. Our AI-powered tool ensures that your privacy is protected.
            </Typography>
            <StyledButton variant="contained" onClick={handleGetStarted}>
              Redact Now
            </StyledButton>
          </TextContent>
        </StyledCard>

        {/* Download Section */}
        <StyledCard>
          {/* Right side text and button */}
          <TextContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Download Redacted Files
            </Typography>
            <Typography variant="body1" paragraph>
              Access your previously redacted documents. Simply download them securely with a single click.
            </Typography>
            <StyledButton variant="contained">
              Download Files
            </StyledButton>
          </TextContent>
          {/* Left side Download Image inside the card */}
          <ImageContainer>
            <img src={DownloadImage} alt="Download Files" style={{ width: '90%', borderRadius: '8px' }} />
          </ImageContainer>
        </StyledCard>
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

export default ExplorePage;
