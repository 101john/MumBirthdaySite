import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Check, X, Star, Film, Eye } from 'lucide-react';

interface GuessTheMovieProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const movieData = [
  {
    id: '1',
    imageUrl: '/assets/minigames/guess_the_movie/dil_chahta_hai.webp',
    posterUrl: '/assets/movie_posters/movie_posters_for_the_answers_to_guess_the_movie_minigame/dil_chahta_hai.jpg',
    movieTitle: 'Dil Chahta Hai',
    year: '2001',
    fact: 'This film revolutionized Bollywood by showing modern urban friendships and was shot in Sydney, making it one of the first major Bollywood films shot extensively abroad!'
  },
  {
    id: '2',
    imageUrl: '/assets/minigames/guess_the_movie/kal_ho_naa_ho.webp',
    posterUrl: '/assets/movie_posters/movie_posters_for_the_answers_to_guess_the_movie_minigame/kal_ho_naa_ho.jpg',
    movieTitle: 'Kal Ho Naa Ho',
    year: '2003',
    fact: 'The film was originally titled "Kabhi Alvida Na Kehna" but was changed. Shah Rukh Khan\'s character Aman was inspired by the idea of a guardian angel!'
  },
  {
    id: '3',
    imageUrl: '/assets/minigames/guess_the_movie/barsaat.webp',
    posterUrl: '/assets/movie_posters/movie_posters_for_the_answers_to_guess_the_movie_minigame/barsaat.jpg',
    movieTitle: 'Barsaat',
    year: '1995',
    fact: 'This was Bobby Deol\'s debut film and took 7 years to complete! The film\'s music by Nadeem-Shravan became a massive hit before the movie even released.'
  },
  {
    id: '4',
    imageUrl: '/assets/minigames/guess_the_movie/chup_chup_ke.webp',
    posterUrl: '/assets/movie_posters/movie_posters_for_the_answers_to_guess_the_movie_minigame/chup_chup_ke.webp',
    movieTitle: 'Chup Chup Ke',
    year: '2006',
    fact: 'Shahid Kapoor had to learn sign language for this film! The movie was a remake of a Malayalam film and showcased brilliant comic timing.'
  }
];

// Shuffle the array
for (let i = movieData.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [movieData[i], movieData[j]] = [movieData[j], movieData[i]];
}

const GuessTheMovie: React.FC<GuessTheMovieProps> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showPosterHint, setShowPosterHint] = useState(false);

  const currentMovie = movieData[currentIndex];
  const maxAttempts = 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userGuess.trim()) return;

    const correct = userGuess.toLowerCase().includes(currentMovie.movieTitle.toLowerCase()) ||
                   currentMovie.movieTitle.toLowerCase().includes(userGuess.toLowerCase()) ||
                   userGuess.toLowerCase().replace(/[^a-z]/g, '') === currentMovie.movieTitle.toLowerCase().replace(/[^a-z]/g, '');
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      const bonusPoints = attempts === 0 ? 15 : 10;
      setScore(score + bonusPoints);
    } else if (attempts === 0) {
      setShowPosterHint(true);
      setAttempts(1);
      setShowResult(false);
      setUserGuess('');
      return;
    }
  };

  const handleNext = () => {
    if (currentIndex < movieData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserGuess('');
      setShowResult(false);
      setAttempts(0);
      setShowPosterHint(false);
    } else {
      setGameComplete(true);
      onComplete(score);
    }
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
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-3xl font-bold text-gold-400 mb-4 font-serif">Cinema Master!</h2>
          <p className="text-xl text-gold-200 mb-6">
            Final Score: <span className="font-bold text-gold-400">{score}</span>
          </p>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(Math.min(5, Math.floor(score / 10)))].map((_, i) => (
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
              <Film className="w-10 h-10" />
              Guess the Movie
            </h1>
            <p className="text-gold-200">Scene {currentIndex + 1} of {movieData.length}</p>
          </div>

          <div className="bg-red-800/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-md border border-gold-400/30">
            <span className="text-gold-400 font-bold">Score: {score}</span>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-gold-400/50">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Movie Still and Poster Hint */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Movie Still */}
              <div className="aspect-video bg-gradient-to-br from-gold-400/20 to-amber-600/20 rounded-2xl overflow-hidden shadow-2xl border-4 border-gold-400/50 p-4">
                <img
                  src={currentMovie.imageUrl}
                  alt="Movie scene to guess"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800`;
                  }}
                />
              </div>

              {/* Poster Hint */}
              {showPosterHint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                >
                  <div className="aspect-[3/4] max-w-48 mx-auto bg-gradient-to-br from-gold-400/20 to-amber-600/20 rounded-2xl overflow-hidden shadow-2xl border-4 border-gold-400/50 p-2">
                    <div className="relative">
                      <img
                        src={currentMovie.posterUrl}
                        alt="Movie poster hint"
                        className="w-full h-full object-cover rounded-xl filter blur-sm"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                        <Eye className="w-8 h-8 text-gold-400" />
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-gold-300 text-sm mt-2">Poster Hint (Blurred)</p>
                </motion.div>
              )}
            </motion.div>

            {/* Guess Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-3xl font-bold text-gold-400 mb-6 font-serif">Can you name this movie?</h3>
              
              <div className="mb-4">
                <p className="text-gold-200">
                  Attempt: <span className="font-bold text-gold-400">{attempts + 1}</span> of {maxAttempts}
                </p>
              </div>

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
                      className="w-full p-4 border-2 border-gold-400/50 rounded-xl focus:border-gold-400 focus:outline-none text-lg bg-red-800/50 text-gold-100 placeholder-gold-300/70 backdrop-blur-sm"
                      autoFocus
                    />

                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-gold-400 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 border border-gold-400/50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!userGuess.trim()}
                    >
                      Submit Answer
                    </motion.button>
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
                      {isCorrect ? 'Bollywood Expert!' : 'Not quite!'}
                    </h3>

                    <p className="text-lg text-gold-200 mb-2">
                      The movie is: 
                    </p>
                    <p className="font-bold text-gold-400 text-xl mb-2">
                      {currentMovie.movieTitle}
                    </p>
                    <p className="text-gold-300 mb-4">
                      ({currentMovie.year})
                    </p>

                    {/* Movie Poster Reveal */}
                    <div className="aspect-[3/4] max-w-48 mx-auto mb-6 bg-gradient-to-br from-gold-400/20 to-amber-600/20 rounded-2xl overflow-hidden shadow-2xl border-4 border-gold-400/50 p-2">
                      <img
                        src={currentMovie.posterUrl}
                        alt={currentMovie.movieTitle}
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop`;
                        }}
                      />
                    </div>

                    <div className="bg-amber-900/50 border border-gold-400/50 rounded-xl p-4 mb-6 backdrop-blur-sm">
                      <p className="text-gold-200 text-sm leading-relaxed">
                        <span className="text-gold-400 font-semibold">Fun Fact:</span> {currentMovie.fact}
                      </p>
                    </div>

                    <motion.button
                      onClick={handleNext}
                      className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-gold-400 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-gold-400/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentIndex < movieData.length - 1 ? 'Next Movie' : 'Finish Game'}
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