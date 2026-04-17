import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useLang } from '../context/LanguageContext';

const BENGALI_CHARS = ['অ', 'আ', 'ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ট', 'ড'];

export default function Footer() {
  const { t } = useLang();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 8, md: 10 },
        background: '#FFFDF5', // Lighter cream for footer
        borderTop: '1px solid rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          p: 4,
          opacity: 0.04,
          fontFamily: 'Hind Siliguri, sans-serif',
          fontSize: '2.8rem',
          color: '#B22222',
          pointerEvents: 'none',
          overflow: 'hidden',
          alignContent: 'flex-start',
        }}
      >
        {Array.from({ length: 48 }, (_, i) => BENGALI_CHARS[i % BENGALI_CHARS.length]).map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #B22222, #8B1A1A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Galada, cursive',
                fontWeight: 700,
                fontSize: '1.4rem',
                color: '#FFFFFF',
                boxShadow: '0 8px 16px rgba(178,34,34,0.3)',
              }}
            >
              ব
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontWeight: 800, color: '#1C1C1C', fontSize: '1.2rem', lineHeight: 1.1, fontFamily: 'Hind Siliguri, sans-serif' }}>
                Bengali LLM
              </Typography>
              <Typography sx={{ color: '#B22222', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Hind Siliguri, sans-serif' }}>
                CRITICAL LANGUAGE TECHNOLOGY
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{
              color: '#4A4A4A',
              fontSize: '1rem',
              mb: 1.5,
              fontFamily: 'Hind Siliguri, sans-serif',
              fontWeight: 500,
            }}
          >
            {t('footer_lab')}
          </Typography>

          <Typography
            sx={{
              color: '#B22222',
              fontWeight: 700,
              fontSize: '0.95rem',
              fontStyle: 'normal',
              fontFamily: 'Hind Siliguri, sans-serif',
              letterSpacing: '0.02em'
            }}
          >
            "{t('footer_tagline')}"
          </Typography>
        </Box>

        <Divider sx={{ mb: 5, borderColor: 'rgba(0,0,0,0.06)' }} />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2.5,
            justifyContent: 'center',
            mb: 6,
          }}
        >
          {[
            { label: 'Qwen 2.5-3B-Instruct', tag: 'Base Model' },
            { label: 'LoRA Fine-Tuning', tag: 'Method' },
            { label: 'BanglaRQA', tag: 'Dataset' },
            { label: '4-bit Quantization', tag: 'Inference' },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2.5,
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                textAlign: 'center',
                minWidth: 160
              }}
            >
              <Typography sx={{ color: '#1C1C1C', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'monospace' }}>
                {item.label}
              </Typography>
              <Typography sx={{ color: '#4A4A4A', fontSize: '0.7rem', fontWeight: 500 }}>
                {item.tag}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 4, borderColor: 'rgba(0,0,0,0.06)' }} />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: '#4A4A4A', fontSize: '0.8rem', fontWeight: 500, fontFamily: 'Hind Siliguri, sans-serif' }}>
            © 2026 Bengali LLM · {t('footer_rights')}
          </Typography>
          <Typography
            sx={{
              color: '#4A4A4A',
              fontSize: '0.8rem',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontWeight: 500
            }}
          >
            {t('footer_lab')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['#B22222', '#FFDB58', '#006666'].map((c, i) => (
              <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
