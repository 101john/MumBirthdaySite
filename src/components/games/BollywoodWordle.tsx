import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Delete, Star, RotateCcw, Grid3X3 } from 'lucide-react';

interface BollywoodWordleProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface WordData {
  word: string;
  fact: string;
}

const parseWordsData = (): WordData[] => {
  const wordsText = `RADHA — Classic heroine name, timeless.
RAJAA — Variant of Raj, the eternal hero name.
DILSE — Means "from the heart," iconic phrase.
PYAAR — Love, of course.
CHHAL — Meaning "deceit" or "trick," common theme.
TUMHI — "Only you," a popular word in songs.
MEHKA — "Fragrant," poetic and Bollywood-esque.
ZINDI — Short for "zindagi" (life), used poetically.
SHAAN — Pride, grandeur — common in movie titles/names.
SANAM — Beloved, darling.`;

  return wordsText.split('\n').map(line => {
    const [word, fact] = line.split(' — ');
    return { word: word.trim(), fact: fact.trim() };
  }).filter(item => item.word && item.fact);
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const BollywoodWordle: React.FC<BollywoodWordleProps> = ({ onComplete, onBack }) => {
  const [wordsData] = useState<WordData[]>(parseWordsData());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [score, setScore] = useState(0);
  const [allWordsComplete, setAllWordsComplete] = useState(false);
  const [usedLetters, setUsedLetters] = useState<Record<string, 'correct' | 'present' | 'absent'>>({});

  const currentWordData = wordsData[currentWordIndex];
  const maxGuesses = 6;

  const resetGame = () => {
    setCurrentGuess('');
    setGuesses([]);
    setGameWon(false);
    setGameLost(false);
    setUsedLetters({});
  };

  const handleKeyPress = (letter: string) => {
    if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + letter);
    }
  };

  const handleDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentGuess.length !== 5 || gameWon || gameLost) return;

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    // Update used letters
    const newUsedLetters = { ...usedLetters };
    for (let i = 0; i < currentGuess.length; i++) {
      const letter = currentGuess[i];
      if (currentWordData.word[i] === letter) {
        newUsedLetters[letter] = 'correct';
      } else if (currentWordData.word.includes(letter)) {
        if (newUsedLetters[letter] !== 'correct') {
          newUsedLetters[letter] = 'present';
        }
      } else {
        if (!newUsedLetters[letter]) {
          newUsedLetters[letter] = 'absent';
        }
      }
    }
    setUsedLetters(newUsedLetters);

    if (currentGuess === currentWordData.word) {
      setGameWon(true);
      const bonusPoints = Math.max(0, (maxGuesses - newGuesses.length) * 2);
      setScore(score + 10 + bonusPoints);
    } else if (newGuesses.length >= maxGuesses) {
      setGameLost(true);
    }

    setCurrentGuess('');
  };

  const handleNextWord = () => {
    if (currentWordIndex < wordsData.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      resetGame();
    } else {
      setAllWordsComplete(true);
      onComplete(score);
    }
  };

  const getLetterStyle = (letter: string, position: number, word: string) => {
    if (word[position] === letter) {
      return 'bg-green-600 text-white border-green-500 shadow-lg';
    } else if (currentWordData.word.includes(letter)) {
      return 'bg-yellow-600 text-white border-yellow-500 shadow-lg';
    } else {
      return 'bg-red-800 text-gold-200 border-red-700 shadow-lg';
    }
  };

  const getKeyboardLetterStyle = (letter: string) => {
    const status = usedLetters[letter];
    switch (status) {
      case 'correct':
        return 'bg-green-600 text-white border-green-500';
      case 'present':
        return 'bg-yellow-600 text-white border-yellow-500';
      case 'absent':
        return 'bg-red-800 text-gold-200 border-red-700';
      default:
        return 'bg-red-700/50 text-gold-200 border-gold-400/50 hover:bg-red-600/50';
    }
  };

  if (allWordsComplete) {
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
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gold-400 mb-4 font-serif">Wordle Master!</h2>
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
        className="max-w-2xl mx-auto relative z-10"
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
              <Grid3X3 className="w-10 h-10" />
              Bollywood Wordle
            </h1>
            <p className="text-gold-200">Word {currentWordIndex + 1} of {wordsData.length}</p>
          </div>

          <div className="bg-red-800/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-md border border-gold-400/30">
            <span className="text-gold-400 font-bold">Score: {score}</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border-2 border-gold-400/50">
          <div className="grid gap-2 mb-8" style={{ gridTemplateRows: `repeat(${maxGuesses}, 1fr)` }}>
            {[...Array(maxGuesses)].map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-2">
                {[...Array(5)].map((_, colIndex) => {
                  let letter = '';
                  let style = 'border-2 border-gold-400/30 bg-red-800/30 backdrop-blur-sm';

                  if (rowIndex < guesses.length) {
                    letter = guesses[rowIndex][colIndex] || '';
                    style = getLetterStyle(letter, colIndex, guesses[rowIndex]);
                  } else if (rowIndex === guesses.length) {
                    letter = currentGuess[colIndex] || '';
                    style = letter ? 'border-2 border-gold-400 bg-red-700/50 backdrop-blur-sm' : 'border-2 border-gold-400/30 bg-red-800/30 backdrop-blur-sm';
                  }

                  return (
                    <motion.div
                      key={colIndex}
                      className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl font-bold rounded-lg ${style}`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: colIndex * 0.1 }}
                    >
                      {letter}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Game Status */}
          <AnimatePresence>
            {(gameWon || gameLost) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                {gameWon ? (
                  <div>
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Shabash!</h3>
                    <p className="text-gold-200 mb-2">The word was: <span className="font-bold text-gold-400">{currentWordData.word}</span></p>
                    <div className="bg-amber-900/50 border border-gold-400/50 rounded-xl p-4 mb-4 backdrop-blur-sm">
                      <p className="text-gold-200 text-sm">"{currentWordData.fact}"</p>
                    </div>
                    <motion.button
                      onClick={handleNextWord}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-gold-400 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-gold-400/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentWordIndex < wordsData.length - 1 ? 'Next Word' : 'Complete Game'}
                    </motion.button>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-2xl font-bold text-red-400 mb-2">Koi Baat Nahi!</h3>
                    <p className="text-gold-200 mb-2">The word was: <span className="font-bold text-gold-400">{currentWordData.word}</span></p>
                    <div className="bg-amber-900/50 border border-gold-400/50 rounded-xl p-4 mb-4 backdrop-blur-sm">
                      <p className="text-gold-200 text-sm">"{currentWordData.fact}"</p>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <motion.button
                        onClick={resetGame}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 border border-blue-400/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </motion.button>
                      <motion.button
                        onClick={handleNextWord}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-gold-400 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-gold-400/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentWordIndex < wordsData.length - 1 ? 'Skip to Next' : 'Complete Game'}
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Keyboard */}
        <div className="space-y-2">
          {[
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {rowIndex === 2 && (
                <motion.button
                  onClick={handleSubmit}
                  disabled={currentGuess.length !== 5 || gameWon || gameLost}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors duration-200 border border-green-400/50"
                  whileTap={{ scale: 0.95 }}
                >
                  ENTER
                </motion.button>
              )}
              {row.map((letter) => (
                <motion.button
                  key={letter}
                  onClick={() => handleKeyPress(letter)}
                  disabled={gameWon || gameLost}
                  className={`w-10 h-12 md:w-12 md:h-14 rounded-lg font-bold text-sm md:text-base transition-colors duration-200 disabled:cursor-not-allowed border ${getKeyboardLetterStyle(letter)}`}
                  whileTap={{ scale: 0.95 }}
                >
                  {letter}
                </motion.button>
              ))}
              {rowIndex === 2 && (
                <motion.button
                  onClick={handleDelete}
                  disabled={currentGuess.length === 0 || gameWon || gameLost}
                  className="px-4 py-3 bg-red-700 text-gold-200 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors duration-200 border border-red-500/50"
                  whileTap={{ scale: 0.95 }}
                >
                  <Delete className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BollywoodWordle;