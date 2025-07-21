import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Delete, Star, RotateCcw } from 'lucide-react';
import { WordleWord } from '../../types';

interface BollywoodWordleProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

// Mock words - will be loaded from words.txt
const mockWords: WordleWord[] = [
  { word: 'SHAHRUKH', description: 'The King of Bollywood himself!' },
  { word: 'DILSE', description: 'A heart touching love story' },
  { word: 'LAMHE', description: 'Beautiful moments in time' },
  { word: 'KUMAR', description: 'A common Bollywood surname' },
  { word: 'RAJAH', description: 'A royal title often used in films' }
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const BollywoodWordle: React.FC<BollywoodWordleProps> = ({ onComplete, onBack }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [score, setScore] = useState(0);
  const [allWordsComplete, setAllWordsComplete] = useState(false);
  const [usedLetters, setUsedLetters] = useState<Record<string, 'correct' | 'present' | 'absent'>>({});

  const currentWord = mockWords[currentWordIndex];
  const maxGuesses = 6;

  const resetGame = () => {
    setCurrentGuess('');
    setGuesses([]);
    setGameWon(false);
    setGameLost(false);
    setUsedLetters({});
  };

  const handleKeyPress = (letter: string) => {
    if (currentGuess.length < currentWord.word.length) {
      setCurrentGuess(currentGuess + letter);
    }
  };

  const handleDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentGuess.length !== currentWord.word.length || gameWon || gameLost) return;

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    // Update used letters
    const newUsedLetters = { ...usedLetters };
    for (let i = 0; i < currentGuess.length; i++) {
      const letter = currentGuess[i];
      if (currentWord.word[i] === letter) {
        newUsedLetters[letter] = 'correct';
      } else if (currentWord.word.includes(letter)) {
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

    if (currentGuess === currentWord.word) {
      setGameWon(true);
      const bonusPoints = Math.max(0, (maxGuesses - newGuesses.length) * 2);
      setScore(score + 10 + bonusPoints);
    } else if (newGuesses.length >= maxGuesses) {
      setGameLost(true);
    }

    setCurrentGuess('');
  };

  const handleNextWord = () => {
    if (currentWordIndex < mockWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      resetGame();
    } else {
      setAllWordsComplete(true);
      onComplete(score);
    }
  };

  const getLetterStyle = (letter: string, position: number, word: string) => {
    if (word[position] === letter) {
      return 'bg-green-500 text-white border-green-500';
    } else if (currentWord.word.includes(letter)) {
      return 'bg-yellow-500 text-white border-yellow-500';
    } else {
      return 'bg-gray-500 text-white border-gray-500';
    }
  };

  const getKeyboardLetterStyle = (letter: string) => {
    const status = usedLetters[letter];
    switch (status) {
      case 'correct':
        return 'bg-green-500 text-white';
      case 'present':
        return 'bg-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    }
  };

  if (allWordsComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">All Words Complete!</h2>
          <p className="text-xl text-gray-600 mb-6">
            Final Score: <span className="font-bold text-green-600">{score}</span>
          </p>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(Math.min(5, Math.floor(score / 10)))].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-500 fill-current" />
            ))}
          </div>
          <motion.button
            onClick={onBack}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
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
            <h1 className="text-3xl md:text-4xl font-bold text-green-800">Bollywood Wordle</h1>
            <p className="text-gray-600">Word {currentWordIndex + 1} of {mockWords.length}</p>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl shadow-md">
            <span className="text-green-600 font-bold">Score: {score}</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="grid gap-2 mb-8" style={{ gridTemplateRows: `repeat(${maxGuesses}, 1fr)` }}>
            {[...Array(maxGuesses)].map((_, rowIndex) => (
              <div key={rowIndex} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${currentWord.word.length}, 1fr)` }}>
                {[...Array(currentWord.word.length)].map((_, colIndex) => {
                  let letter = '';
                  let style = 'border-2 border-gray-300 bg-white';

                  if (rowIndex < guesses.length) {
                    letter = guesses[rowIndex][colIndex] || '';
                    style = getLetterStyle(letter, colIndex, guesses[rowIndex]);
                  } else if (rowIndex === guesses.length) {
                    letter = currentGuess[colIndex] || '';
                    style = letter ? 'border-2 border-gray-400 bg-gray-50' : 'border-2 border-gray-300 bg-white';
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
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Correct!</h3>
                    <p className="text-gray-600 mb-4">"{currentWord.description}"</p>
                    <motion.button
                      onClick={handleNextWord}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentWordIndex < mockWords.length - 1 ? 'Next Word' : 'Complete Game'}
                    </motion.button>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-2xl font-bold text-red-600 mb-2">Game Over!</h3>
                    <p className="text-gray-600 mb-2">The word was: <span className="font-bold text-green-600">{currentWord.word}</span></p>
                    <p className="text-gray-500 mb-4">"{currentWord.description}"</p>
                    <div className="flex gap-4 justify-center">
                      <motion.button
                        onClick={resetGame}
                        className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </motion.button>
                      <motion.button
                        onClick={handleNextWord}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentWordIndex < mockWords.length - 1 ? 'Skip to Next' : 'Complete Game'}
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
                  disabled={currentGuess.length !== currentWord.word.length || gameWon || gameLost}
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-200"
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
                  className={`w-10 h-12 md:w-12 md:h-14 rounded-lg font-bold text-sm md:text-base transition-colors duration-200 disabled:cursor-not-allowed ${getKeyboardLetterStyle(letter)}`}
                  whileTap={{ scale: 0.95 }}
                >
                  {letter}
                </motion.button>
              ))}
              {rowIndex === 2 && (
                <motion.button
                  onClick={handleDelete}
                  disabled={currentGuess.length === 0 || gameWon || gameLost}
                  className="px-4 py-3 bg-gray-400 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition-colors duration-200"
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