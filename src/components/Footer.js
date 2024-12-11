// src/components/Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled(Box)({
  backgroundColor: '#010954',
  color: '#fff',
  padding: '7px',
  textAlign: 'center',
  position: 'relative',
  bottom: 0,
  width: '100%',
});

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="body2">
        © 2024 Redactify. All rights reserved.
      </Typography>
      <Box mt={2}>
        <Link href="#" color="inherit" underline="hover" mx={1}>
          Privacy Policy
        </Link>
        |
        <Link href="#" color="inherit" underline="hover" mx={1}>
          Terms of Service
        </Link>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
