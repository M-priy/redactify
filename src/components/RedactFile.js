import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  TextField,
} from '@mui/material';
import { faker } from '@faker-js/faker'; // Adjusted import statement
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Dropzone from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import WarningIcon from '@mui/icons-material/Warning';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import img from '../assets/images/selectfile.webp';
import background from '../assets/images/landingbackground.jpeg';
import Footer from '../components/Footer';

// Styled Components
const Root = styled(Box)({
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  color: '#fff',
});

const Content = styled(Container)({
  flexGrow: 1,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const ImageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '24px',
  width: '100%',
});

const StyledCard = styled(Card)({
  padding: '32px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  backgroundColor: '#ffffff',
  width: '100%',
  maxWidth: '800px',
  textAlign: 'center',
  marginBottom: '24px',
});

const FileDropzone = styled('div')({
  border: '2px dashed #6200ea', 
  borderRadius: '8px',
  padding: '24px',
  backgroundColor: '#f3e5f5',
  cursor: 'pointer',
  marginBottom: '24px',
});

const FileNameContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '16px',
  marginBottom: '16px',
});

const WarningAlert = styled(Alert)({
  backgroundColor: '#f3e5f5',
  color: '#784bd6',
  border: '1px solid #6200ea',
  padding: '16px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  position: 'relative',
});


const WarningIconStyled = styled(WarningIcon)({
  fontSize: '32px',
  marginRight: '12px',
});

const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
});

const SearchField = styled(TextField)({
  marginRight: '8px',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
});

const TableHeaderCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#d1c4e9',
  color: '#4a148c',
  borderBottom: '2px solid #ab47bc',
  padding: '12px',
});

const TableCellStyled = styled(TableCell)(({ theme, isHighlighted }) => ({
  padding: '12px',
  cursor: 'pointer',
  backgroundColor: isHighlighted ? '#e1bee7' : 'inherit',
  '&:hover': {
    backgroundColor: '#e1bee7',
  },
}));

// Main Component
const RedactFile = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [piiDetected, setPiiDetected] = useState(false);
  const [piiData, setPiiData] = useState([]);
  const [selectedPII, setSelectedPII] = useState([]);
  const [redactLoading, setRedactLoading] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [highlightedPII, setHighlightedPII] = useState([]);
  const [synthesizeOpen, setSynthesizeOpen] = useState(false);
  const [dummyData, setDummyData] = useState([]);
  const [synthesizedPII, setSynthesizedPII] = useState([]); // New state for synthesized PII

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setFileName(file.name);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      detectPII();
    }, 4000);
  };

  const detectPII = () => {
    const dummyPII = [
      { pii: '8059 2930 2324', type: 'Government ID' },
      { pii: 'Madhu Priya', type: 'Name' },
      { pii: 'madhu@example.com', type: 'Email' },
      { pii: '6543216789', type: 'Phone Number' },
    ];
  
    setPiiData(dummyPII);
    setPiiDetected(true);
    setAlertOpen(true);
  };

  const handlePIISelection = (pii) => {
    setSelectedPII((prevSelected) => {
      if (prevSelected.includes(pii)) {
        return prevSelected.filter((item) => item !== pii);
      } else {
        return [...prevSelected, pii];
      }
    });
  };

  const handleRedact = () => {
    setRedactLoading(true);
    setTimeout(() => {
      setRedactLoading(false);
      setShowDownload(true);
    }, 3000);
  };

  const handleSynthesizeOpen = () => {
    setSynthesizeOpen(true);
    generateSynthesizedData(); 
    
  };


  const generateSynthesizedData = () => {
    const newSynthesizedData = piiData.map((item) => {
      let offeredValue;
  
      switch (item.type) {
        case 'Name':
          offeredValue = faker.name.fullName(); // Use Faker to generate a random name
          break;
        case 'Email':
          offeredValue = faker.internet.email(faker.name.firstName().toLowerCase(), faker.name.lastName().toLowerCase(), 'example.com'); // Generate Indian-style emails
          break;
        case 'Phone Number':
          offeredValue = `${faker.phone.number('##########')}`; // Indian phone number format
          break;
        case 'Government ID':
          offeredValue = `${faker.string.numeric(12)}`; // Simulate an Aadhaar number
          break;
        default:
          offeredValue = 'N/A';
      }
  
      console.log(`Identified: ${item.pii}, Offered: ${offeredValue}`); // Log for debugging
      return { identified: item.pii, offered: offeredValue };
    });
  
    setSynthesizedPII(newSynthesizedData); // Update state with new synthesized data
  };
  
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName('');
    setPiiData([]);
    setPiiDetected(false);
    setSelectedPII([]);
    setShowDownload(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleDownload = () => {
    const blob = new Blob(['Redacted file content'], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'redacted_file.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  // document.body.releasePointerCapture(b);
  // a.href=url;




  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleCellClick = (pii) => {
    setHighlightedPII((prevHighlighted) => {
      if (prevHighlighted.includes(pii)) {
        return prevHighlighted.filter((item) => item !== pii);
      } else {
        return [...prevHighlighted, pii];
      }
    });
    handlePIISelection(pii);
  };

  const refreshSynthesizedData = () => {
    generateSynthesizedData(); 
  };



  const generateDummyData = () => {
    const newDummyData = selectedPII.map((pii) => {
      switch (pii) {
        case 'Name':
          return { pii: 'John Doe', type: 'Name' };
        case 'Email':
          return { pii: 'john.doe@example.com', type: 'Email' };
        case 'Phone Number':
          return { pii: '123-456-7890', type: 'Phone Number' };
        case 'Government ID':
          return { pii: '123-45-6789', type: 'Government ID' };
        default:
          return { pii: 'N/A', type: 'Unknown' };
      }
    });
    setDummyData(newDummyData);
  };

  const refreshDummyData = () => {
    const newDummyData = selectedPII.map((pii) => {
      switch (pii) {
        case 'Name':
          return { pii: 'Alice Smith', type: 'Name' };
        case 'Email':
          return { pii: 'alice.smith@example.com', type: 'Email' };
        case 'Phone Number':
          
          return { pii: '987-654-3210', type: 'Phone Number' };
        case 'Government ID':
          return { pii: '987-65-4321', type: 'Government ID' };
        default:
          return { pii: 'N/A', type: 'Unknown' };
      }
    });
    setDummyData(newDummyData);
  };

  const filteredPIIData = piiData
    .filter(item => item.type.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.type.localeCompare(b.type);
      } else {
        return b.type.localeCompare(a.type);
      }
    });

  return (
    <Root>
      <Header />
      <Content>
        <StyledCard>
          <ImageContainer>
            <img src={img} alt="Upload" style={{ width: '100%', maxWidth: '400px' }} />
          </ImageContainer>
          <Typography variant="h5" gutterBottom>Upload File</Typography>
          <Dropzone onDrop={handleFileDrop} accept =".xlsx, .xls">
            {({ getRootProps, getInputProps }) => (
              <FileDropzone {...getRootProps()}>
                <input  {...getInputProps()} />
                <Typography variant ="body1">Drag & drop a file here, or click to select one</Typography>
              </FileDropzone>
            )}
          </Dropzone>
          {isLoading && (
            <Box mt={2}>
              <CircularProgress />
              <Typography variant="body2" color="textSecondary" mt={1}>Processing file...</Typography>
            </Box>
          )}
          {fileName && !isLoading && (
            <FileNameContainer>
              <Typography variant="h6">Uploaded File: {fileName}</Typography>
              <IconButton onClick={handleRemoveFile} color="inherit">
                <DeleteIcon />
              </IconButton>
            </FileNameContainer>
          )}
        </StyledCard>
      </Content>
      <Footer />

      {/* Enhanced Alert Dialog */}
      <Dialog open={alertOpen} onClose={handleAlertClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ backgroundColor: '#784bd6', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <WarningIconStyled /> Detected Personal Identifiable Information 
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <WarningAlert>
              <Box display="flex" alignItems="center" mb={2}>
                <WarningIconStyled />
                <Typography variant="body2" component="div">
                  This file contains sensitive information. Select the PII you wish to redact.
                </Typography>
              </Box>
              <SearchContainer>
                <SearchField
                  size="small"
                  placeholder="Search PII Type"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    endAdornment: <SearchIcon />,
                  }}
                />
                <IconButton onClick={handleSortChange} sx={{ color: '#6200ea' }}>
                  <SortIcon />
                </IconButton>
              </SearchContainer>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Identified PII</TableHeaderCell>
                      <TableHeaderCell>
                        <Box display="flex" alignItems="center">
                          Type of PII
                          <IconButton onClick={handleSortChange} sx={{ marginLeft: '8px', color: '#6200ea' }}>
                            <SortIcon/>
                          </IconButton>
                        </Box>
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPIIData.map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCellStyled>{item.pii}</TableCellStyled>
                        <TableCellStyled
                          isHighlighted={highlightedPII.includes(item.pii)}
                          onClick={() => handleCellClick(item.pii)}
                        >
                          {item.type}
                        </TableCellStyled>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {highlightedPII.length > 0 && (
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleRedact}

                    sx={{ backgroundColor:'#ff5722', color: '#fff' }}
                  >
                    
                    Redact
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSynthesizeOpen}
                    sx={{ marginLeft: '8px' }}
                  >
                    Synthesize
                  </Button>
                </Box>
              )}
            </WarningAlert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>


      {/* Synthesize Dialog */}
      <Dialog open={synthesizeOpen} onClose={() => setSynthesizeOpen(false)} fullWidth maxWidth="md">
  <DialogTitle>Synthesized PII</DialogTitle>
  <DialogContent>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Identified PII</TableHeaderCell>
            <TableHeaderCell>Offered PII</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {synthesizedPII.map((item, index) => (
            <TableRow key={index}>
              <TableCellStyled>{item.identified}</TableCellStyled>
              <TableCellStyled>{item.offered}</TableCellStyled>
              <TableCellStyled>
                <IconButton onClick={refreshSynthesizedData}>
                  <RefreshIcon />
                </IconButton>
              </TableCellStyled>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setSynthesizeOpen(false)} color="secondary">
      Close
    </Button>
  </DialogActions>
</Dialog>

      <Dialog open={redactLoading} onClose={() => {}} fullWidth maxWidth="sm">
        <DialogTitle>Redacting PII</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress />
            <Typography variant="body2" color="textSecondary" mt={2}>
              Please wait while we redact the selected PII from the file.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={showDownload} onClose={() => {}} fullWidth maxWidth="sm">
        <DialogTitle>Redaction Complete</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            The selected PII has been successfully redacted.
          </Typography>
          <Button
            variant="contained"
            color="warning"
            onClick={handleDownload}
            sx={{ marginTop: '16px', backgroundColor: '#ff5722', color: '#fff' }}
          >

            Download Redacted File
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDownload(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Root>
  );
};

export default RedactFile;
