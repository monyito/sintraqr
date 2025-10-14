import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AudioPlayer Component
 * 
 * Handles background music playback with:
 * - Autoplay with fallback for browser policies
 * - Looping audio
 * - Volume control (default 50%)
 * - Tap-to-play overlay when autoplay is blocked
 * - Mobile-optimized touch interactions
 * - Better error handling and loading states
 * 
 * Props:
 * - musicUrl: URL to the audio file
 */
export default function AudioPlayer({ musicUrl }) {
  const audioRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !musicUrl) return;

    // Reset states
    setIsLoading(true);
    setHasError(false);
    setIsPlaying(false);

    // Set audio properties
    audio.loop = true;
    audio.volume = 0.5; // 50% volume
    audio.preload = 'auto';

    // Audio event handlers
    const handleCanPlayThrough = () => {
      setIsLoading(false);
      // Try autoplay only after audio is ready
      tryAutoplay();
    };

    const handleError = (e) => {
      console.error('Audio loading error:', e);
      setHasError(true);
      setIsLoading(false);
      setShowOverlay(true);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowOverlay(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    // Add event listeners
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Load the audio
    audio.load();

    const tryAutoplay = () => {
      if (!userInteracted) {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Autoplay started successfully
              setIsPlaying(true);
              setShowOverlay(false);
            })
            .catch((error) => {
              // Autoplay was prevented, show overlay
              console.log('Autoplay prevented:', error);
              setShowOverlay(true);
            });
        }
      }
    };

    return () => {
      if (audio) {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
      }
    };
  }, [musicUrl, userInteracted]);

  const handleUserInteraction = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setUserInteracted(true);
    
    if (hasError) {
      // Retry loading if there was an error
      audio.load();
      return;
    }

    audio.play()
      .then(() => {
        setIsPlaying(true);
        setShowOverlay(false);
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
        setHasError(true);
      });
  };

  // Don't render anything if no music URL is provided
  if (!musicUrl) return null;

  return (
    <>
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        preload="auto"
        playsInline // Important for mobile devices
        crossOrigin="anonymous"
      />
      
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleUserInteraction}
            onTouchStart={handleUserInteraction} // Better mobile support
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 cursor-pointer touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }} // Remove tap highlight on mobile
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center px-4 sm:px-8 max-w-sm sm:max-w-md"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="text-4xl sm:text-6xl mb-4 sm:mb-6"
                >
                  🎵
                </motion.div>
              ) : hasError ? (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-4xl sm:text-6xl mb-4 sm:mb-6"
                >
                  🔄
                </motion.div>
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-4xl sm:text-6xl mb-4 sm:mb-6"
                >
                  🎵
                </motion.div>
              )}
              
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-playfair mb-2 sm:mb-4">
                {isLoading ? 'Loading music...' : 
                 hasError ? 'Tap to retry' : 
                 'Tap anywhere to play music'}
              </h2>
              <p className="text-gold text-sm sm:text-lg font-poppins">
                {hasError ? 'There was an issue loading the audio' : 'Experience this memory with sound'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio controls for debugging (hidden in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded text-xs z-50">
          <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
          <div>Playing: {isPlaying ? 'Yes' : 'No'}</div>
          <div>Error: {hasError ? 'Yes' : 'No'}</div>
          <div>User Interacted: {userInteracted ? 'Yes' : 'No'}</div>
        </div>
      )}
    </>
  );
}
