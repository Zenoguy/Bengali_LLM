import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StorageIcon from '@mui/icons-material/Storage';
import ChatIcon from '@mui/icons-material/Chat';
import PsychologyIcon from '@mui/icons-material/Psychology';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useLang } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const datasetDetails = [
  {
    icon: StorageIcon,
    nameKey: 'dataset_1_name',
    tagKey: 'dataset_1_tag',
    descKey: 'dataset_1_desc',
    focusKey: 'dataset_1_focus',
    accent: '#B22222',
    stats: [
      { label: 'Type', value: 'Reading QA' },
      { label: 'Format', value: 'Passage → Q → A' },
      { label: 'Language', value: 'Formal Bengali' },
    ],
    detail: 'BanglaRQA is a comprehensive Bengali reading comprehension dataset featuring passage–question–answer triplets. It tests factual recall and comprehension across diverse Bengali text domains, ensuring the model learns to extract and reason over authentic Bengali content.',
  },
  {
    icon: ChatIcon,
    nameKey: 'dataset_2_name',
    tagKey: 'dataset_2_tag',
    descKey: 'dataset_2_desc',
    focusKey: 'dataset_2_focus',
    accent: '#FFDB58',
    stats: [
      { label: 'Type', value: 'Instruction' },
      { label: 'Topics', value: '6+ domains' },
      { label: 'Language', value: 'Dialect Bengali' },
    ],
    detail: 'The instruction dataset covers emotional support, practical advice, social interactions, historical discussions, civic processes, and daily conversations. This broad coverage ensures fluency across real-world Bengali communication scenarios, including colloquial and dialect variations.',
  },
  {
    icon: PsychologyIcon,
    nameKey: 'dataset_3_name',
    tagKey: 'dataset_3_tag',
    descKey: 'dataset_3_desc',
    focusKey: 'dataset_3_focus',
    accent: '#002366',
    stats: [
      { label: 'Parameters', value: '3B' },
      { label: 'Quantization', value: '4-bit' },
      { label: 'Base', value: 'Multilingual' },
    ],
    detail: 'Qwen 2.5-3B-Instruct was chosen for its strong multilingual foundations and efficient architecture. With 3 billion parameters and 4-bit quantization support, it strikes an ideal balance between capability and computational efficiency — perfect for specialized Bengali fine-tuning.',
  },
];

export default function DatasetsSection() {
  const { t } = useLang();
  const [selected, setSelected] = useState<number | null>(null);

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
      id="datasets"
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
              {t('datasets_section_label')}
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
              {t('datasets_title')}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              sx={{
                color: '#4A4A4A',
                maxWidth: 520,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.6,
                fontFamily: 'Hind Siliguri, sans-serif',
              }}
            >
              {t('datasets_subtitle')}
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {datasetDetails.map((ds, i) => {
            const Icon = ds.icon;
            return (
              <Grid key={ds.nameKey} size={{ xs: 12, md: 4 }}>
                <motion.div variants={itemVariants}>
                  <Box
                    onClick={() => setSelected(i)}
                    sx={{
                      height: '100%',
                      p: 5,
                      borderRadius: 4,
                      background: '#FFFFFF',
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                      '&:hover': {
                        borderColor: `${ds.accent}40`,
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 60px rgba(0,0,0,0.06)`,
                        '& .expand-icon': { opacity: 1, transform: 'scale(1)' },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: '40%',
                        background: `linear-gradient(to top, ${ds.accent}05, transparent)`,
                        pointerEvents: 'none',
                      }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2.5,
                          background: `${ds.accent}12`,
                          border: `1px solid ${ds.accent}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon sx={{ color: ds.accent, fontSize: 28 }} />
                      </Box>
                      <OpenInFullIcon
                        className="expand-icon"
                        sx={{
                          color: ds.accent,
                          fontSize: 18,
                          opacity: 0,
                          transform: 'scale(0.8)',
                          transition: 'all 0.2s',
                        }}
                      />
                    </Box>

                    <Chip
                      label={t(ds.tagKey)}
                      size="small"
                      sx={{
                        mb: 2,
                        background: `${ds.accent}12`,
                        border: `1px solid ${ds.accent}20`,
                        color: ds.accent,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        height: 26,
                      }}
                    />

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: '#1C1C1C',
                        mb: 2,
                        fontSize: '1.25rem',
                        fontFamily: 'Hind Siliguri, sans-serif',
                      }}
                    >
                      {t(ds.nameKey)}
                    </Typography>

                    <Typography
                      sx={{
                        color: '#4A4A4A',
                        fontSize: '0.95rem',
                        lineHeight: 1.7,
                        mb: 4,
                        fontFamily: 'Hind Siliguri, sans-serif',
                      }}
                    >
                      {t(ds.descKey)}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {ds.stats.map((s, si) => (
                        <Box
                          key={s.label}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            pb: 1,
                            borderBottom: si < ds.stats.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                          }}
                        >
                          <Typography sx={{ fontSize: '0.75rem', color: '#4A4A4A', fontFamily: 'monospace', fontWeight: 500 }}>
                            {s.label}
                          </Typography>
                          <Typography sx={{ fontSize: '0.75rem', color: ds.accent, fontWeight: 700, fontFamily: 'monospace' }}>
                            {s.value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <AnimatePresence>
        {selected !== null && (
          <Dialog
            open={selected !== null}
            onClose={() => setSelected(null)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                background: '#F5F5DC',
                border: `1px solid ${datasetDetails[selected].accent}30`,
                borderRadius: 5,
                boxShadow: `0 30px 80px rgba(0,0,0,0.15)`,
                overflow: 'hidden',
              },
            }}
          >
            <Box sx={{ position: 'relative', p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: `${datasetDetails[selected].accent}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {(() => {
                      const Icon = datasetDetails[selected].icon;
                      return <Icon sx={{ color: datasetDetails[selected].accent, fontSize: 24 }} />;
                    })()}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1C1C', fontFamily: 'Hind Siliguri, sans-serif' }}>
                      {t(datasetDetails[selected].nameKey)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: datasetDetails[selected].accent, fontWeight: 700, letterSpacing: '0.05em' }}>
                      {t(datasetDetails[selected].tagKey)}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={() => setSelected(null)} sx={{ color: '#1C1C1C' }}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Typography
                sx={{
                  color: '#4A4A4A',
                  lineHeight: 1.75,
                  fontSize: '1rem',
                  mb: 4,
                  fontFamily: 'Hind Siliguri, sans-serif',
                }}
              >
                {datasetDetails[selected].detail}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {datasetDetails[selected].stats.map((s) => (
                  <Box
                    key={s.label}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      p: 2,
                      borderRadius: 3,
                      background: '#FFFFFF',
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    <Typography sx={{ color: '#4A4A4A', fontSize: '0.85rem', fontWeight: 600 }}>
                      {s.label}
                    </Typography>
                    <Typography sx={{ color: datasetDetails[selected].accent, fontWeight: 800, fontSize: '0.85rem' }}>
                      {s.value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 4, p: 2, borderRadius: 3, background: `${datasetDetails[selected].accent}08`, border: `1px dashed ${datasetDetails[selected].accent}30` }}>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    color: '#1C1C1C',
                    fontWeight: 500,
                    fontFamily: 'Hind Siliguri, sans-serif',
                    textAlign: 'center',
                  }}
                >
                  {t(datasetDetails[selected].focusKey)}
                </Typography>
              </Box>
            </Box>
          </Dialog>
        )}
      </AnimatePresence>
    </Box>
  );
}
