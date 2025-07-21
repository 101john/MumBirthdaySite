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
              Dear Mum ✨
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
              A journey through memories, movies, and moments that celebrate the incredible woman you are
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
              className="px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 text-gold-400 font-bold text-xl rounded-full shadow-xl border-2 border-gold-400 flex items-center gap-4 hover:shadow-2xl transition-all duration-300 mx-auto"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
              }}
            >
              <Sparkles className="w-8 h-8" />
              Begin Your Journey
              <Sparkles className="w-8 h-8" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Ornamental Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold-400 text-3xl opacity-60"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            {['🪷', '🕉️', '✨', '🌟', '💫', '🔱', '🪔', '🌺'][i]}
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Hero;