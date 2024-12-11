import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectFile from './components/SelectFile';
import Landing from './components/Landin';
import './App.css'; 
import Loader from './components/Loader';
import Next from './components/Nextpage';
import Redact from './components/RedactFile';
import Download from './components/DownloadFile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/selectfile" element={<SelectFile/>}/>
        <Route path="/" element={<Landing/>}/>
        <Route path="/loader" element={<Loader/>}/>
        <Route path="/next" element={<Next/>}/>
        <Route path="/redact" element={<Redact/>}/>
        <Route path="/download" element={<Download/>}/>
      </Routes>
    </Router>
  );
}

export default App;
