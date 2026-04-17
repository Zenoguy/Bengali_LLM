import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useLang, type Lang } from '../context/LanguageContext';

const NAV_LINKS = [
  { key: 'nav_why', href: '#why' },
  { key: 'nav_how', href: '#how' },
  { key: 'nav_datasets', href: '#datasets' },
  { key: 'nav_results', href: '#results' },
  { key: 'nav_try', href: '#demo' },
];

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'bn', label: 'বাং' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setDrawerOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? 'rgba(245,245,220,0.9)' // Scrolled background: Kora Off-White
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1, minHeight: { xs: 64, md: 72 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                // Subtle glow for the Biswa Bangla shape
                filter: 'drop-shadow(0 4px 12px rgba(178,34,34,0.25))',
              }}
            >
              <Box
                component="img"
                src="/wb-emblem.png"
                alt="West Bengal Emblem"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ 
                  fontWeight: 800, 
                  color: '#1C1C1C', 
                  lineHeight: 1.1, 
                  fontSize: '1rem',
                  fontFamily: 'Hind Siliguri, sans-serif'
                }}
              >
                Bengali LLM
              </Typography>
              <Typography variant="caption" sx={{ color: '#B22222', lineHeight: 1, fontSize: '0.7rem', fontWeight: 600 }}>
                CU Data Science Lab
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5, mr: 3 }}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link.key}
                onClick={() => handleNav(link.href)}
                sx={{
                  color: '#4A4A4A',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  px: 1.8,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': { color: '#B22222', background: 'rgba(178,34,34,0.05)' },
                  transition: 'all 0.2s',
                  fontFamily: 'Hind Siliguri, sans-serif'
                }}
              >
                {t(link.key)}
              </Button>
            ))}
            <Button
              component={RouterLink}
              to="/demo"
              variant="contained"
              sx={{
                ml: 2,
                background: 'linear-gradient(135deg, #B22222, #8B1A1A)',
                color: 'white',
                borderRadius: '10px',
                px: 3,
                py: 1,
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: 'Hind Siliguri, sans-serif',
                boxShadow: '0 4px 12px rgba(178,34,34,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #D32F2F, #B22222)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(178,34,34,0.4)',
                },
                transition: 'all 0.2s',
              }}
            >
              {lang === 'bn' ? 'লাইভ ডেমো' : 'Live Demo'}
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              background: 'rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '10px',
              p: 0.5,
            }}
          >
            {LANGS.map((l) => (
              <Button
                key={l.code}
                onClick={() => setLang(l.code)}
                size="small"
                sx={{
                  minWidth: 40,
                  px: 1.2,
                  py: 0.5,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  color: lang === l.code ? '#FFFFFF' : '#4A4A4A',
                  background: lang === l.code ? '#B22222' : 'transparent',
                  '&:hover': {
                    background: lang === l.code ? '#B22222' : 'rgba(178,34,34,0.1)',
                    color: lang === l.code ? '#FFFFFF' : '#B22222',
                  },
                  transition: 'all 0.2s',
                  fontFamily: 'Hind Siliguri, sans-serif'
                }}
              >
                {l.label}
              </Button>
            ))}
          </Box>

          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, ml: 1, color: '#1C1C1C' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: '#F5F5DC', // Kora Off-White
            borderLeft: '1px solid rgba(0,0,0,0.08)',
            pt: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.key} disablePadding sx={{ mb: 0.5 }}>
              <Button
                fullWidth
                onClick={() => handleNav(link.href)}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'text.primary',
                  fontWeight: 500,
                  py: 1.2,
                  borderRadius: 2,
                  '&:hover': { background: 'rgba(20,184,166,0.1)', color: 'primary.main' },
                }}
              >
                {t(link.key)}
              </Button>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              component={RouterLink}
              to="/demo"
              fullWidth
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #B22222, #8B1A1A)',
                color: 'white',
                borderRadius: '10px',
                py: 1.5,
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: 'Hind Siliguri, sans-serif',
              }}
            >
              {lang === 'bn' ? 'লাইভ ডেমো' : 'Live Demo'}
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
