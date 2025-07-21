import { motion } from 'framer-motion';
import { useState } from 'react';
import { Palette, Film, Grid3X3, Trophy, Star, Gamepad2 } from 'lucide-react';
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
      color: 'from-red-600 to-red-800',
      bgColor: 'bg-red-800/20'
    },
    {
      id: 'movie',
      title: 'Guess the Movie',
      description: 'Identify Bollywood classics from iconic scenes',
      icon: Film,
      color: 'from-amber-600 to-red-700',
      bgColor: 'bg-amber-800/20'
    },
    {
      id: 'wordle',
      title: 'Bollywood Wordle',
      description: 'Solve Bollywood-themed word puzzles',
      icon: Grid3X3,
      color: 'from-red-700 to-amber-700',
      bgColor: 'bg-red-700/20'
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
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-900 py-16 px-4 relative overflow-hidden">
      {/* Ornate Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url('/assets/mandala pattern.svg')`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold font-serif text-gold-400 mb-4 flex items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Gamepad2 className="w-16 h-16" />
            Game Zone
          </motion.h2>
          <motion.p 
            className="text-xl text-gold-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Challenge yourself with these delightful games crafted just for you!
          </motion.p>

          {/* Score Display */}
          {completedGames.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-800/80 to-amber-800/80 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-gold-400/50"
            >
              <Trophy className="w-8 h-8 text-gold-400" />
              <span className="font-bold text-gold-400 text-xl">Total Score: {totalScore}</span>
              <div className="flex gap-1">
                {completedGames.map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-gold-400 fill-current" />
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
                  bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl 
                  transition-all duration-500 cursor-pointer border-2 border-gold-400/30
                  hover:border-gold-400 group-hover:scale-105
                  ${isCompleted ? 'ring-4 ring-gold-400/50' : ''}
                `}
                onClick={() => handleGameSelect(game.id)}
                style={{ perspective: 1000 }}
              >
                {/* Completion Badge */}
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 bg-gold-400 rounded-full p-3 shadow-lg border-2 border-red-800"
                  >
                    <Trophy className="w-6 h-6 text-red-800" />
                  </motion.div>
                )}

                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-gold-400/50" />
                <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-gold-400/50" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-gold-400/50" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-gold-400/50" />

                {/* Game Icon */}
                <motion.div
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${game.color} flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-xl`}
                  whileHover={{ scale: 1.1 }}
                >
                  <IconComponent className="w-12 h-12 text-gold-200" />
                </motion.div>

                {/* Game Info */}
                <h3 className="text-2xl font-bold text-gold-400 mb-3 text-center font-serif">
                  {game.title}
                </h3>
                <p className="text-gold-200 text-center leading-relaxed mb-6">
                  {game.description}
                </p>

                {/* Play Button */}
                <motion.button
                  className={`w-full py-4 rounded-xl bg-gradient-to-r ${game.color} text-gold-200 font-semibold hover:shadow-lg transition-all duration-300 border border-gold-400/30 hover:border-gold-400`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isCompleted ? 'Play Again' : 'Start Game'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedGames.length === games.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-16 p-8 bg-gradient-to-r from-red-800/90 to-amber-800/90 backdrop-blur-sm rounded-3xl border-2 border-gold-400/50"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-gold-400 mb-4 font-serif">
              Congratulations, Mum!
            </h3>
            <p className="text-xl text-gold-200">
              You've mastered all the games! Your total score is <span className="font-bold text-gold-400">{totalScore}</span>
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-gold-400 fill-current" />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MiniGames;