import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackgroundMusicProps {
  isPaused?: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ isPaused = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    '/assets/background_music/tujhe_dekha_toh.mp3',
    '/assets/background_music/mehndi_laga_ke.mp3',
    '/assets/background_music/mere_khwabon_mein.mp3',
    '/assets/background_music/ho_gaya_hai.mp3',
    '/assets/background_music/ghar_aaja.mp3',
    '/assets/background_music/ruk_ja.mp3'
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = false;

    const handleEnded = () => {
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = tracks[currentTrack];
    if (!isPaused && !isMuted) {
      audio.play().catch(console.error);
    }
  }, [currentTrack, isPaused, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPaused) {
      audio.pause();
    } else if (!isMuted) {
      audio.play().catch(console.error);
    }
  }, [isPaused, isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      setIsMuted(false);
      if (!isPaused) {
        audio.play().catch(console.error);
      }
    } else {
      setIsMuted(true);
      audio.pause();
    }
  };

  return (
    <>
      <audio ref={audioRef} />
      <motion.button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 bg-red-900/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gold-400/30 hover:bg-red-800/80 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-gold-400" />
        ) : (
          <Volume2 className="w-6 h-6 text-gold-400" />
        )}
      </motion.button>
    </>
  );
};

export default BackgroundMusic;