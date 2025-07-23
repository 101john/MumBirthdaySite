import { motion } from 'framer-motion';
import { Heart, Music, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useState } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url: string;
}

interface MusicPlayerProps {
  tracks: Track[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks }) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const selectedTrack = tracks[selectedTrackIndex];

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
            Your favorite melodies are now playing in the background. Use the control in the top right to pause/play!
          </motion.p>
        </div>

        {/* Visual Music Display */}
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
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
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
                key={selectedTrackIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-gold-400 font-serif"
              >
                {selectedTrack?.title || 'Select a Track'}
              </motion.h3>
              <motion.p
                key={`${selectedTrackIndex}-artist`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gold-300 mb-6"
              >
                {selectedTrack?.artist || 'Unknown Artist'}
              </motion.p>

              {/* Visual Progress Bar (decorative) */}
              <div className="mb-6">
                <div className="w-full h-2 bg-red-800/50 rounded-lg relative overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gold-400 to-amber-500 rounded-lg"
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gold-300 mt-2">
                  <span>Music playing in background</span>
                  <span>Use top-right control</span>
                </div>
              </div>

              {/* Decorative Controls */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <motion.div
                  className="p-3 bg-red-700/30 backdrop-blur-sm rounded-full border border-gold-400/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <SkipBack className="w-6 h-6 text-gold-400/70" />
                </motion.div>

                <motion.div
                  className="p-4 bg-red-600/30 rounded-full border-2 border-gold-400/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Music className="w-8 h-8 text-gold-400" />
                </motion.div>

                <motion.div
                  className="p-3 bg-red-700/30 backdrop-blur-sm rounded-full border border-gold-400/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <SkipForward className="w-6 h-6 text-gold-400/70" />
                </motion.div>
              </div>

              {/* Volume Indicator */}
              <div className="flex items-center gap-4">
                <Volume2 className="w-5 h-5 text-gold-400" />
                <div className="flex-1 h-2 bg-red-800/50 rounded-lg relative overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-gold-400 to-amber-500 rounded-lg" />
                </div>
                <span className="text-gold-300 text-sm">Background Volume</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-gold-400/50"
        >
          <h3 className="text-2xl font-bold text-gold-400 mb-6 font-serif">
            Current Playlist
            <span className="text-sm text-gold-300 ml-3 font-normal">
              (Playing in background - use top-right control)
            </span>
          </h3>
          <div className="space-y-4">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                onClick={() => setSelectedTrackIndex(index)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                  selectedTrackIndex === index
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
                    {selectedTrackIndex === index && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-gold-400 rounded-full"
                      />
                    )}
                  </div>
                </div>
                {selectedTrackIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-xs text-gold-300/70"
                  >
                    Currently displayed (music plays from background player)
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MusicPlayer;