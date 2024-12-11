import React, { useState } from 'react';
import { Box, Typography, Button, Container, Card, IconButton, Grid, Pagination, TextField } from '@mui/material';
import { styled } from '@mui/system';
import DownloadIcon from '@mui/icons-material/Download';
import background from '../assets/images/landingbackground.jpeg';
import Header from '../components/Header';
import downloadimg from '../assets/images/download.png';

// Styled Components
const Root = styled(Box)({
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexGrow: 1,
  padding: '24px',
  paddingTop: '60px',
  position: 'relative', // Ensures correct layout for fixed positioning
});

const StyledCard = styled(Card)({
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '450px', // Set the maximum height to show only three files
    overflowY: 'auto', // Make the content scrollable if it exceeds the max height
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop:'1%'
  });

const FileItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f9f9f9',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '16px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const FileName = styled(Typography)({
  fontWeight: 'bold',
  color: '#333',
});

const DataDisplay = styled(Typography)({
  color: '#555',
  fontStyle: 'italic',
});

const RedactionDate = styled(Typography)({
color: '#888',
  fontStyle: 'italic',
  marginTop: '8px',
});

const Footer = styled(Box)({
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
  padding: '16px',
  width: '100%',
  textAlign: 'center',
  position: 'relative',
  bottom: 0,
});

const SearchBar = styled(TextField)({
  width: '100%',
  marginBottom: '16px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& fieldset': {
      borderColor: '#844e9f',
    },
    '&:hover fieldset': {
      borderColor: '#a0a0a0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6b6b6b',
    },
  },
  '& .MuiInputBase-input': {
    padding: '8px 12px',
  },
});

const DownloadImage = styled('img')({
  maxWidth: '400px', // Adjust the size of the download image
  width: '100%',
  height: 'auto',
  marginLeft: '20px',

});

const DownloadFile = () => {
  const files = [
    { name: 'Redacted Document 1.pdf', data: 'Sensitive data removed', date: '2024-08-01' },
    { name: 'Redacted Document 2.docx', data: 'Confidential information redacted', date: '2024-08-02' },
    { name: 'Redacted Document 3.xlsx', data: 'Personal details obscured', date: '2024-08-03' },
    { name: 'Redacted Document 4.pdf', data: 'Sensitive data removed', date: '2024-08-04' },
    { name: 'Redacted Document 5.docx', data: 'Confidential information redacted', date: '2024-08-05' },
    { name: 'Redacted Document 6.xlsx', data: 'Personal details obscured', date: '2024-08-06' },
    { name: 'Redacted Document 7.pdf', data: 'Sensitive data removed', date: '2024-08-07' },
    { name: 'Redacted Document 8.docx', data: 'Confidential information redacted', date: '2024-08-08' },
    { name: 'Redacted Document 9.xlsx', data: 'Personal details obscured', date: '2024-08-09' },
    { name: 'Redacted Document 10.pdf', data: 'Sensitive data removed', date: '2024-08-10' },
    { name: 'Redacted Document 11.docx', data: 'Confidential information redacted', date: '2024-08-11' },
    { name: 'Redacted Document 12.xlsx', data: 'Personal details obscured', date: '2024-08-12' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 4;


  const handleDownload = (fileName) => {
    console.log(`Downloading: ${fileName}`);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  return (
    <Root>
      <Header />
      <StyledContainer>
        <StyledCard>
          <Typography variant="h6" component="h1" gutterBottom>
            <b>Download Your Redacted Files</b>
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
             Click the download icon to save them to your device.
          </Typography>
          <SearchBar
            placeholder="Search by File Name"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Grid container spacing={2}>
            {currentFiles.map((file, index) => (
              <Grid item xs={12} key={index}>
                <FileItem>
                  <Box>
                    <FileName variant="h6">{file.name}</FileName>
                    <DataDisplay variant="body2">{file.data}</DataDisplay>
                    <RedactionDate variant="body2">Redacted on the date: {file.date}</RedactionDate>
                  </Box>
                  <IconButton
                    color="primary"
                    onClick={() => handleDownload(file.name)}
                    sx={{ height: '40px', width: '40px' }}  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </FileItem>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(filteredFiles.length / filesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            style={{ marginTop: '16px' }}
          />
        </StyledCard>
        <DownloadImage src={downloadimg} alt="Download Illustration" />
      </StyledContainer>
      <Footer>
        <Typography variant="body2">
          © 2024 Redactify. All rights are reserved.
        </Typography>
      </Footer>
    </Root>
  );
};

export default DownloadFile;
