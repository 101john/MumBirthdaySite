import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import VideoGallery from './components/VideoGallery';
import MiniGames from './components/MiniGames';
import MusicPlayer from './components/MusicPlayer';
import Celebration from './components/Celebration';
import Navigation from './components/Navigation';
import { mockMovies } from './data/mockData';
import { LucidePause, LucidePlay } from 'lucide-react';

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [gameScores, setGameScores] = useState<Record<string, number>>({});
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [showJourney, setShowJourney] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
    }
  }, []);

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
    console.log('Video is playing:', isPlaying);
  };

  const toggleMusicPlayback = () => {
    setIsMusicPlaying((prev) => !prev);
    const audio = audioRef.current;
    if (audio) {
      isMusicPlaying ? audio.pause() : audio.play();
    }
  };

  const syncMusicPlayer = (track: any) => {
    setCurrentTrack(track);
    const audio = audioRef.current;
    if (audio) {
      audio.src = track.url;
      audio.play();
      setIsMusicPlaying(true);
    }
  };

  const totalScore = Object.values(gameScores).reduce((sum, score) => sum + score, 0);
  const completedActivities = [...completedGames, ...(showJourney ? ['movies', 'music'] : [])];

  const sectionComponents = {
    hero: <Hero onStartJourney={handleStartJourney} />,
    videos: <VideoGallery movies={mockMovies} onVideoPlay={handleVideoPlay} />,
    games: <MiniGames onGameComplete={handleGameComplete} />,
    music: <MusicPlayer currentTrack={currentTrack} onSync={syncMusicPlayer} isPlaying={isMusicPlaying} onTogglePlay={toggleMusicPlayback} />,
    celebration: <Celebration totalScore={totalScore} completedActivities={completedActivities} />
  };

  return (
    <div className="relative">
      {/* Play/Pause Button */}
      <button
        onClick={toggleMusicPlayback}
        className="absolute top-4 right-4 bg-red-500 text-yellow-300 p-4 rounded-full shadow-lg border-2 border-yellow-500 hover:bg-red-600 transition z-50"
      >
        {isMusicPlaying ? <LucidePause size={24} /> : <LucidePlay size={24} />}
      </button>

      <audio ref={audioRef} />

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