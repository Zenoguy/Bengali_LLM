import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useLang } from '../context/LanguageContext';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const defaultText = "নমস্কার! আমি একটি বাংলা এআই। আপনাকে কীভাবে সাহায্য করতে পারি?";

function TypewriterEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Start typing after a short delay to ensure component is in view
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, 800);

    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (!isTyping) return;
    
    let i = 0;
    setDisplayedText('');
    
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        // Reset and retype after 5 seconds
        setTimeout(() => {
          setIsTyping(false);
          setDisplayedText('');
          setTimeout(() => setIsTyping(true), 500);
        }, 5000);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [text, isTyping]);

  return (
    <Typography sx={{ fontStyle: 'italic', color: '#666', fontSize: '1.1rem', fontFamily: 'Galada, cursive', opacity: 0.8, minHeight: '3.3rem' }}>
      "{displayedText}"
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        style={{ display: 'inline-block', width: '4px', height: '1.1rem', background: '#B22222', marginLeft: '4px', verticalAlign: 'middle', opacity: isTyping ? 1 : 0 }}
      />
    </Typography>
  );
}

export default function ChatDemo() {
  const { t, lang } = useLang();

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <Box
      id="demo"
      component={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      sx={{
        py: { xs: 12, md: 16 },
        position: 'relative',
        background: 'transparent',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 8 } }}>
        <Grid container spacing={{ xs: 8, md: 4 }} alignItems="center">
          {/* Left Side: Character/Illustration */}
          <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Box
                component="img"
                src="/pointing.png"
                alt="Representative pointing to demo"
                sx={{
                  width: '100%',
                  maxWidth: 350,
                  height: 'auto',
                }}
              />
            </motion.div>
          </Grid>

          {/* Middle: Text Content */}
          <Grid size={{ xs: 12, md: 4.5 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, pl: { md: 4 } }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="overline"
                  sx={{
                    color: '#B22222',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    fontSize: '0.75rem',
                    display: 'block',
                    mb: 2.5,
                    fontFamily: 'Hind Siliguri, sans-serif',
                  }}
                >
                  {t('chat_section_label')}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.4rem', md: '3.2rem' },
                    fontWeight: 900,
                    color: '#1C1C1C',
                    mb: 3,
                    lineHeight: 1.1,
                    fontFamily: 'Hind Siliguri, sans-serif',
                  }}
                >
                  {lang === 'bn' ? 'অনুভূতিশীল বাংলা এআই' : 'Experience the Future of Bengali LLM'}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    color: '#4A4A4A',
                    maxWidth: 480,
                    mb: 6,
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    lineHeight: 1.6,
                    fontFamily: 'Hind Siliguri, sans-serif',
                  }}
                >
                  {lang === 'bn' 
                    ? 'আমাদের মডেলের সাথে সরাসরি কথা বলুন এবং দেখুন এটি কতটা সঠিকভাবে বাংলা বুঝতে ও উত্তর দিতে পারে।'
                    : 'Interact with our state-of-the-art model and see how it masters the nuances of the Bengali language.'
                  }
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  component={RouterLink}
                  to="/demo"
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #B22222, #8B1A1A)',
                    color: '#FFFFFF',
                    borderRadius: '16px',
                    px: 6,
                    py: 2.2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontFamily: 'Hind Siliguri, sans-serif',
                    boxShadow: '0 12px 32px rgba(178,34,34,0.3)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 18px 40px rgba(178,34,34,0.4)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  {lang === 'bn' ? 'এখনই ডেমো শুরু করুন' : 'Launch Live Demo'}
                </Button>
              </motion.div>
            </Box>
          </Grid>

          {/* Right: Simplified Intuitive Demo UI */}
          <Grid size={{ xs: 12, md: 4.5 }}>
            <Box 
              component={motion.div}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              sx={{ 
                position: 'relative',
                width: '100%',
                maxWidth: 480,
                mx: 'auto'
              }}
            >
              <Box
                component={RouterLink}
                to="/demo"
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  background: '#FFFFFF',
                  p: 4,
                  borderRadius: 6,
                  border: '1px solid rgba(178,34,34,0.15)',
                  position: 'relative',
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: '#B22222',
                    background: 'rgba(255,255,255,0.9)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                  <Avatar sx={{ width: 64, height: 64, background: 'linear-gradient(135deg, #B22222, #FFDB58)' }}>
                    <AutoAwesomeIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: '#1C1C1C', fontSize: '1.3rem', fontFamily: 'Hind Siliguri, sans-serif' }}>
                      Bengali LLM v1.0
                    </Typography>
                    <Typography sx={{ color: '#4A4A4A', fontSize: '0.9rem', fontFamily: 'Hind Siliguri, sans-serif' }}>
                      Online • Ready to Chat
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ background: 'rgba(0,0,0,0.02)', p: 3, borderRadius: 3, mb: 3 }}>
                  <TypewriterEffect text={defaultText} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <Typography sx={{ color: '#B22222', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Hind Siliguri, sans-serif' }}>
                     Try live conversation →
                   </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

