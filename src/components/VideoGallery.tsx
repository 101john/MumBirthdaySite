import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';
import { Movie } from '../types';

interface VideoGalleryProps {
  movies: Movie[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ movies }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleVideoPlay = (movieId: string) => {
    // Stop all other videos
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (id !== movieId && video) {
        video.pause();
      }
    });

    const video = videoRefs.current[movieId];
    if (video) {
      if (activeVideo === movieId) {
        video.pause();
        setActiveVideo(null);
      } else {
        video.play();
        setActiveVideo(movieId);
      }
    }
  };

  const toggleMute = () => {
    const video = activeVideo ? videoRefs.current[activeVideo] : null;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const cassetteDesigns = [
    'bg-gradient-to-br from-red-400 to-red-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Cinema Ki Rani
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Your favorite Bollywood classics, presented in nostalgic style. Click each cassette to relive the magic!
        </p>

        {/* Video Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              {/* Cassette/TV Frame */}
              <div className={`
                ${index % 2 === 0 ? 'cassette-frame' : 'tv-frame'}
                ${cassetteDesigns[index % cassetteDesigns.length]}
                p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300
                group-hover:scale-105
              `}>
                {/* Video Container */}
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
                  <video
                    ref={(el) => (videoRefs.current[movie.id] = el)}
                    className="w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    playsInline
                    onEnded={() => setActiveVideo(null)}
                  >
                    <source src={movie.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={() => handleVideoPlay(movie.id)}
                      className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all duration-300"
                      whileTap={{ scale: 0.9 }}
                    >
                      {activeVideo === movie.id ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </motion.button>
                  </div>

                  {/* Sound Control */}
                  {activeVideo === movie.id && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={toggleMute}
                      className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-300"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </motion.button>
                  )}
                </div>

                {/* Movie Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                  <p className="text-sm text-gray-200 mb-2">{movie.year}</p>
                  <p className="text-xs text-gray-300 opacity-80">{movie.description}</p>
                </div>

                {/* Cassette Details */}
                {index % 2 === 0 && (
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                      </div>
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-300">Side A</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default VideoGallery;