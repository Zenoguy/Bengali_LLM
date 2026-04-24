import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import HistoryIcon from '@mui/icons-material/History';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';
import { useLang, type Lang } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = {
  bn: [
    'আজকের আবহাওয়া কেমন?',
    'রবীন্দ্রনাথ ঠাকুরের সেরা কবিতা কোনটি?',
    'কিভাবে বাংলা খিচুড়ি রান্না করা যায়?',
    'পশ্চিমবঙ্গের ইতিহাস সংক্ষেপে বল।',
  ],
  en: [
    'How is the weather today?',
    'What is Rabindranath Tagore\'s best poem?',
    'How to cook Bengali Khichuri?',
    'Tell me about West Bengal\'s history.',
  ],
  hi: [
    'आज मौसम कैसा है?',
    'रवींद्रनाथ टैगोर की सबसे अच्छी कविता कौन सी है?',
    'बंगाली खिचड़ी कैसे बनाएं?',
    'पश्चिम बंगाल के इतिहास के बारे में बताएं।',
  ]
};

function cleanText(text: string | undefined | null): string {
  if (!text) return "";
  return text.replace(/\ufffd/g, "").trim();
}

interface Message {
  role: 'user' | 'ai';
  text: string;
  isError?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

// Custom Loader: Steaming Cup of Cha
const ChaLoader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px' }}
  >
    <Box sx={{ position: 'relative', width: 40, height: 40 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [-5, -15],
            x: [i * 8 - 8, i * 8 - 8 + (Math.random() * 4 - 2)],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          style={{
            position: 'absolute',
            bottom: 25,
            left: '50%',
            width: 2,
            height: 8,
            borderRadius: 1,
            background: '#B22222',
          }}
        />
      ))}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 5, 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 24, 
          height: 18, 
          background: '#B22222', 
          borderRadius: '2px 2px 8px 8px',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: -8,
            top: 4,
            width: 8,
            height: 10,
            border: '2px solid #B22222',
            borderRadius: '0 4px 4px 0',
          }
        }} 
      />
    </Box>
    <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#B22222', letterSpacing: '0.05em' }}>
      ভাবছে...
    </Typography>
  </motion.div>
);

export default function ChatPage() {
  const { t, lang, setLang } = useLang();
  const navigate = useNavigate();
  
  const createNewSession = useCallback((): ChatSession => ({
    id: Date.now().toString(),
    title: t('sidebar_new_chat'),
    messages: [{ role: 'ai', text: t('chat_initial_msg') }],
    timestamp: Date.now(),
  }), [t]);

  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('bengali-ai-sessions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse sessions', e);
      }
    }
    // Hardcode initial Bengali session for immediate impact
    return [{
      id: Date.now().toString(),
      title: 'নতুন চ্যাট',
      messages: [{ role: 'ai', text: 'নমস্কার! আমি আপনার বাঙালি এআই সহকারী। আজ আপনাকে কিভাবে সাহায্য করতে পারি?' }],
      timestamp: Date.now(),
    }];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(sessions[0]?.id || '');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [lastPrompt, setLastPrompt] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('bengali-ai-sessions', JSON.stringify(sessions));
  }, [sessions]);

  const activeSession = useMemo(() => 
    sessions.find(s => s.id === activeSessionId) || sessions[0], 
  [sessions, activeSessionId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, loading]);

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || loading || !activeSession) return;
    
    const userMsg: Message = { role: 'user', text };
    
    // Update session with user message
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        const newMessages = [...s.messages, userMsg];
        let newTitle = s.title;
        if (s.messages.length === 1 && (s.title === 'নতুন চ্যাট' || s.title === 'New Chat' || s.title === 'নতুন কথোপকথন')) {
          newTitle = text.slice(0, 25) + (text.length > 25 ? '...' : '');
        }
        return { ...s, messages: newMessages, title: newTitle, timestamp: Date.now() };
      }
      return s;
    }));

    setInput('');
    setLastPrompt(text);
    // 300ms delay to avoid flicker for fast responses
    const loaderDelay = setTimeout(() => setLoading(true), 300);
    
    // Wake indicator timer
    const wakeUpTimer = setTimeout(() => setIsWakingUp(true), 3000);

    const userPrompt = text;

    try {
      const res = await fetch('https://sam-veda-bengali-llm-space.hf.space/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${userPrompt}\nসংক্ষেপে এবং সঠিক তথ্যসহ উত্তর দিন।`,
          system_prompt: 'You are a factual Bengali assistant. Answer only in Bengali. Provide accurate information. Do not hallucinate.',
          max_new_tokens: 96,
          temperature: 0.2,
          top_p: 0.8,
        }),
      });

      if (!res.ok) {
        throw new Error('API failed');
      }

      const data = await res.json();
      
      const aiText = cleanText(data.response || data.generated_text || data.output) || '⚠️ Empty response from model.';

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return { ...s, messages: [...s.messages, { role: 'ai', text: aiText }], timestamp: Date.now() };
        }
        return s;
      }));

    } catch (err: any) {
      const errorText = lang === 'bn' 
        ? '⚠️ মডেলে সংযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।' 
        : '⚠️ Failed to reach model. Try again.';

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [...s.messages, { role: 'ai', text: errorText, isError: true }]
          };
        }
        return s;
      }));
    } finally {
      clearTimeout(wakeUpTimer);
      clearTimeout(loaderDelay);
      setLoading(false);
      setIsWakingUp(false);
    }
  }, [loading, lang, activeSessionId, activeSession]);

  const startNewChat = () => {
    const newSess = createNewSession();
    setSessions(prev => [newSess, ...prev]);
    setActiveSessionId(newSess.id);
    setSidebarOpen(false);
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== id);
      if (filtered.length === 0) return [createNewSession()];
      return filtered;
    });
    if (activeSessionId === id) {
      setActiveSessionId(sessions.find(s => s.id !== id)?.id || '');
    }
  };

  const currentSuggestions = useMemo(() => SUGGESTIONS[lang] || SUGGESTIONS.bn, [lang]);
  const hasUserMessages = useMemo(() => 
    activeSession?.messages.some(m => m.role === 'user'), 
  [activeSession]);

  const SidebarContent = (
    <Box sx={{ 
      width: 280, 
      height: '100%', 
      background: 'linear-gradient(180deg, #F5F5DC 0%, #FFFFFF 100%)',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(178,34,34,0.1)'
    }}>
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Avatar sx={{ background: '#B22222', width: 32, height: 32 }}>
            <AutoAwesomeIcon sx={{ fontSize: 18 }} />
          </Avatar>
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#1C1C1C', fontFamily: 'Hind Siliguri, sans-serif' }}>
            Bengali AI
          </Typography>
        </Box>

        <Button 
          fullWidth
          onClick={startNewChat}
          startIcon={<AddIcon />}
          sx={{ 
            justifyContent: 'flex-start', 
            gap: 1.5, 
            p: 1.8, 
            borderRadius: 3, 
            background: 'rgba(178,34,34,0.05)',
            border: '1px dashed rgba(178,34,34,0.4)',
            color: '#B22222',
            textTransform: 'none',
            '&:hover': { background: 'rgba(178,34,34,0.1)' }
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Hind Siliguri, sans-serif' }}>
            {t('sidebar_new_chat')}
          </Typography>
        </Button>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800, px: 2, mb: 2, display: 'block', letterSpacing: '0.1em' }}>
          {t('sidebar_history').toUpperCase()}
        </Typography>
        {sessions.map((session) => (
          <Box
            key={session.id}
            onClick={() => { setActiveSessionId(session.id); setSidebarOpen(false); }}
            sx={{
              p: 2,
              borderRadius: 3,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 1,
              transition: 'all 0.2s',
              background: activeSessionId === session.id ? 'rgba(178,34,34,0.08)' : 'transparent',
              border: activeSessionId === session.id ? '1px solid rgba(178,34,34,0.1)' : '1px solid transparent',
              '&:hover': { background: 'rgba(0,0,0,0.03)' },
              position: 'relative'
            }}
          >
            <HistoryIcon sx={{ fontSize: 18, color: activeSessionId === session.id ? '#B22222' : 'text.secondary' }} />
            <Box sx={{ overflow: 'hidden', flex: 1 }}>
              <Typography sx={{ 
                fontSize: '0.85rem', 
                fontWeight: activeSessionId === session.id ? 700 : 500, 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                fontFamily: 'Hind Siliguri, sans-serif',
                color: activeSessionId === session.id ? '#B22222' : 'inherit'
              }}>
                {session.title}
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={(e) => deleteSession(e, session.id)}
              sx={{ opacity: 0.5, '&:hover': { opacity: 1, color: '#B22222' } }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.05)', background: 'rgba(0,0,0,0.01)' }}>
        {/* Language Selector */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1, p: 0.5 }}>
          {(['bn', 'en'] as Lang[]).map((l) => (
            <Button
              key={l}
              onClick={() => setLang(l)}
              variant={lang === l ? 'contained' : 'text'}
              size="small"
              sx={{ 
                minWidth: 40, 
                fontSize: '0.7rem', 
                borderRadius: 2,
                p: '4px 8px',
                background: lang === l ? '#B22222' : 'transparent',
                color: lang === l ? 'white' : 'text.secondary',
                textTransform: 'uppercase',
                fontWeight: 700,
                '&:hover': { background: lang === l ? '#8B1A1A' : 'rgba(0,0,0,0.05)' }
              }}
            >
              {l === 'bn' ? 'বাং' : 'EN'}
            </Button>
          ))}
        </Box>
        <IconButton onClick={() => navigate('/')} sx={{ width: '100%', justifyContent: 'flex-start', gap: 2, borderRadius: 3, p: 2 }}>
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Hind Siliguri, sans-serif' }}>
            {t('chat_back_home')}
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex', background: '#F5F5DC', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {SidebarContent}
      </Box>

      <Drawer open={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
        {SidebarContent}
      </Drawer>

      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        background: 'radial-gradient(circle at top right, rgba(255,219,88,0.1), transparent), radial-gradient(circle at bottom left, rgba(178,34,34,0.05), transparent)'
      }}>
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.02, pointerEvents: 'none', background: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />
        
        <Box sx={{ display: { xs: 'flex', md: 'none' }, p: 2, position: 'absolute', top: 0, left: 0, zIndex: 5 }}>
          <IconButton onClick={() => setSidebarOpen(true)} sx={{ background: '#FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, md: 4 }, pt: { xs: 10, md: 6 } }}>
          <Container maxWidth="md">
            <AnimatePresence mode="popLayout">
              {activeSession?.messages.map((msg: Message, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '24px'
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '85%',
                      p: 2.5,
                      borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                      background: msg.role === 'user' 
                        ? 'linear-gradient(135deg, #B22222, #8B1A1A)' 
                        : '#FFFFFF',
                      color: msg.role === 'user' ? '#FFFFFF' : '#1C1C1C',
                      boxShadow: msg.role === 'ai' ? '0 8px 24px rgba(0,0,0,0.04)' : '0 12px 32px rgba(178,34,34,0.15)',
                      border: msg.role === 'ai' ? '1px solid rgba(178,34,34,0.1)' : 'none',
                    }}
                  >
                    <Typography sx={{ 
                      fontFamily: 'Hind Siliguri, sans-serif', 
                      fontSize: { xs: '0.95rem', md: '1.05rem' }, 
                      lineHeight: 1.7,
                      fontWeight: 500
                    }}>
                      {msg.text}
                    </Typography>
                    {msg.isError && (
                      <Button
                        size="small"
                        onClick={() => handleSend(lastPrompt)}
                        variant="outlined"
                        sx={{
                          mt: 2,
                          borderColor: '#B22222',
                          color: '#B22222',
                          fontWeight: 700,
                          fontFamily: 'Hind Siliguri, sans-serif',
                          textTransform: 'none',
                          borderRadius: 2,
                          '&:hover': { background: 'rgba(178,34,34,0.05)', borderColor: '#8B1A1A' }
                        }}
                      >
                        {lang === 'bn' ? 'আবার চেষ্টা করুন' : 'Retry'}
                      </Button>
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ mt: 1, mx: 1, color: 'text.secondary', fontWeight: 600, letterSpacing: '0.05em' }}>
                    {msg.role === 'user' ? t('chat_you') : t('chat_ai_name')}
                  </Typography>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {loading && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <ChaLoader />
                </Box>
                {isWakingUp && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '0.8rem', color: '#B22222', fontWeight: 600, fontFamily: 'Hind Siliguri, sans-serif' }}>
                      ⚡ {lang === 'bn' ? 'এটি অনেক সময় নিতে পারে (CPU মডেল)' : 'This may take several minutes (CPU model).'}
                    </Typography>
                  </motion.div>
                )}
              </Box>
            )}
            <div ref={chatEndRef} />
          </Container>
        </Box>

        <Box sx={{ p: { xs: 2, md: 4 }, mt: 'auto' }}>
          <Container maxWidth="sm">
            {/* Suggestion Chips */}
            <AnimatePresence>
              {!hasUserMessages && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}
                >
                  {currentSuggestions.map((text) => (
                    <Chip
                      key={text}
                      label={text}
                      onClick={() => handleSend(text)}
                      sx={{
                        background: 'white',
                        border: '1px solid rgba(178,34,34,0.15)',
                        color: '#B22222',
                        fontFamily: 'Hind Siliguri, sans-serif',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        '&:hover': { background: 'rgba(178,34,34,0.05)', transform: 'translateY(-2px)' },
                        transition: 'all 0.2s'
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              alignItems: 'center', 
              background: 'rgba(255,255,255,0.8)', 
              backdropFilter: 'blur(20px)',
              p: 1.5,
              borderRadius: 6,
              boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
              border: '1px solid rgba(178,34,34,0.1)'
            }}>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 1 }}>
                <Avatar sx={{ width: 44, height: 44, background: '#B22222' }}>
                  <AutoAwesomeIcon sx={{ fontSize: 20 }} />
                </Avatar>
              </Box>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input); } }}
                placeholder={t('chat_placeholder')}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  '& .MuiInputBase-root': {
                    fontFamily: 'Hind Siliguri, sans-serif',
                    fontSize: '1rem',
                  }
                }}
              />
              <IconButton
                onClick={() => handleSend(input)}
                disabled={loading || !input.trim()}
                sx={{
                  width: 48,
                  height: 48,
                  background: '#B22222',
                  color: '#FFFFFF',
                  '&:hover': { background: '#8B1A1A', transform: 'scale(1.05)' },
                  '&.Mui-disabled': { background: '#E0E0E0' },
                  transition: 'all 0.2s'
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
            <Typography sx={{ textAlign: 'center', mt: 2, fontSize: '0.75rem', color: '#4A4A4A', fontWeight: 600, opacity: 0.7, fontFamily: 'Hind Siliguri, sans-serif' }}>
              {t('chat_feedback_footer')}
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

