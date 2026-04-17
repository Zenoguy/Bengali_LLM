import { useRef, useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useLang } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const examples = [
  {
    category: 'শিক্ষা',
    categoryEn: 'Education',
    question: 'শিক্ষার ভূমিকা কী?',
    before: {
      text: '... শিক্ষা ভূমিকা \'প্রসার\' নামে পরিচিত। এই প্রকল্প মানবসম্পদ উন্নয়নে সহায়তা করে থাকে।',
      issues: ['hallucination', 'factually wrong', 'nonsensical Bengali'],
    },
    after: {
      text: 'শিক্ষা দক্ষ মানবসম্পদ তৈরি করে উন্নয়নে সহায়তা করে।',
      label: 'Exact match with ground truth',
    },
  },
  {
    category: 'সরকারি প্রকল্প',
    categoryEn: 'Government Scheme',
    question: 'রূপশ্রী প্রকল্প কী?',
    before: {
      text: '"Joynabhinath Thakur project" হলো মেয়েদের সহায়তা করার একটি ব্যবস্থা যা বিভিন্ন কারণে তৈরি।',
      issues: ['hallucinated name', 'garbled text', 'completely wrong'],
    },
    after: {
      text: 'রূপশ্রী প্রকল্প হলো দরিদ্র পরিবারের মেয়েদের বিবাহ সহায়তা প্রকল্প।',
      label: 'Correct scheme, no hallucination',
    },
  },
  {
    category: 'ভূগোল',
    categoryEn: 'Geography',
    question: 'দার্জিলিং কোথায়?',
    before: {
      text: 'দার্জিলিং ইংল্যান্ডের একটি বিখ্যাত শহর যেখানে চা বাগান রয়েছে।',
      issues: ['factually absurd', 'complete hallucination'],
    },
    after: {
      text: 'দার্জিলিং জেলার সদর শহর।',
      label: 'Grounded, geographically accurate',
    },
  },
];

function CompareSlider({ before, after }: {
  before: typeof examples[0]['before'];
  after: typeof examples[0]['after'];
}) {
  const { t } = useLang();
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => updatePosition(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging, updatePosition]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    };
    const onTouchEnd = () => setDragging(false);
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    return () => { el.removeEventListener('touchmove', onTouchMove); el.removeEventListener('touchend', onTouchEnd); };
  }, [updatePosition]);

  return (
    <Box
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onTouchStart={(e) => { setDragging(true); updatePosition(e.touches[0].clientX); }}
      sx={{
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
        cursor: dragging ? 'grabbing' : 'ew-resize',
        userSelect: 'none',
        border: '1px solid rgba(0,0,0,0.06)',
        minHeight: 200,
        boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
        background: '#FFFFFF',
      }}
    >
      <Box sx={{ display: 'flex', minHeight: 200 }}>
        <Box
          sx={{
            width: `${position}%`,
            overflow: 'hidden',
            flexShrink: 0,
            background: 'rgba(178,34,34,0.02)',
            borderRight: '2px solid #B22222',
            transition: dragging ? 'none' : 'width 0.15s ease',
          }}
        >
          <Box sx={{ p: { xs: 2, md: 4 }, minWidth: { xs: 240, md: 300 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
              <Chip
                label={t('comparison_before')}
                size="small"
                sx={{ background: 'rgba(178,34,34,0.1)', color: '#B22222', border: '1px solid rgba(178,34,34,0.2)', fontSize: '0.7rem', height: 24, fontWeight: 800, fontFamily: 'Hind Siliguri, sans-serif' }}
              />
              {before.issues.map((issue, i) => (
                <Chip
                  key={i}
                  label={issue}
                  size="small"
                  sx={{ background: 'rgba(0,0,0,0.04)', color: '#1C1C1C', fontSize: '0.65rem', height: 22, fontWeight: 600 }}
                />
              ))}
            </Box>
            <Typography
              sx={{
                color: '#4A4A4A',
                fontFamily: 'Hind Siliguri, sans-serif',
                fontSize: '1rem',
                lineHeight: 1.7,
                textDecoration: 'line-through',
                opacity: 0.8,
              }}
            >
              {before.text}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1, background: 'rgba(34,139,34,0.015)', minWidth: 0 }}>
          <Box sx={{ p: { xs: 2, md: 4 }, minWidth: { xs: 240, md: 300 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
              <Chip
                label={t('comparison_after')}
                size="small"
                sx={{ background: 'rgba(34,139,34,0.1)', color: '#228B22', border: '1px solid rgba(34,139,34,0.2)', fontSize: '0.7rem', height: 24, fontWeight: 800, fontFamily: 'Hind Siliguri, sans-serif' }}
              />
              <Typography sx={{ fontSize: '0.7rem', color: '#228B22', fontWeight: 700, fontFamily: 'Hind Siliguri, sans-serif' }}>{after.label}</Typography>
            </Box>
            <Typography
              sx={{
                color: '#1C1C1C',
                fontFamily: 'Hind Siliguri, sans-serif',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                fontWeight: 700,
              }}
            >
              {after.text}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: `${position}%`,
          transform: 'translateX(-50%)',
          height: '100%',
          width: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#B22222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(178,34,34,0.3)',
            border: '3px solid #FFFFFF',
          }}
        >
          <SwapHorizIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default function ComparisonSection() {
  const { t } = useLang();
  const [active, setActive] = useState(0);

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.1 },
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
      id="results"
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
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 10 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
                    {t('comparison_section_label')}
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
                    {t('comparison_title')}
                  </Typography>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Typography
                    sx={{
                      color: '#4A4A4A',
                      maxWidth: 600,
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      lineHeight: 1.6,
                      fontFamily: 'Hind Siliguri, sans-serif',
                    }}
                  >
                    {t('comparison_subtitle')}
                  </Typography>
                </motion.div>
              </Box>
            </Grid>
            <Grid size={{ xs: 0, md: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Box
                  component="img"
                  src="/machwala.png"
                  alt="Cultural representative"
                  sx={{
                    width: '100%',
                    maxWidth: 280,
                    height: 'auto',
                    borderRadius: '24px',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            display: 'flex',
            gap: 1.5,
            justifyContent: 'center',
            mb: 6,
            flexWrap: 'wrap',
          }}
        >
          {examples.map((ex, i) => (
            <Chip
              key={ex.category}
              label={ex.category}
              onClick={() => setActive(i)}
              sx={{
                cursor: 'pointer',
                background: active === i ? 'rgba(178,34,34,0.12)' : '#FFFFFF',
                border: active === i ? '1px solid #B22222' : '1px solid rgba(0,0,0,0.1)',
                color: active === i ? '#B22222' : '#4A4A4A',
                fontWeight: active === i ? 700 : 600,
                px: 1,
                fontFamily: 'Hind Siliguri, sans-serif',
                transition: 'all 0.3s',
                '&:hover': { background: active === i ? 'rgba(178,34,34,0.15)' : 'rgba(0,0,0,0.05)' },
              }}
            />
          ))}
        </Box>

        <motion.div variants={itemVariants}>
          <Box
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 5,
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 10px 50px rgba(0,0,0,0.03)',
              mb: 4,
            }}
          >
            <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label={examples[active].category}
                size="small"
                sx={{ background: 'rgba(178,34,34,0.1)', color: '#B22222', fontWeight: 800, fontFamily: 'Hind Siliguri, sans-serif' }}
              />
              <Typography sx={{ color: '#4A4A4A', fontSize: '1rem', fontFamily: 'Hind Siliguri, sans-serif', fontWeight: 500 }}>
                প্রশ্ন: <Box component="span" sx={{ color: '#1C1C1C', fontWeight: 700 }}>{examples[active].question}</Box>
              </Typography>
            </Box>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CompareSlider
                  before={examples[active].before}
                  after={examples[active].after}
                />
              </motion.div>
            </AnimatePresence>
          </Box>
        </motion.div>

        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[
            { color: '#B22222', bg: 'rgba(178,34,34,0.08)', label: 'হ্যালুসিনেশন চিহ্নিত' },
            { color: '#228B22', bg: 'rgba(34,139,34,0.08)', label: 'সঠিক উত্তর' },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2.5,
                py: 1.2,
                borderRadius: 3,
                background: item.bg,
                border: `1px solid ${item.color}20`,
              }}
            >
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
              <Typography sx={{ fontSize: '0.85rem', color: item.color, fontWeight: 700, fontFamily: 'Hind Siliguri, sans-serif' }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

