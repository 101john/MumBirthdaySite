import { motion } from 'framer-motion';
import { useState } from 'react';
import { Palette, Film, Grid3X3, Trophy, Star } from 'lucide-react';
import GuessTheArtist from './games/GuessTheArtist';
import GuessTheMovie from './games/GuessTheMovie';
import BollywoodWordle from './games/BollywoodWordle';

interface MiniGamesProps {
  onGameComplete: (game: string, score: number) => void;
}

const MiniGames: React.FC<MiniGamesProps> = ({ onGameComplete }) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  const games = [
    {
      id: 'artist',
      title: 'Guess the Artist',
      description: 'Test your knowledge of famous paintings and their creators',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'movie',
      title: 'Guess the Movie',
      description: 'Identify Bollywood classics from iconic scenes',
      icon: Film,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'wordle',
      title: 'Bollywood Wordle',
      description: 'Solve Bollywood-themed word puzzles',
      icon: Grid3X3,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100'
    }
  ];

  const handleGameSelect = (gameId: string) => {
    setActiveGame(gameId);
  };

  const handleGameEnd = (gameId: string, score: number) => {
    if (!completedGames.includes(gameId)) {
      setCompletedGames([...completedGames, gameId]);
      setTotalScore(totalScore + score);
      onGameComplete(gameId, score);
    }
    setActiveGame(null);
  };

  const handleBackToMenu = () => {
    setActiveGame(null);
  };

  if (activeGame) {
    const gameProps = {
      onComplete: (score: number) => handleGameEnd(activeGame, score),
      onBack: handleBackToMenu
    };

    switch (activeGame) {
      case 'artist':
        return <GuessTheArtist {...gameProps} />;
      case 'movie':
        return <GuessTheMovie {...gameProps} />;
      case 'wordle':
        return <BollywoodWordle {...gameProps} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Game Zone
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Challenge yourself with these delightful games!
          </motion.p>

          {/* Score Display */}
          {completedGames.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-yellow-100 px-6 py-3 rounded-full"
            >
              <Trophy className="w-6 h-6 text-yellow-600" />
              <span className="font-bold text-yellow-800">Total Score: {totalScore}</span>
              <div className="flex gap-1">
                {completedGames.map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {games.map((game, index) => {
            const IconComponent = game.icon;
            const isCompleted = completedGames.includes(game.id);

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                <div className={`
                  ${game.bgColor} p-8 rounded-3xl shadow-xl hover:shadow-2xl 
                  transition-all duration-500 cursor-pointer border-4 border-transparent
                  hover:border-opacity-30 group-hover:scale-105
                  ${isCompleted ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}
                `}
                onClick={() => handleGameSelect(game.id)}
                >
                  {/* Completion Badge */}
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-2 shadow-lg"
                    >
                      <Trophy className="w-6 h-6 text-yellow-800" />
                    </motion.div>
                  )}

                  {/* Game Icon */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${game.color} flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Game Info */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                    {game.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {game.description}
                  </p>

                  {/* Play Button */}
                  <motion.button
                    className={`w-full mt-6 py-3 rounded-xl bg-gradient-to-r ${game.color} text-white font-semibold hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isCompleted ? 'Play Again' : 'Start Game'}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedGames.length === games.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-16 p-8 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-3xl"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Congratulations, Mum!
            </h3>
            <p className="text-xl text-gray-600">
              You've completed all the games! Your total score is <span className="font-bold text-yellow-600">{totalScore}</span>
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-500 fill-current" />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MiniGames;