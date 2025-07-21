import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import VideoGallery from './components/VideoGallery';
import MiniGames from './components/MiniGames';
import MusicPlayer from './components/MusicPlayer';
import Celebration from './components/Celebration';
import Navigation from './components/Navigation';
import BackgroundMusic from './components/BackgroundMusic';
import { mockMovies, mockTracks } from './data/mockData';

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [gameScores, setGameScores] = useState<Record<string, number>>({});
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [showJourney, setShowJourney] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

  const handleVideoPlay = (isPlaying: boolean) => {
    setIsVideoPlaying(isPlaying);
  };

  const totalScore = Object.values(gameScores).reduce((sum, score) => sum + score, 0);
  const completedActivities = [...completedGames, ...(showJourney ? ['movies', 'music'] : [])];

  const sectionComponents = {
    hero: <Hero onStartJourney={handleStartJourney} />,
    videos: <VideoGallery movies={mockMovies} onVideoPlay={handleVideoPlay} />,
    games: <MiniGames onGameComplete={handleGameComplete} />,
    music: <MusicPlayer tracks={mockTracks} />,
    celebration: <Celebration totalScore={totalScore} completedActivities={completedActivities} />
  };

  return (
    <div className="relative">
      {/* Background Music */}
      <BackgroundMusic isPaused={isVideoPlaying} />

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
    </div>
  );
}

export default App;