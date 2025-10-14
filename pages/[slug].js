import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import customers from '../data/customers.json';
import AudioPlayer from '../components/AudioPlayer';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export async function getStaticPaths() {
  const paths = customers.map((customer) => ({
    params: { slug: customer.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const customer = customers.find((c) => c.slug === params.slug);
  return { props: { customer } };
}

export default function CustomerPage({ customer }) {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pageRef = useRef(null);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleUserInteraction = () => {
      if (!audioPlayed) {
        setAudioPlayed(true);
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [audioPlayed]);

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl">Customer not found.</p>
      </div>
    );
  }

  const imagesForLightbox = customer.gallery.map((src, index) => ({
  src,
  title: customer.captions && customer.captions[index] 
    ? customer.captions[index] 
    : `Photo ${index + 1}`,
  description: customer.captions && customer.captions[index] 
    ? customer.captions[index] 
    : ''
}));

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${customer.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed', // Fixed attachment can cause issues on mobile
      }}
    >
      <Head>
        <title>{`${customer.name} - PrintScribe Memory`}</title>
        <meta name="description" content={`A personalized memory for ${customer.name} from PrintScribe QR`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta property="og:title" content={`${customer.name} - PrintScribe Memory`} />
        <meta property="og:description" content={`A personalized memory for ${customer.name} from PrintScribe QR`} />
        <meta property="og:image" content={customer.background} />
        <meta property="og:url" content={`https://qr.printscribe.ph//${customer.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Prevent zoom on input focus for mobile */}
        <meta name="format-detection" content="telephone=no" />
      </Head>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50 sm:opacity-60 z-0"></div>

      {/* Initial music overlay */}
      {!audioPlayed && customer.music && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black bg-opacity-70 text-white cursor-pointer touch-manipulation px-4"
          onClick={() => setAudioPlayed(true)}
          onTouchStart={() => setAudioPlayed(true)}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <motion.p 
            className="text-4xl sm:text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🎵
          </motion.p>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-playfair font-bold mb-2 text-center">
            Tap anywhere to play music
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-poppins text-center">
            Experience this memory with sound
          </p>
        </motion.div>
      )}
      
      {/* Audio Player */}
      {customer.music && audioPlayed && <AudioPlayer musicUrl={customer.music} />}

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto py-6 sm:py-12 px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-5xl w-full"
        >
          {/* Message Card */}
          <div
            className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 lg:p-16 glow mb-8 sm:mb-12 relative overflow-hidden"
            style={{
              backgroundImage: customer.messageBackground ? `url('${customer.messageBackground}')` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {customer.messageBackground && (
              <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
            )}
            <div className="relative z-10 p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-black bg-opacity-50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center mb-6 sm:mb-8"
              >
                <div className="inline-block mb-3 sm:mb-4">
                  <div className="h-0.5 sm:h-1 w-12 sm:w-20 bg-gold mx-auto mb-4 sm:mb-6" />
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-playfair font-bold text-white mb-3 sm:mb-4 text-shadow">
                  {customer.name}
                </h1>
                <div className="h-0.5 sm:h-1 w-12 sm:w-20 bg-gold mx-auto mt-4 sm:mt-6" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="prose prose-sm sm:prose-lg max-w-none text-center"
              >
                <div
                  className="text-white text-sm sm:text-lg md:text-xl leading-relaxed font-poppins text-shadow"
                  dangerouslySetInnerHTML={{ __html: customer.message }}
                />
              </motion.div>
            </div>
            {/* Scroll Indicator */}
{customer.gallery && customer.gallery.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5, duration: 0.8 }}
    className="text-center mt-8 sm:mt-12"
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="text-gold text-3xl sm:text-4xl"
    >
      ↓
    </motion.div>
    <p className="text-white text-sm sm:text-base mt-2">
      Scroll to see our moments
    </p>
  </motion.div>
)}

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gold rounded-full p-2 sm:p-4 shadow-lg"
            >
              <p className="text-xl sm:text-3xl">💝</p>
            </motion.div>
          </div>

          {/* Gallery Section */}
          {customer.gallery && customer.gallery.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
              className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 lg:p-16 glow mt-8 sm:mt-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-black text-center mb-6 sm:mb-8">
                Our Moments
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                {customer.gallery.map((imageSrc, index) => (
                  <motion.div
  key={index}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
  className="gallery-item relative w-full h-32 sm:h-48 rounded-lg overflow-hidden shadow-lg cursor-pointer touch-manipulation"
  onClick={() => openLightbox(index)}
  onTouchStart={() => {}}
  style={{ WebkitTapHighlightColor: 'transparent' }}
>
  <Image
    src={imageSrc}
    alt={`Gallery image ${index + 1}`}
    fill
    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
    style={{ objectFit: 'cover' }}
    className="hover:scale-105 transition-transform duration-300"
    priority={index < 6}
  />
  {customer.captions && customer.captions[index] && (
    <div className="gallery-item-overlay">
      <p className="gallery-item-caption">
        {customer.captions[index]}
      </p>
    </div>
  )}
</motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-center mt-8 sm:mt-12"
          >
            
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <motion.footer
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.7, duration: 0.8 }}
  className="relative z-10 w-full bg-black bg-opacity-90 text-white text-center py-8 sm:py-12 mt-8 sm:mt-12"
>
  <div className="max-w-5xl mx-auto px-4">
    <p className="font-playfair text-2xl sm:text-3xl font-bold mb-4 text-gold">
      PrintScribe
    </p>
    <p className="font-poppins text-base sm:text-lg mb-6 text-gray-300">
      Want to create your own Forever Website?
    </p>
    
    {/* CTA Button */}
    <motion.a
      href="https://www.facebook.com/printscribeph"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block px-8 py-3 bg-gold text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300 mb-6"
    >
      Contact Us
    </motion.a>

    <div className="h-px w-20 bg-gold mx-auto my-6" />
    
    <p className="font-poppins text-sm sm:text-base mb-4 text-gray-400">
      Follow or message us to make your memories last forever
    </p>
    
    <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 text-sm sm:text-base">
      <a 
        href="https://www.facebook.com/printscribeph" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gold hover:text-white transition-colors duration-300 touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        Facebook
      </a>
      <a 
        href="https://www.instagram.com/printscribeph" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gold hover:text-white transition-colors duration-300 touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        Instagram
      </a>
      <a 
        href="https://www.tiktok.com/@printscribe" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gold hover:text-white transition-colors duration-300 touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        TikTok
      </a>
      <a 
        href="http://www.m.me/397530840115237" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gold hover:text-white transition-colors duration-300 touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        Messenger
      </a>
    </div>
    
    <div className="h-px w-full bg-gray-800 my-6" />
    
    <p className="font-poppins text-xs sm:text-sm text-gray-500">
      © 2025 PrintScribe. Made with 💙 in Pili, Camarines Sur
    </p>
    <p className="font-poppins text-xs text-gray-600 mt-2">
      #BuhayAngAlaala
    </p>
  </div>
</motion.footer>

    {/* Lightbox */}
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={imagesForLightbox}
            index={currentImageIndex}
            styles={{
              container: { backgroundColor: "rgba(0, 0, 0, .95)" },
            }}
            render={{
      buttonPrev: !isMobile && imagesForLightbox.length > 1 ? undefined : () => null,
      buttonNext: !isMobile && imagesForLightbox.length > 1 ? undefined : () => null,
      
      slideFooter: ({ slide }) => {
        if (!slide.description) return null;
        
        return (
          <div 
            className="fixed bottom-6 left-4 right-4 sm:left-8 sm:right-8 md:left-auto md:right-auto md:bottom-8 md:w-full md:max-w-3xl md:mx-auto z-50"
            style={{ 
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)',
            }}
          >
            <div className="bg-black/98 backdrop-blur-xl rounded-2xl border border-gold/20 shadow-2xl px-5 py-4 sm:px-8 sm:py-6">
              <div className="text-center space-y-3">
                {/* Photo counter */}
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/25 text-gold text-xs sm:text-sm font-semibold rounded-full">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                    Photo {currentImageIndex + 1} of {customer.gallery.length}
                  </span>
                </div>
                
                {/* Caption */}
                <p className="text-white text-sm sm:text-base md:text-lg font-poppins leading-relaxed">
                  {slide.description}
                </p>
                
                {/* Swipe hint (first photo, mobile only) */}
                {isMobile && currentImageIndex === 0 && (
                  <div className="pt-2">
                    <p className="text-gray-400 text-xs flex items-center justify-center gap-2">
                      
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      },
    }}
        controller={{ 
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
        carousel={{
          finite: false,
          preload: 2,
        }}
        animation={{
          fade: 300,
          swipe: 250,
        }}
        on={{
          view: ({ index }) => setCurrentImageIndex(index),
        }}
      />
    </div>
  );
}