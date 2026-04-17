import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { motion } from 'framer-motion';

interface IconProps {
  sx?: SxProps<Theme>;
}

/**
 * Premium SVG representing an ancient Bengali manuscript scroll with the first alphabet.
 */
export const ManuscriptScroll = ({ sx }: IconProps) => (
  <Box component="svg" viewBox="0 0 100 100" fill="none" sx={sx}>
    {/* Background Scroll Shadow/Depth */}
    <path d="M15 25C15 22 17 20 20 20H80C83 20 85 22 85 25V75C85 78 83 80 80 80H20C17 80 15 78 15 75V25Z" fill="currentColor" opacity="0.05" />
    
    {/* Rolled Ends */}
    <path d="M10 18H20C22 18 24 20 24 22V78C24 80 22 82 20 82H10" stroke="currentColor" strokeWidth="3" />
    <path d="M80 18H90C92 18 94 20 94 22V78C94 80 92 82 90 82H80" stroke="currentColor" strokeWidth="3" />
    
    {/* Main Body */}
    <path d="M24 22H76V78H24V22Z" fill="white" fillOpacity="0.5" stroke="currentColor" strokeWidth="2" />
    
    {/* Calligraphic 'অ' */}
    <path 
      d="M35 55C35 50 42 48 50 38M50 38C58 38 65 42 65 50C65 58 58 65 50 65C42 65 35 62 35 55M35 55C35 53 38 51 42 51C46 51 49 53 49 55M50 38V50C55 50 60 48 62 42M50 50L40 58M30 35H70" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />
    
    {/* Ornate corners (Kalka style) */}
    <path d="M28 26C30 26 32 28 32 30" stroke="currentColor" strokeWidth="1" />
    <path d="M72 26C70 26 68 28 68 30" stroke="currentColor" strokeWidth="1" />
    <path d="M28 74C30 74 32 72 32 70" stroke="currentColor" strokeWidth="1" />
    <path d="M72 74C70 74 68 72 68 70" stroke="currentColor" strokeWidth="1" />
  </Box>
);

/**
 * Premium SVG of a traditional Chau mask with jagged fracture lines representing hallucinations.
 */
export const FracturedChauMask = ({ sx }: IconProps) => (
  <Box component="svg" viewBox="0 0 100 100" fill="none" sx={sx}>
    {/* Mask base */}
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.05" />
    
    {/* Eyes & Brow */}
    <path d="M35 50C40 45 45 45 50 50" stroke="currentColor" strokeWidth="3" />
    <path d="M50 50C55 45 60 45 65 50" stroke="currentColor" strokeWidth="3" />
    <circle cx="42" cy="52" r="2.5" fill="currentColor" />
    <circle cx="58" cy="52" r="2.5" fill="currentColor" />
    
    {/* Third Eye (Bindi) */}
    <circle cx="50" cy="40" r="4" fill="currentColor" opacity="0.6" />
    
    {/* Crown Detail */}
    <path d="M30 35C35 25 50 20 65 25" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
    <path d="M25 40L35 30L50 25L65 30L75 40" stroke="currentColor" strokeWidth="2" />
    
    {/* FRACTURE LINES (Representing Hallucinations) */}
    <path d="M20 30L40 45L50 40L65 55L85 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M30 80L45 65L55 75L80 50" stroke="currentColor" strokeWidth="2" opacity="0.8" />
    
    {/* Small floating shards */}
    <path d="M20 60L25 65L20 70Z" fill="currentColor" opacity="0.4" />
    <path d="M80 30L85 25L90 35Z" fill="currentColor" opacity="0.4" />
  </Box>
);

/**
 * Premium SVG of a sacred Lotus Pradip (oil lamp) with tiered petals.
 */
export const LotusPradip = ({ sx }: IconProps) => (
  <Box component="svg" viewBox="0 0 100 100" fill="none" sx={sx}>
    {/* Base Petals (Lower Layer) */}
    <path d="M50 85C30 85 15 70 15 50C15 45 20 40 25 40L50 60L75 40C80 40 85 45 85 50C85 70 70 85 50 85Z" fill="currentColor" opacity="0.1" />
    
    {/* Symmetrical Lotus Petals */}
    <path d="M50 80C65 80 80 70 80 55C80 45 70 40 50 65C30 40 20 45 20 55C20 70 35 80 50 80Z" stroke="currentColor" strokeWidth="3" />
    <path d="M50 80C55 75 65 65 65 50C65 40 55 35 50 55C45 35 35 40 35 50C35 65 45 75 50 80Z" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    
    {/* The Pradip (Lamp) Bowl */}
    <path d="M35 60C35 58 40 55 50 55C60 55 65 58 65 60V65C65 72 58 78 50 78C42 78 35 72 35 65V60Z" fill="currentColor" opacity="0.2" />
    <path d="M35 60C35 58 40 55 50 55C60 55 65 58 65 60V65C65 72 58 78 50 78C42 78 35 72 35 65V60Z" stroke="currentColor" strokeWidth="2.5" />
    
    {/* The Active Flame */}
    <motion.path 
      d="M50 55C50 55 44 45 44 37C44 29 50 20 50 20C50 20 56 29 56 37C56 45 50 55 50 55Z" 
      fill="currentColor"
    />
    <motion.path 
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      d="M50 55C50 55 42 43 42 33C42 23 50 15 50 15C50 15 58 23 58 33C58 43 50 55 50 55Z" 
      fill="currentColor"
    />
  </Box>
);
