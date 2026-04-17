import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyBengaliSection from './components/WhyBengaliSection';
import HowItWorks from './components/HowItWorks';
import DatasetsSection from './components/DatasetsSection';
import ComparisonSection from './components/ComparisonSection';
import ChatDemo from './components/ChatDemo';
import Footer from './components/Footer';
import ChatPage from './components/ChatPage';

import SectionDivider from './components/SectionDivider';

function LandingPage() {
  return (
    <Box sx={{ background: '#F5F5DC', position: 'relative' }}>
      <Navbar />
      <HeroSection />
      <SectionDivider type="alpana" />
      <WhyBengaliSection />
      <SectionDivider type="dots" />
      <HowItWorks />
      <SectionDivider type="alpana" flip />
      <DatasetsSection />
      <SectionDivider type="dots" />
      <ComparisonSection />
      <SectionDivider type="alpana" />
      <ChatDemo />
      <Footer />
      
      {/* Global Background Motifs */}
      <Box 
        sx={{ 
          position: 'fixed', 
          inset: 0, 
          pointerEvents: 'none', 
          zIndex: 0,
          opacity: 0.03,
          background: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")',
        }} 
      />
    </Box>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/demo" element={<ChatPage />} />
            </Routes>
          </Box>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
