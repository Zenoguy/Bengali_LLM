import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const steps = [
  { num: '০১', titleKey: 'how_step_1_title', descKey: 'how_step_1_desc', tag: 'Qwen 2.5-3B-Instruct' },
  { num: '০২', titleKey: 'how_step_2_title', descKey: 'how_step_2_desc', tag: 'BanglaRQA + Instructions' },
  { num: '০৩', titleKey: 'how_step_3_title', descKey: 'how_step_3_desc', tag: 'LoRA + 4-bit Quantization' },
  { num: '০৪', titleKey: 'how_step_4_title', descKey: 'how_step_4_desc', tag: 'F1 · ROUGE · METEOR' },
];

export default function HowItWorks() {
  const { t } = useLang();

  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const imageVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, delay: 0.2 },
    },
  };

  return (
    <Box
      id="how"
      component={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      sx={{
        py: { xs: 12, md: 20 },
        position: 'relative',
        background: 'transparent',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 8 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8} alignItems="center">
          {/* Left Side: Content & Cards */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ mb: 8 }}>
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
                  {t('how_section_label')}
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.8rem' },
                    fontWeight: 900,
                    color: '#1C1C1C',
                    mb: 3,
                    lineHeight: 1.1,
                    fontFamily: 'Hind Siliguri, sans-serif',
                  }}
                >
                  {t('how_title')}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    color: '#4A4A4A',
                    maxWidth: 580,
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    lineHeight: 1.6,
                    fontFamily: 'Hind Siliguri, sans-serif',
                  }}
                >
                  {t('how_subtitle')}
                </Typography>
              </motion.div>
            </Box>

            <Grid container spacing={3} alignItems="stretch">
              {steps.map((step) => (
                <Grid key={step.num} size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                  <motion.div 
                    variants={itemVariants} 
                    style={{ display: 'flex', width: '100%', height: '100%' }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: { xs: 3, md: 4 },
                        borderRadius: 5,
                        background: '#FFFFFF',
                        border: '1px solid rgba(178,34,34,0.06)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                        position: 'relative',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        '&:hover': {
                          borderColor: 'rgba(178,34,34,0.4)',
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: '0 25px 60px rgba(178,34,34,0.08)',
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '3rem',
                          fontWeight: 900,
                          color: '#B22222',
                          opacity: 0.1,
                          lineHeight: 1,
                          mb: 1,
                          fontFamily: 'Hind Siliguri, sans-serif',
                          position: 'absolute',
                          top: 15,
                          right: 20,
                        }}
                      >
                        {step.num}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: '#1C1C1C',
                          mb: 1.5,
                          fontSize: '1.2rem',
                          fontFamily: 'Hind Siliguri, sans-serif',
                        }}
                      >
                        {t(step.titleKey)}
                      </Typography>

                      <Typography
                        sx={{
                          color: '#4A4A4A',
                          fontSize: '0.9rem',
                          lineHeight: 1.7,
                          mb: 3,
                          fontFamily: 'Hind Siliguri, sans-serif',
                          flexGrow: 1, // Push the tag to the bottom
                        }}
                      >
                        {t(step.descKey)}
                      </Typography>

                      <Box>
                        <Box
                          sx={{
                            display: 'inline-block',
                            background: 'rgba(255,219,88,0.12)',
                            border: '1px solid rgba(255,219,88,0.4)',
                            borderRadius: '8px',
                            px: 2,
                            py: 0.6,
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            color: '#B22222',
                            fontFamily: 'monospace',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          {step.tag}
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Side: Visual Image */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div variants={imageVariants}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src="/bhadromahlia_phone.png"
                  alt="Bengali context visual"
                  sx={{
                    width: '120%',
                    maxWidth: 650,
                    height: 'auto',
                    transform: 'scale(1.15)', // Zoom
                    borderRadius: '24px',
                    objectFit: 'contain',
                    mr: { md: -10 }, // Push into the corner
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
