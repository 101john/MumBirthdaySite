import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Music } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import playlist from '../data/playlist.json';

interface MusicPlayerProps {
  currentTrack: {
    id: string;
    title: string;
    artist: string;
    duration: string;
    url: string;
    albumCover: string;
  } | null;
  onSync: (track: any) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentTrack, onSync, isPlaying, onTogglePlay }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  const shuffledPlaylist = useMemo(() => {
    const shuffled = [...playlist];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleNext);

    audio.volume = volume;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentTrackIndex, volume, isPlaying]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    onTogglePlay();
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % shuffledPlaylist.length;
    setCurrentTrackIndex(nextIndex);
    onSync(shuffledPlaylist[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + shuffledPlaylist.length) % shuffledPlaylist.length;
    setCurrentTrackIndex(prevIndex);
    onSync(shuffledPlaylist[prevIndex]);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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

      <audio
        ref={audioRef}
        src={currentTrack?.url || shuffledPlaylist[currentTrackIndex].url}
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-bold font-serif text-gold-400 mb-4 flex items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Music className="w-16 h-16" />
            Music for the Soul
          </motion.h2>
          <motion.p
            className="text-xl text-gold-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your favorite melodies, specially curated for this special day
          </motion.p>
        </div>

        {/* Main Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-lg rounded-3xl p-8 mb-8 border-2 border-gold-400/50 shadow-2xl"
        >
          {/* Album Art & Track Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Album Art */}
            <motion.div
              className="aspect-square bg-gradient-to-br from-gold-400/20 to-amber-600/20 rounded-2xl overflow-hidden shadow-xl relative group border-4 border-gold-400/50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-amber-600/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 10, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                  className="w-32 h-32 bg-gradient-to-br from-gold-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-800"
                >
                  <div className="w-8 h-8 bg-red-800 rounded-full" />
                </motion.div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gold-400"
                >
                  <Heart className="w-6 h-6 text-gold-400 mb-2" />
                </motion.div>
              </div>
            </motion.div>

            {/* Track Info */}
            <div className="flex flex-col justify-center text-gold-200">
              <motion.h3
                key={currentTrackIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-gold-400 font-serif"
              >
                {currentTrack?.title || 'Select a Track'}
              </motion.h3>
              <motion.p
                key={`${currentTrackIndex}-artist`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gold-300 mb-6"
              >
                {currentTrack?.artist || 'Unknown Artist'}
              </motion.p>

              {/* Progress Bar */}
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                  className="w-full h-2 bg-red-800/50 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gold-300 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <motion.button
                  onClick={handlePrevious}
                  className="p-3 bg-red-700/50 backdrop-blur-sm rounded-full hover:bg-red-600/50 transition-all duration-300 border border-gold-400/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipBack className="w-6 h-6 text-gold-400" />
                </motion.button>

                <motion.button
                  onClick={handlePlayPause}
                  className="p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full hover:shadow-xl transition-all duration-300 border-2 border-gold-400/50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-gold-400" />
                  ) : (
                    <Play className="w-8 h-8 ml-1 text-gold-400" />
                  )}
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  className="p-3 bg-red-700/50 backdrop-blur-sm rounded-full hover:bg-red-600/50 transition-all duration-300 border border-gold-400/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipForward className="w-6 h-6 text-gold-400" />
                </motion.button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-red-700/50 backdrop-blur-sm rounded-lg hover:bg-red-600/50 transition-all duration-300 border border-gold-400/30"
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-gold-400" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-gold-400" />
                  )}
                </motion.button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-red-800/50 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-gold-400/50"
        >
          <h3 className="text-2xl font-bold text-gold-400 mb-6 font-serif">Playlist</h3>
          <div className="space-y-4">
            {shuffledPlaylist.map((track: { id: string; title: string; artist: string; duration: string; url: string; albumCover: string }, index: number) => (
              <motion.div
                key={track.id}
                onClick={() => setCurrentTrackIndex(index)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                  currentTrackIndex === index
                    ? 'bg-red-700/50 border-gold-400/50 backdrop-blur-sm'
                    : 'bg-red-800/30 hover:bg-red-700/30 border-gold-400/20 hover:border-gold-400/40'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gold-400">{track.title}</h4>
                    <p className="text-gold-300 text-sm">{track.artist}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gold-300 text-sm">{track.duration}</span>
                    {currentTrackIndex === index && isPlaying && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-gold-400 rounded-full"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MusicPlayer;