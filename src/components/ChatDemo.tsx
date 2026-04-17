import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useLang } from '../context/LanguageContext';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ChatDemo() {
  const { t, lang } = useLang();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 8, md: 12 }
          }}
        >
          {/* Text Content */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
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
                  fontSize: { xs: '2.4rem', md: '3.5rem' },
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
                  maxWidth: 540,
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

          {/* Immersive Preview Card */}
          <Box 
            component={motion.div}
            variants={itemVariants}
            sx={{ 
              flex: 1, 
              position: 'relative',
              width: '100%',
              maxWidth: 520,
            }}
          >
            <Box
              sx={{
                background: '#FFFFFF',
                borderRadius: 6,
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 1
              }}
            >
              {/* Fake Chat Header */}
              <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 40, height: 40, background: 'linear-gradient(135deg, #B22222, #FFDB58)' }}>
                  <AutoAwesomeIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Box>
                  <Box sx={{ width: 100, height: 10, background: 'rgba(0,0,0,0.08)', borderRadius: 5, mb: 1 }} />
                  <Box sx={{ width: 60, height: 8, background: 'rgba(0,0,0,0.04)', borderRadius: 4 }} />
                </Box>
              </Box>
              
              {/* Fake Messages */}
              <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ alignSelf: 'flex-start', background: 'rgba(0,0,0,0.03)', p: 2.5, borderRadius: '20px 20px 20px 4px', maxWidth: '85%' }}>
                  <Box sx={{ width: 220, height: 10, background: 'rgba(0,0,0,0.08)', borderRadius: 5, mb: 1.5 }} />
                  <Box sx={{ width: 140, height: 10, background: 'rgba(0,0,0,0.08)', borderRadius: 5 }} />
                </Box>
                <Box sx={{ alignSelf: 'flex-end', background: '#B22222', p: 2.5, borderRadius: '20px 20px 4px 20px', maxWidth: '75%' }}>
                  <Box sx={{ width: 140, height: 10, background: 'rgba(255,255,255,0.3)', borderRadius: 5 }} />
                </Box>
                <Box sx={{ alignSelf: 'flex-start', background: 'rgba(0,0,0,0.03)', p: 2.5, borderRadius: '20px 20px 20px 4px', maxWidth: '85%' }}>
                  <Box sx={{ width: 260, height: 10, background: 'rgba(0,0,0,0.08)', borderRadius: 5, mb: 1.5 }} />
                  <Box sx={{ width: 180, height: 10, background: 'rgba(0,0,0,0.08)', borderRadius: 5 }} />
                </Box>
              </Box>
              
              {/* Fake Input */}
              <Box sx={{ p: 3, borderTop: '1px solid rgba(0,0,0,0.04)', display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1, height: 48, background: 'rgba(0,0,0,0.03)', borderRadius: 4 }} />
                <Box sx={{ width: 48, height: 48, background: '#B22222', borderRadius: '16px' }} />
              </Box>

              {/* Interaction Overlay */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'rgba(255,251,230,0.15)', 
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  transition: 'all 0.4s',
                  '&:hover': { backdropFilter: 'blur(2px)', background: 'rgba(255,251,230,0.05)' }
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={RouterLink}
                    to="/demo"
                    variant="contained"
                    sx={{
                      background: '#1C1C1C',
                      color: '#FFFFFF',
                      borderRadius: 12,
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 700,
                      fontFamily: 'Hind Siliguri, sans-serif',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
                      '&:hover': { background: '#000000' }
                    }}
                  >
                    Click to Open Demo
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

