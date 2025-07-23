import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onStartJourney: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartJourney }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-amber-900">
      {/* Ornate Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url('/assets/mandala pattern.svg')`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
          }}
        />
      </div>

      {/* Decorative Mandala Overlay */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <img 
            src="/assets/beautiful-flower-mandala-vintage-decorative-design.png" 
            alt="" 
            className="w-full h-full object-contain"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 opacity-10"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <img 
            src="/assets/beautiful-flower-mandala-vintage-decorative-design.png" 
            alt="" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Ornate Border Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative border-4 border-gold-400 rounded-3xl p-12 bg-black/20 backdrop-blur-sm shadow-2xl"
          style={{
            boxShadow: '0 0 50px rgba(251, 191, 36, 0.3), inset 0 0 50px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Corner Decorations */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gold-400 rounded-full shadow-lg" />
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gold-400 rounded-full shadow-lg" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gold-400 rounded-full shadow-lg" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gold-400 rounded-full shadow-lg" />

          {/* Title Animation */}
          <div className="text-center mb-8">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-4 font-serif"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{
                background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #dc2626, #b91c1c)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 4s ease-in-out infinite'
              }}
            >
              Happy Birthday
            </motion.h1>
            <motion.h2 
              className="text-4xl md:text-6xl font-serif text-gold-400 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(251, 191, 36, 0.3)'
              }}
            >
                Dear Mother ✨
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-gold-200 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
              }}
            >
              A journey through memories, movies, and games, because you feed us.
            </motion.p>
          </div>

          {/* Start Journey Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-center"
          >
            <motion.button
              onClick={onStartJourney}
              className="px-10 py-4 bg-gradient-to-r from-amber-500 to-red-600 text-white font-bold text-lg rounded-lg shadow-lg border-2 border-amber-400 hover:shadow-xl transition-all duration-300 mx-auto"
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                backgroundImage: 'linear-gradient(135deg, #fbbf24, #dc2626)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease-in-out infinite'
              }}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Don't Get Your Hopes Up
                <Sparkles className="w-6 h-6" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Memory Images */}
        {[
          'IMG-20250722-WA0007.jpg',
          'IMG-20250722-WA0012.jpg',
          'IMG-20250722-WA0015.jpg',
          'IMG-20250722-WA0019.jpg',
          'IMG-20250722-WA0023.jpg',
          'IMG-20250722-WA0028.jpg',
          'IMG-20250722-WA0032.jpg',
          'IMG-20250722-WA0036.jpg',
          'IMG-20250722-WA0008.jpg',
          'IMG-20250722-WA0010.jpg',
          'IMG-20250722-WA0011.jpg',
          'IMG-20250722-WA0013.jpg',
          'IMG-20250722-WA0016.jpg',
          'IMG-20250722-WA0020.jpg',
          'IMG-20250722-WA0024.jpg',
          'IMG-20250722-WA0027.jpg',
        ].map((imageName, i) => {
          // Generate random positions avoiding the center (30% to 70%)
          const isLeftSide = Math.random() < 0.5;
          const startX = isLeftSide ? 
            Math.random() * 25 : // Left side
            75 + Math.random() * 25; // Right side
          
          const startY = 5 + Math.random() * 90; // Keep away from very top/bottom
          
          // More varied velocities based on position
          const velocityX = (Math.random() - 0.5) * (isLeftSide ? 50 : -50); // Move toward opposite side
          const velocityY = (Math.random() - 0.5) * 60; // More vertical movement
          
          // Randomize image size for variety
          const imageSize = Math.random() < 0.3 ? 'small' : 'normal';
          
          return (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                zIndex: 5,
                perspective: '1000px'
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                x: [startX, startX + velocityX, startX + velocityX * 0.5, startX],
                y: [startY, startY + velocityY, startY + velocityY * 0.7, startY],
                rotateX: [-3, 3, -3, 0],
                rotateY: [-3, 3, -3, 0],
                opacity: [0.4, 0.7, 0.7, 0.4],
                scale: [0.85, 1, 0.95, 0.85],
              }}
              transition={{
                duration: 15 + Math.random() * 10, // Random duration for more natural feel
                repeat: Infinity,
                delay: i * 0.5, // Faster initial appearance
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1], // More control points for smoother movement
                // Separate controls for each property
                opacity: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                },
                scale: {
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <img 
                src={`/assets/images/${imageName}`}
                alt=""
                className={`${imageSize === 'small' ? 'w-20 h-20 md:w-24 md:h-24' : 'w-24 h-24 md:w-32 md:h-32'} object-cover rounded-xl`}
                style={{
                  border: '2px solid rgba(251, 191, 36, 0.3)',
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.15)',
                  filter: 'brightness(0.95) contrast(1.1) sepia(0.05)'
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Hero;