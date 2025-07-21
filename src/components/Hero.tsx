import { motion } from 'framer-motion';
import { Play, Volume2, Heart, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  onStartJourney: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartJourney }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [srkMessagePlayed, setSrkMessagePlayed] = useState(false);

  const handlePlaySRKMessage = () => {
    // This will be connected to the actual audio file later
    setSrkMessagePlayed(true);
    setAudioPlaying(true);
    setTimeout(() => setAudioPlaying(false), 3000);
  };

  const handleStartJourney = () => {
    onStartJourney();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-gold-400 to-amber-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-amber-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-4"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          >
            Happy Birthday
          </motion.h1>
          <motion.h2 
            className="text-4xl md:text-6xl font-serif text-amber-700 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Dear Mum ✨
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            A journey through memories, movies, and moments that celebrate the incredible woman you are
          </motion.p>
        </motion.div>

        {/* SRK Message Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mb-8"
        >
          <motion.button
            onClick={handlePlaySRKMessage}
            className={`px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold text-lg shadow-lg flex items-center gap-3 transition-all duration-300 ${
              audioPlaying ? 'scale-110' : 'hover:scale-105'
            }`}
            whileTap={{ scale: 0.95 }}
            disabled={audioPlaying}
          >
            {audioPlaying ? (
              <>
                <Volume2 className="w-6 h-6 animate-pulse" />
                Playing SRK's Message...
              </>
            ) : srkMessagePlayed ? (
              <>
                <Heart className="w-6 h-6" />
                Replay SRK's Wish
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                Special Message from SRK
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Start Journey Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.button
            onClick={handleStartJourney}
            className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-full shadow-xl flex items-center gap-4 hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-8 h-8" />
            Begin Your Journey
            <Sparkles className="w-8 h-8" />
          </motion.button>
        </motion.div>

        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-400 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          >
            💖
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Hero;