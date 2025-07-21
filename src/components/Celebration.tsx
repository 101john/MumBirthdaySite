import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CelebrationProps {
  totalScore: number;
  completedActivities: string[];
}

const Celebration: React.FC<CelebrationProps> = ({ totalScore, completedActivities }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "You are the most amazing mum in the world! ✨",
    "Your love and warmth light up our lives every single day 💖",
    "Thank you for all the beautiful memories and moments 🌟",
    "Here's to another year of your incredible journey! 🎂",
    "You deserve all the happiness and joy in the world 🌸",
    "Happy Birthday to our superstar! 🎉"
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -80, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            {i % 4 === 0 && <Sparkles className="w-6 h-6 text-yellow-500" />}
            {i % 4 === 1 && <Heart className="w-6 h-6 text-pink-500" />}
            {i % 4 === 2 && <Star className="w-6 h-6 text-purple-500" />}
            {i % 4 === 3 && <Gift className="w-6 h-6 text-blue-500" />}
          </motion.div>
        ))}
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
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'][Math.floor(Math.random() * 6)],
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
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-600 bg-clip-text text-transparent mb-4">
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
            <p className="text-2xl md:text-3xl text-gray-700 font-medium max-w-3xl leading-relaxed">
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
            <div className="inline-flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-yellow-300">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, ease: "linear" }}
                className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4"
              >
                <Star className="w-10 h-10 text-white fill-current" />
              </motion.div>
              <h2 className="text-3xl font-bold text-purple-800 mb-2">{getAchievementLevel()}</h2>
              <p className="text-lg text-gray-600 mb-4">Achievement Unlocked!</p>
              <div className="flex items-center gap-4 text-center">
                <div className="bg-purple-100 px-6 py-3 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">{totalScore}</div>
                  <div className="text-sm text-purple-500">Total Score</div>
                </div>
                <div className="bg-pink-100 px-6 py-3 rounded-xl">
                  <div className="text-2xl font-bold text-pink-600">{completedActivities.length}</div>
                  <div className="text-sm text-pink-500">Activities Done</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Special Birthday Wishes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-3xl p-8 mb-12 shadow-xl"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Special Birthday Wishes</h3>
            <div className="grid md:grid-cols-3 gap-6 text-lg text-gray-700">
              <div className="text-center">
                <div className="text-4xl mb-3">🌟</div>
                <p>May your year be filled with countless magical moments</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💝</div>
                <p>Wishing you endless joy, love, and beautiful surprises</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌈</div>
                <p>Here's to new adventures and wonderful memories ahead</p>
              </div>
            </div>
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-pink-300"
          >
            <div className="text-6xl mb-4">💖</div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              With All Our Love
            </h3>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              This website is just a small token of the immense love and gratitude we have for you. 
              You make every day brighter with your presence, and we're so blessed to have you in our lives.
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
                  <Heart className="w-8 h-8 text-pink-500 fill-current" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Celebration;