import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Landing.css';
import image1 from '../assets/images/backgroundfirst.jpeg';
import image3 from '../assets/images/image3.jpeg';
import leftSvg from '../assets/svg/leftsvg.svg';
import rightSvg from '../assets/svg/rightsvg.svg';


import Header from './Header';
import { Typography } from '@mui/material';

const Landing = () => {
  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate('/selectfile');
  };

  const handleRightClick = () => {
    navigate('/existing');
  };

  return (
    <div className="container">
      <div className="image1" style={{ backgroundImage: `url(${image1})` }}>
        <Header />
        <div className="text-overlay">
          <h1>Effortless Data Redaction</h1>
          <p>Securely manage/Review your redactions</p>
        </div>
      </div>
      <div className="image3" style={{ backgroundImage: `url(${image3})` }}>
        <div className="svg-container" onClick={handleLeftClick}>
          <img src={leftSvg} alt="Left SVG" className="left-svg" />
          <Typography className="svg-text" variant='h4'>Redact New File</Typography>
        </div>
        <div className="svg-container" onClick={handleRightClick}>
          <img src={rightSvg} alt="Right SVG" className="right-svg" />
          <Typography className="svg-text" variant='h4'>Redacted Files</Typography>
        </div>
      </div>
    </div>
  );
};
export default Landing;        
