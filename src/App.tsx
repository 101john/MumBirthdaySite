import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import VideoGallery from './components/VideoGallery';
import MiniGames from './components/MiniGames';
import MusicPlayer from './components/MusicPlayer';
import Celebration from './components/Celebration';
import Navigation from './components/Navigation';
import { mockMovies, mockTracks } from './data/mockData';

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [gameScores, setGameScores] = useState<Record<string, number>>({});
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [showJourney, setShowJourney] = useState(false);

  const handleStartJourney = () => {
    setShowJourney(true);
    setCurrentSection('videos');
  };

  const handleGameComplete = (gameId: string, score: number) => {
    setGameScores(prev => ({ ...prev, [gameId]: score }));
    if (!completedGames.includes(gameId)) {
      setCompletedGames(prev => [...prev, gameId]);
    }
  };

  const totalScore = Object.values(gameScores).reduce((sum, score) => sum + score, 0);
  const completedActivities = [...completedGames, ...(showJourney ? ['movies', 'music'] : [])];

  const sectionComponents = {
    hero: <Hero onStartJourney={handleStartJourney} />,
    videos: <VideoGallery movies={mockMovies} />,
    games: <MiniGames onGameComplete={handleGameComplete} />,
    music: <MusicPlayer tracks={mockTracks} />,
    celebration: <Celebration totalScore={totalScore} completedActivities={completedActivities} />
  };

  // Auto-advance to celebration if user has engaged with most content
  useEffect(() => {
    if (completedActivities.length >= 3 && currentSection !== 'celebration') {
      // Optional: Auto-advance to celebration after completing activities
    }
  }, [completedActivities.length, currentSection]);

  return (
    <div className="relative">
      {/* Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {sectionComponents[currentSection as keyof typeof sectionComponents]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Hidden on Hero until journey starts */}
      {(showJourney || currentSection !== 'hero') && (
        <Navigation 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
        />
      )}

      {/* Background Music Control (Global) */}
      {showJourney && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-6 right-6 z-40"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <button className="text-purple-600 hover:text-purple-800 transition-colors">
              🎵
            </button>
          </div>
        </motion.div>
      )}

      {/* Progress Indicator */}
      {showJourney && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 left-6 z-40"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium text-gray-600">
                Progress: {completedActivities.length}/5
              </div>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedActivities.length / 5) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;