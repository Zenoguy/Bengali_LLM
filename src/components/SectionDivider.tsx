import Box from '@mui/material/Box';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionDividerProps {
  type?: 'alpana' | 'wave' | 'dots';
  flip?: boolean;
}

export default function SectionDivider({ type = 'alpana', flip = false }: SectionDividerProps) {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], flip ? [360, 0] : [0, 360]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden',
        pointerEvents: 'none',
        my: -5, // Negative margin to bridge sections
      }}
    >
      {type === 'alpana' && (
        <motion.div style={{ rotate }}>
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Soft, traditional Alpana-inspired pattern */}
            <circle cx="100" cy="100" r="20" stroke="#B22222" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
            <path d="M100 20C110 50 140 60 180 60M100 20C90 50 60 60 20 60" stroke="#B22222" strokeWidth="1" opacity="0.2" />
            <path d="M100 180C110 150 140 140 180 140M100 180C90 150 60 140 20 140" stroke="#B22222" strokeWidth="1" opacity="0.2" />
            <path d="M20 100C50 110 60 140 60 180M20 100C50 90 60 60 60 20" stroke="#B22222" strokeWidth="1" opacity="0.2" />
            <path d="M180 100C150 110 140 140 140 180M180 100C150 90 140 60 140 20" stroke="#B22222" strokeWidth="1" opacity="0.2" />
          </svg>
        </motion.div>
      )}
      
      {type === 'dots' && (
        <Box sx={{ display: 'flex', gap: 2, opacity: 0.15 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i % 2 === 0 ? '#B22222' : '#FFDB58',
              }}
            />
          ))}
        </Box>
      )}

      {/* Background Fade to bridge colors */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent, rgba(245,245,220,0.4), transparent)',
          zIndex: -1,
        }}
      />
    </Box>
  );
}
