import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#B22222', // Terracotta Red (Maati)
      light: '#D34040',
      dark: '#8B1A1A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFDB58', // Mustard Yellow (Shorshe)
      light: '#FFE48A',
      dark: '#D4B34B',
      contrastText: '#1C1C1C',
    },
    info: {
      main: '#002366', // Royal Blue
      light: '#33528A',
      dark: '#001744',
    },
    error: {
      main: '#D32F2F',
    },
    success: {
      main: '#228B22', // Forest Green (Aranya)
    },
    background: {
      default: '#F5F5DC', // Off-White/Kora
      paper: '#FFFDF5', // Slightly lighter cream for cards
    },
    text: {
      primary: '#1C1C1C', // Dark grey/black for high readability
      secondary: '#4A4A4A',
    },
    divider: 'rgba(0,0,0,0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background-color: #F5F5DC; color: #1C1C1C; overflow-x: hidden; }

        .lang-bn, .lang-bn * { font-family: 'Hind Siliguri', 'Noto Sans Bengali', sans-serif !important; }
        .lang-hi, .lang-hi * { font-family: 'Noto Sans Devanagari', sans-serif !important; }

        @keyframes floatUp {
          0%   { transform: translateY(0px) rotate(0deg); opacity: 0.12; }
          50%  { opacity: 0.28; }
          100% { transform: translateY(-110vh) rotate(25deg); opacity: 0; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(178,34,34,0.3); }
          50%       { box-shadow: 0 0 50px rgba(178,34,34,0.65); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #F5F5DC; }
        ::-webkit-scrollbar-thumb { background: #B22222; border-radius: 3px; }

        .glass {
          backdrop-filter: blur(14px) saturate(1.5);
          -webkit-backdrop-filter: blur(14px) saturate(1.5);
          background: rgba(255,255,255,0.4) !important;
          border: 1px solid rgba(0,0,0,0.05) !important;
        }

        .glow-teal { box-shadow: 0 0 30px rgba(0,102,102,0.35); }
        .glow-gold  { box-shadow: 0 0 30px rgba(255,219,88,0.35); }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
          transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #B22222 0%, #8B1A1A 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #D34040 0%, #B22222 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 35px rgba(178,34,34,0.45)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(178,34,34,0.6)',
          color: '#B22222',
          '&:hover': {
            borderColor: '#B22222',
            backgroundColor: 'rgba(178,34,34,0.08)',
            transform: 'translateY(-2px)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #FFDB58 0%, #D4B34B 100%)',
          color: '#1C1C1C',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFE48A 0%, #FFDB58 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 35px rgba(255,219,88,0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(0,0,0,0.08)' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
      },
    },
  },
});

export default theme;
