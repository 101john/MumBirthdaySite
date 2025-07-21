import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Check, X, Star, Lightbulb, Palette } from 'lucide-react';

interface GuessTheArtistProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const artistData = [
  {
    id: '1',
    imageUrl: '/assets/minigames/guess_the_artist_from_the_painting/van_gogh.jpg',
    artist: 'Vincent van Gogh',
    fact: 'Van Gogh only sold one painting during his lifetime, yet created over 2,000 artworks in just 10 years!'
  },
  {
    id: '2',
    imageUrl: '/assets/minigames/guess_the_artist_from_the_painting/picasso.jpg',
    artist: 'Pablo Picasso',
    fact: 'Picasso\'s first word was "piz" for pencil, and he could draw before he could walk!'
  },
  {
    id: '3',
    imageUrl: '/assets/minigames/guess_the_artist_from_the_painting/frida-khalo.jpg',
    artist: 'Frida Kahlo',
    fact: 'Frida painted 55 self-portraits because she said "I am my own muse, my own subject. I know myself best."'
  }
];

const GuessTheArtist: React.FC<GuessTheArtistProps> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentArtist = artistData[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userGuess.trim()) return;

    const correct = userGuess.toLowerCase().includes(currentArtist.artist.toLowerCase()) ||
                   currentArtist.artist.toLowerCase().includes(userGuess.toLowerCase());
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (currentIndex < artistData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserGuess('');
      setShowResult(false);
      setShowHint(false);
    } else {
      setGameComplete(true);
      onComplete(score + (isCorrect ? 10 : 0));
    }
  };

  const getHint = () => {
    const artist = currentArtist.artist;
    return `This artist's name starts with "${artist.charAt(0)}" and has ${artist.split(' ').length} words.`;
  };

  if (gameComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-900 flex items-center justify-center px-4 relative overflow-hidden"
      >
        {/* Ornate Background */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url('/assets/mandala pattern.svg')`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat'
            }}
          />
        </div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="relative bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center max-w-md border-2 border-gold-400"
        >
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-3xl font-bold text-gold-400 mb-4 font-serif">Masterpiece Complete!</h2>
          <p className="text-xl text-gold-200 mb-6">
            Final Score: <span className="font-bold text-gold-400">{score}</span>
          </p>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(Math.min(5, Math.floor(score / 8)))].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-gold-400 fill-current" />
            ))}
          </div>
          <motion.button
            onClick={onBack}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-gold-400 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-gold-400/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Games
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-900 py-8 px-4 relative overflow-hidden">
      {/* Ornate Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url('/assets/mandala pattern.svg')`,
            backgroundSize: '300px 300px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-red-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gold-400/30 text-gold-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gold-400 font-serif flex items-center gap-3 justify-center">
              <Palette className="w-10 h-10" />
              Guess the Artist
            </h1>
            <p className="text-gold-200">Painting {currentIndex + 1} of {artistData.length}</p>
          </div>

          <div className="bg-red-800/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-md border border-gold-400/30">
            <span className="text-gold-400 font-bold">Score: {score}</span>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-gold-400/50">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Painting */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-gold-400/20 to-amber-600/20 rounded-2xl overflow-hidden shadow-2xl border-4 border-gold-400/50 p-4">
                <img
                  src={currentArtist.imageUrl}
                  alt="Painting to guess"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.pexels.com/photos/1824234/pexels-photo-1824234.jpeg?auto=compress&cs=tinysrgb&w=500`;
                  }}
                />
              </div>
              
              {/* Decorative Frame Elements */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-gold-400 rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-gold-400 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-gold-400 rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-gold-400 rounded-br-lg" />
            </motion.div>

            {/* Guess Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-3xl font-bold text-gold-400 mb-6 font-serif">Who painted this masterpiece?</h3>

              <AnimatePresence>
                {!showResult ? (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <input
                      type="text"
                      value={userGuess}
                      onChange={(e) => setUserGuess(e.target.value)}
                      placeholder="Enter the artist's name..."
                      className="w-full p-4 border-2 border-gold-400/50 rounded-xl focus:border-gold-400 focus:outline-none text-lg bg-red-800/50 text-gold-100 placeholder-gold-300/70 backdrop-blur-sm"
                      autoFocus
                    />

                    <div className="flex gap-4">
                      <motion.button
                        type="submit"
                        className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-700 text-gold-400 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 border border-gold-400/50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!userGuess.trim()}
                      >
                        Submit Answer
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => setShowHint(!showHint)}
                        className="px-6 py-4 border-2 border-gold-400/50 text-gold-400 rounded-xl hover:bg-gold-400/10 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Lightbulb className="w-6 h-6" />
                      </motion.button>
                    </div>

                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-900/50 border border-gold-400/50 rounded-xl p-4 backdrop-blur-sm"
                      >
                        <p className="text-gold-200">💡 {getHint()}</p>
                      </motion.div>
                    )}
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                        isCorrect ? 'bg-green-600/80' : 'bg-red-600/80'
                      } backdrop-blur-sm border-2 ${isCorrect ? 'border-green-400' : 'border-red-400'}`}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 0.5 }}
                    >
                      {isCorrect ? (
                        <Check className="w-10 h-10 text-green-200" />
                      ) : (
                        <X className="w-10 h-10 text-red-200" />
                      )}
                    </motion.div>

                    <h3 className={`text-2xl font-bold mb-4 ${
                      isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isCorrect ? 'Magnificent!' : 'Not quite!'}
                    </h3>

                    <p className="text-lg text-gold-200 mb-2">
                      The artist is: 
                    </p>
                    <p className="font-bold text-gold-400 text-xl mb-4">
                      {currentArtist.artist}
                    </p>

                    <div className="bg-amber-900/50 border border-gold-400/50 rounded-xl p-4 mb-6 backdrop-blur-sm">
                      <p className="text-gold-200 text-sm leading-relaxed">
                        <span className="text-gold-400 font-semibold">Did you know?</span> {currentArtist.fact}
                      </p>
                    </div>

                    <motion.button
                      onClick={handleNext}
                      className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-gold-400 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-gold-400/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentIndex < artistData.length - 1 ? 'Next Painting' : 'Finish Game'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GuessTheArtist;