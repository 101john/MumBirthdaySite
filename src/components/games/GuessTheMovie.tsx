import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Check, X, Star, Lightbulb } from 'lucide-react';
import { MovieStill } from '../../types';

interface GuessTheMovieProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

// Mock data - will be replaced with actual movie stills
const mockMovieStills: MovieStill[] = [
  {
    id: '1',
    imageUrl: '/assets/minigames/guess_the_movie/still1.jpg',
    movieTitle: 'Dilwale Dulhania Le Jayenge',
    year: '1995'
  },
  {
    id: '2',
    imageUrl: '/assets/minigames/guess_the_movie/still2.jpg',
    movieTitle: 'Kuch Kuch Hota Hai',
    year: '1998'
  },
  {
    id: '3',
    imageUrl: '/assets/minigames/guess_the_movie/still3.jpg',
    movieTitle: 'Mughal-E-Azam',
    year: '1960'
  },
  {
    id: '4',
    imageUrl: '/assets/minigames/guess_the_movie/still4.jpg',
    movieTitle: 'Sholay',
    year: '1975'
  }
];

const GuessTheMovie: React.FC<GuessTheMovieProps> = ({ onComplete, onBack }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentMovie = mockMovieStills[currentMovieIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userGuess.trim()) return;

    const correct = userGuess.toLowerCase().includes(currentMovie.movieTitle.toLowerCase()) ||
                   currentMovie.movieTitle.toLowerCase().includes(userGuess.toLowerCase()) ||
                   userGuess.toLowerCase().replace(/[^a-z]/g, '') === currentMovie.movieTitle.toLowerCase().replace(/[^a-z]/g, '');
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (currentMovieIndex < mockMovieStills.length - 1) {
      setCurrentMovieIndex(currentMovieIndex + 1);
      setUserGuess('');
      setShowResult(false);
      setShowHint(false);
    } else {
      setGameComplete(true);
      onComplete(score + (isCorrect ? 10 : 0));
    }
  };

  const getHint = () => {
    const title = currentMovie.movieTitle;
    const yearHint = `Released in ${currentMovie.year}`;
    const lengthHint = `The title has ${title.split(' ').length} words`;
    return `${yearHint} • ${lengthHint}`;
  };

  if (gameComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md"
        >
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Complete!</h2>
          <p className="text-xl text-gray-600 mb-6">
            Final Score: <span className="font-bold text-blue-600">{score}</span>
          </p>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(Math.min(5, Math.floor(score / 8)))].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-500 fill-current" />
            ))}
          </div>
          <motion.button
            onClick={onBack}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800">Guess the Movie</h1>
            <p className="text-gray-600">Scene {currentMovieIndex + 1} of {mockMovieStills.length}</p>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl shadow-md">
            <span className="text-blue-600 font-bold">Score: {score}</span>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Movie Still */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={`https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800`}
                  alt="Movie scene to guess"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              <motion.div 
                className="absolute bottom-4 left-4 right-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white font-bold text-lg drop-shadow-lg">Classic Bollywood Scene</p>
              </motion.div>
            </motion.div>

            {/* Guess Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Can you name this movie?</h3>

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
                      placeholder="Enter the movie title..."
                      className="w-full p-4 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                      autoFocus
                    />

                    <div className="flex gap-4">
                      <motion.button
                        type="submit"
                        className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!userGuess.trim()}
                      >
                        Submit Answer
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => setShowHint(!showHint)}
                        className="px-6 py-4 border-2 border-blue-500 text-blue-500 rounded-xl hover:bg-blue-50 transition-all duration-300"
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
                        className="bg-yellow-100 border border-yellow-300 rounded-xl p-4"
                      >
                        <p className="text-yellow-800">💡 {getHint()}</p>
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
                        isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 0.5 }}
                    >
                      {isCorrect ? (
                        <Check className="w-10 h-10 text-green-600" />
                      ) : (
                        <X className="w-10 h-10 text-red-600" />
                      )}
                    </motion.div>

                    <h3 className={`text-2xl font-bold mb-4 ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCorrect ? 'Correct!' : 'Not quite!'}
                    </h3>

                    <p className="text-lg text-gray-700 mb-2">
                      The correct answer is: 
                    </p>
                    <p className="font-bold text-blue-600 text-xl mb-2">
                      {currentMovie.movieTitle}
                    </p>
                    <p className="text-gray-500 mb-6">
                      ({currentMovie.year})
                    </p>

                    <motion.button
                      onClick={handleNext}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentMovieIndex < mockMovieStills.length - 1 ? 'Next Movie' : 'Finish Game'}
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

export default GuessTheMovie;