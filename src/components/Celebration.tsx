import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Gift, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CelebrationProps {
  totalScore: number;
  completedActivities: string[];
}

const Celebration: React.FC<CelebrationProps> = ({ totalScore, completedActivities }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "You are a pretty good mum 🙃",
    "Your love and warmth light up our lives every single day 💖. HOLY YAP",
    "Thank you for paying our school fees",
    "We would be obese without you 🎂",
    "Have a good day. 🎇",
    "Happy Birthday."
  ];

  useEffect(() => {
    setShowConfetti(true);
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getAchievementLevel = () => {
    const activityCount = completedActivities.length;
    if (activityCount >= 4) return 'LEGEND';
    if (activityCount >= 3) return 'SUPERSTAR';
    if (activityCount >= 2) return 'CHAMPION';
    return 'WONDERFUL';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-900 relative overflow-hidden">
      {/* Ornate Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url('/assets/mandala pattern.svg')`,
            backgroundSize: '300px 300px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      {/* Decorative Mandala Overlays */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-48 h-48 opacity-20"
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
          className="absolute bottom-10 right-10 w-64 h-64 opacity-20"
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

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#fbbf24', '#f59e0b', '#dc2626', '#b91c1c', '#92400e', '#d97706'][Math.floor(Math.random() * 6)],
              }}
              initial={{ y: -100, rotate: 0, opacity: 1 }}
              animate={{
                y: window.innerHeight + 100,
                rotate: 720,
                opacity: 0,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 3,
                ease: "easeIn"
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main Celebration Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16 max-w-4xl"
        >
          {/* Birthday Title */}
          <motion.div
            className="mb-8"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h1 className="text-6xl md:text-8xl font-bold font-serif bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 bg-clip-text text-transparent mb-4">
              🎉 CELEBRATION TIME! 🎉
            </h1>
          </motion.div>

          {/* Rotating Messages */}
          <motion.div
            className="h-32 flex items-center justify-center mb-8"
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl md:text-3xl text-gold-200 font-medium max-w-3xl leading-relaxed">
              {messages[currentMessageIndex]}
            </p>
          </motion.div>

          {/* Achievement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-flex flex-col items-center bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-gold-400">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, ease: "linear" }}
                className="w-20 h-20 bg-gradient-to-r from-gold-400 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow-xl"
              >
                <Crown className="w-10 h-10 text-red-800 fill-current" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gold-400 mb-2 font-serif">{getAchievementLevel()}</h2>
              <p className="text-lg text-gold-200 mb-4">Achievement Unlocked!</p>
              <div className="flex items-center gap-4 text-center">
                <div className="bg-red-700/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-gold-400/50">
                  <div className="text-2xl font-bold text-gold-400">{totalScore}</div>
                  <div className="text-sm text-gold-300">Total Score</div>
                </div>
                <div className="bg-amber-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-gold-400/50">
                  <div className="text-2xl font-bold text-gold-400">{completedActivities.length}</div>
                  <div className="text-sm text-gold-300">Activities Done</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Special Birthday Wishes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="bg-gradient-to-br from-red-800/90 to-amber-800/90 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl border-2 border-gold-400/50"
          >
            <h3 className="text-3xl font-bold text-gold-400 mb-6 font-serif">Special Birthday Wishes</h3>
            <div className="grid md:grid-cols-3 gap-6 text-lg text-gold-200">
              <div className="text-center">
                <div className="text-4xl mb-3">👩🏿‍🍳</div>
                <p>May your year be filled with countless magical moments</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">👽🦧</div>
                <p>Wishing you endless joy, love, and beautiful surprises</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💀🌈🤺🤺</div>
                <p>Here's to new adventures and wonderful memories ahead</p>
              </div>
            </div>
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-gold-400"
          >
            <div className="text-6xl mb-4">💖</div>
            <h3 className="text-4xl font-bold text-gold-400 mb-4 font-serif">
              With All Our Love
            </h3>
            <p className="text-xl text-gold-200 leading-relaxed max-w-2xl mx-auto">
              This website is just a small token of the immense love and gratitude we have for you. 
              You make every day brighter with your presence, and we're so blessed to have you in our lives. 🫥😀
            </p>
            <div className="mt-6 flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 360, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <Heart className="w-8 h-8 text-gold-400 fill-current" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Ornamental Elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold-400 text-4xl opacity-40"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
            }}
            animate={{
              y: [-30, -80, -30],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.4, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
          >
            {['🪷', '🕉️', '✨', '🌟', '💫', '🔱', '🪔', '🌺', '🎭', '🎪', '🎨', '🎵'][i]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Celebration;