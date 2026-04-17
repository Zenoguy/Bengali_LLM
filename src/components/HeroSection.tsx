import { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as RouterLink } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const BENGALI_CHARS = ['অ', 'আ', 'ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ট', 'ড', 'ণ', 'ত', 'দ', 'ন', 'প', 'ব', 'ম', 'য', 'র', 'ল', 'শ', 'স', 'হ', 'ড়', 'ঢ়'];

interface FloatingChar {
  char: string;
  x: number;
  yStart: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

function generateChars(count: number): FloatingChar[] {
  return Array.from({ length: count }, (_, i) => ({
    char: BENGALI_CHARS[i % BENGALI_CHARS.length],
    x: Math.random() * 100,
    yStart: 100 + Math.random() * 20,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 10,
    size: 1.2 + Math.random() * 2.2,
    opacity: 0.06 + Math.random() * 0.12,
  }));
}

const chars = generateChars(24);

export default function HeroSection() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      ref={heroRef}
      component={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#F5F5DC url(/bhadrolok_cha_paper.png)',
        backgroundSize: '38%',
        backgroundPosition: '-5% center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'rgba(245, 245, 220, 0.2)', // Slightly lighter overlay
          zIndex: 0,
        }
      }}
    >

      {chars.map((c, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', x: `${c.x}vw`, opacity: 0 }}
          animate={{ y: '-10vh', opacity: c.opacity }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            delay: c.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontSize: `${c.size}rem`,
            color: i % 2 === 0 ? '#B22222' : '#FFDB58',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {c.char}
        </motion.div>
      ))}

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          px: { xs: 2, md: 4 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Chip
            label={t('hero_label')}
            size="small"
            sx={{
              mb: 4,
              background: 'rgba(178,34,34,0.08)',
              border: '1px solid rgba(178,34,34,0.2)',
              color: '#B22222',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'Hind Siliguri, sans-serif',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '2.8rem', sm: '4rem', md: '6.5rem', lg: '7.5rem' },
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#1C1C1C',
              fontFamily: 'Galada, cursive',
              mb: 1,
              textShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}
          >
            {t('hero_title_1')}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Typography
            component="span"
            sx={{
              display: 'block',
              fontSize: { xs: '2.2rem', sm: '3.5rem', md: '5.5rem', lg: '6.5rem' },
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              background: 'linear-gradient(135deg, #B22222 0%, #D32F2F 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Galada, cursive',
              mb: 5,
            }}
          >
            {t('hero_title_2')}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#4A4A4A',
              fontWeight: 500,
              mb: 2,
              fontSize: { xs: '1.2rem', md: '1.6rem' },
              fontFamily: 'Hind Siliguri, sans-serif',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            {t('hero_subtitle')}
          </Typography>
          <Typography
            sx={{
              color: '#B22222',
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.1rem' },
              letterSpacing: '0.04em',
              mb: 8,
              fontFamily: 'Hind Siliguri, sans-serif',
            }}
          >
            — "{t('hero_tagline')}"
          </Typography>
        </motion.div>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          sx={{
            display: 'flex',
            gap: 2.5,
            justifyContent: 'center',
            flexWrap: 'wrap',
            mb: 12,
          }}
        >
          <Button
            component={RouterLink}
            to="/demo"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: { xs: 4, md: 6 },
              py: 2.2,
              fontSize: '1.1rem',
              borderRadius: '14px',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontWeight: 700,
              boxShadow: '0 12px 28px rgba(178,34,34,0.25)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 18px 36px rgba(178,34,34,0.3)',
              },
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {t('hero_cta_primary')}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={scrollToResults}
            sx={{
              px: { xs: 4, md: 6 },
              py: 2.2,
              fontSize: '1.1rem',
              borderRadius: '14px',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontWeight: 700,
              color: '#B22222',
              borderColor: 'rgba(178,34,34,0.3)',
              background: 'rgba(178,34,34,0.02)',
              '&:hover': {
                borderColor: '#B22222',
                background: 'rgba(178,34,34,0.05)',
                transform: 'translateY(-4px)',
              },
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {t('hero_cta_secondary')}
          </Button>
        </Box>
      </Container>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          cursor: 'pointer',
          color: '#B22222',
        }}
        onClick={() => document.querySelector('#why')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 48, opacity: 0.6 }} />
      </motion.div>
    </Box>
  );
}

