import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Movie } from '../types';

interface VideoGalleryProps {
  movies: Movie[];
  onVideoPlay: (isPlaying: boolean) => void;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ movies, onVideoPlay }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    onVideoPlay(true);
  };

  const handleClose = () => {
    setSelectedMovie(null);
    setIsPlaying(false);
    onVideoPlay(false);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [selectedMovie]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-900 relative overflow-hidden">
      {/* Ornate Pattern Background */}
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

      <div className="relative z-10 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold font-serif bg-gradient-to-r from-gold-400 to-amber-300 bg-clip-text text-transparent mb-4">
              Cinema Ki Rani
            </h2>
            <p className="text-xl text-gold-200 max-w-3xl mx-auto">
              Your favorite Bollywood classics, presented with love
            </p>
          </div>

          {/* Movie Posters Grid with Parallax */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="group cursor-pointer"
                onClick={() => handleMovieClick(movie)}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                style={{ perspective: 1000 }}
              >
                <div className="relative bg-gradient-to-br from-red-800 to-red-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-400/30 group-hover:border-gold-400 transition-all duration-300">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full aspect-[3/4] object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop`;
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-sm mb-1">{movie.title}</h3>
                      <p className="text-gold-300 text-xs">{movie.year}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600/80 rounded-full p-3 backdrop-blur-sm">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative corners */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 bg-red-600 hover:bg-red-700 rounded-full p-2 transition-colors duration-200 z-10"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* TV/Cassette Frame */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-gold-400">
                {/* TV Screen */}
                <div className="relative bg-black rounded-2xl overflow-hidden aspect-video mb-6">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    controls={false}
                    loop
                    onClick={handlePlayPause}
                  >
                    <source src={selectedMovie.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <button
                      onClick={handlePlayPause}
                      className="bg-red-600/80 rounded-full p-4 backdrop-blur-sm hover:bg-red-600 transition-colors duration-200"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gold-400 mb-2 font-serif">
                    {selectedMovie.title}
                  </h3>
                  <p className="text-gold-200 mb-2">{selectedMovie.year}</p>
                  <p className="text-gray-300 text-sm max-w-2xl mx-auto">
                    {selectedMovie.description}
                  </p>
                </div>

                {/* TV Details */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gold-400/30">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-gold-400 text-sm font-mono">
                    BOLLYWOOD CLASSICS
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoGallery;