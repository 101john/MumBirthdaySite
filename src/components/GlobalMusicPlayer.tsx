import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url: string;
}

interface GlobalMusicPlayerProps {
  tracks: Track[];
  isPaused?: boolean;
}

const GlobalMusicPlayer: React.FC<GlobalMusicPlayerProps> = ({ tracks, isPaused = false }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = tracks[currentTrackIndex];

  // Auto-start music when component mounts
  useEffect(() => {
    if (!hasStarted && audioRef.current) {
      // Add a small delay to ensure the component is fully mounted
      const timer = setTimeout(() => {
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        }).catch(() => {
          // If autoplay fails (browser policy), user will need to click play
          setHasStarted(true);
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasStarted]);

  // Handle external pause (from videos)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPaused && isPlaying) {
      audio.pause();
    } else if (!isPaused && isPlaying) {
      audio.play();
    }
  }, [isPaused, isPlaying]);

  // Auto-advance to next track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTrackEnd = () => {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      setCurrentTrackIndex(nextIndex);
      // Keep playing if we were playing
      if (isPlaying) {
        setTimeout(() => {
          audio.play();
        }, 100);
      }
    };

    audio.addEventListener('ended', handleTrackEnd);
    return () => audio.removeEventListener('ended', handleTrackEnd);
  }, [currentTrackIndex, tracks.length, isPlaying]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log('Could not play audio');
      });
    }
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        loop={false}
        volume={0.3}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="auto"
      />

      {/* Top Right Control */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 right-6 z-50"
      >
        <motion.div
          className="bg-gradient-to-r from-red-800/90 to-red-900/90 backdrop-blur-lg rounded-2xl p-4 border-2 border-gold-400/50 shadow-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3">
            {/* Current Track Info */}
            <div className="hidden sm:block text-right">
              <div className="text-gold-400 font-semibold text-sm max-w-32 truncate">
                {currentTrack?.title || 'No Track'}
              </div>
              <div className="text-gold-300 text-xs max-w-32 truncate">
                {currentTrack?.artist || 'Unknown'}
              </div>
            </div>

            {/* Music Icon */}
            <motion.div
              animate={{ 
                rotate: isPlaying && !isPaused ? [0, 5, -5, 0] : 0 
              }}
              transition={{ 
                duration: 2, 
                repeat: isPlaying && !isPaused ? Infinity : 0 
              }}
            >
              <Music className="w-5 h-5 text-gold-400" />
            </motion.div>

            {/* Play/Pause Button */}
            <motion.button
              onClick={handlePlayPause}
              className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:shadow-xl transition-all duration-300 border border-gold-400/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isPaused}
            >
              {isPlaying && !isPaused ? (
                <Pause className="w-5 h-5 text-gold-400" />
              ) : (
                <Play className="w-5 h-5 ml-0.5 text-gold-400" />
              )}
            </motion.button>
          </div>

          {/* Pause Indicator */}
          {isPaused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-2 -right-2 bg-amber-500 text-red-900 text-xs px-2 py-1 rounded-full font-bold"
            >
              Video Playing
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default GlobalMusicPlayer;