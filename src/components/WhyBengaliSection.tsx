import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ManuscriptScroll, FracturedChauMask, LotusPradip, CornerAlpana } from './BengaliIcons';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const cards = [
  {
    icon: ManuscriptScroll,
    titleKey: 'why_card_1_title',
    descKey: 'why_card_1_desc',
    accent: '#B22222', // Terracotta
    glow: 'rgba(178,34,34,0.1)',
  },
  {
    icon: FracturedChauMask,
    titleKey: 'why_card_2_title',
    descKey: 'why_card_2_desc',
    accent: '#FFDB58', // Mustard
    glow: 'rgba(255,219,88,0.15)',
  },
  {
    icon: LotusPradip,
    titleKey: 'why_card_3_title',
    descKey: 'why_card_3_desc',
    accent: '#002366', // Royal Blue
    glow: 'rgba(0,35,102,0.1)',
  },
];

export default function WhyBengaliSection() {
  const { t } = useLang();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <Box
      id="why"
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
      {/* Decorative Corner Motifs */}
      <CornerAlpana 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: 350, 
          height: 350, 
          color: '#B22222', 
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
        }} 
      />
      <CornerAlpana 
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          right: 0, 
          width: 350, 
          height: 350, 
          color: '#B22222', 
          opacity: 0.12, 
          transform: 'rotate(180deg)',
          pointerEvents: 'none',
          zIndex: 0,
        }} 
      />
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
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
              {t('why_section_label')}
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.4rem', md: '3.5rem' },
                fontWeight: 900,
                color: '#1C1C1C',
                maxWidth: 800,
                mx: 'auto',
                mb: 3,
                lineHeight: 1.1,
                fontFamily: 'Hind Siliguri, sans-serif',
              }}
            >
              {t('why_title')}
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Typography
              sx={{
                color: '#4A4A4A',
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.6,
                fontFamily: 'Hind Siliguri, sans-serif',
              }}
            >
              {t('why_subtitle')}
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={5} alignItems="stretch">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isSolution = index === 2;
            
            return (
              <Grid key={card.titleKey} size={{ xs: 12, md: 4 }}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  style={{ height: '100%', display: 'flex' }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      p: 5,
                      borderRadius: 6,
                      position: 'relative',
                      overflow: 'hidden',
                      background: isSolution 
                        ? 'linear-gradient(to bottom, #f0fdf4, #f0f9ff)' 
                        : 'linear-gradient(to bottom, #ffffff, #fcfcfb)',
                      border: '1px solid',
                      borderColor: isSolution ? 'rgba(0, 128, 128, 0.15)' : 'rgba(0,0,0,0.06)',
                      boxShadow: isSolution 
                        ? '0 25px 60px rgba(0,0,0,0.08)' 
                        : '0 10px 30px rgba(0,0,0,0.04)',
                      transform: isSolution ? { md: 'scale(1.08)' } : 'none',
                      zIndex: isSolution ? 2 : 1,
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      opacity: !isSolution ? 0.92 : 1,
                      '&:hover': {
                        borderColor: isSolution ? 'rgba(0, 128, 128, 0.3)' : `${card.accent}40`,
                        boxShadow: isSolution 
                          ? '0 35px 80px rgba(0,0,0,0.12)' 
                          : '0 20px 50px rgba(0,0,0,0.08)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: 5,
                        background: isSolution 
                          ? `linear-gradient(90deg, #008080, #002366)` 
                          : `linear-gradient(90deg, ${card.accent}, transparent)`,
                      },
                    }}
                  >
                   <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2.5,
                      background: `${card.glow}`,
                      border: `1px solid ${card.accent}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 4,
                    }}
                  >
                    <Icon sx={{ width: 42, height: 42, color: card.accent }} />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: isSolution ? '#002366' : '#1C1C1C',
                      mb: 2,
                      fontFamily: 'Hind Siliguri, sans-serif',
                      fontSize: isSolution ? '1.6rem' : '1.4rem',
                    }}
                  >
                    {t(card.titleKey)}
                  </Typography>
                  <Typography
                    sx={{
                      color: isSolution ? '#002366' : '#4A4A4A',
                      opacity: isSolution ? 0.9 : 0.8,
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      fontFamily: 'Hind Siliguri, sans-serif',
                    }}
                  >
                    {t(card.descKey)}
                  </Typography>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

