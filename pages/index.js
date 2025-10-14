import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Landing Page - PrintScribe QR
 * 
 * Features:
 * - Elegant hero section with emotional messaging
 * - Floating particles animation
 * - Smooth fade-in transitions
 * - Brand colors: Black, Gold, White
 * - Two CTA buttons: "View a Sample Memory" and "Create Yours"
 */
export default function Home() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles for background animation
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      <Head>
        <title>{`PrintScribe QR - Memories That Last Forever`}</title>
        <meta name="description" content="Scan your PrintScribe QR to reveal a heartfelt message, music, and timeless digital memory." />
        <meta name="keywords" content="PrintScribe, QR, memories, personalized, gifts" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-gold opacity-20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {/* Logo Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-block px-6 py-2 border-2 border-gold rounded-full">
                <span className="text-gold text-xl font-semibold tracking-wider">PrintScribe</span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 text-shadow"
            >
              Memories That Last
              <span className="block text-gold mt-2">Forever</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Scan your PrintScribe QR to reveal a heartfelt message, music, and timeless digital memory.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/babe">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gold text-black font-semibold text-lg rounded-full shadow-lg hover:shadow-gold transition-all duration-300 touch-manipulation min-w-[200px]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  View a Sample Memory
                </motion.button>
              </Link>

              <a href="https://www.facebook.com/printscribeph" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-gold text-gold font-semibold text-lg rounded-full hover:bg-gold hover:text-black transition-all duration-300 touch-manipulation min-w-[200px]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  Create Yours
                </motion.button>
              </a>
            </motion.div>

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-gold text-4xl"
              >
                ↓
              </motion.div>
              <p className="text-gray-400 text-sm mt-2">Scroll to learn more</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="#D4AF37"
              fillOpacity="0.1"
            />
          </svg>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-black mb-6">
              Your Story, Beautifully Told
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              PrintScribe creates personalized QR experiences that transform your printed memories into 
              interactive digital stories. Each scan reveals a unique page with your message, photos, 
              and music—designed to evoke emotion and celebrate the moments that matter most.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="text-5xl mb-4">💝</div>
                <h3 className="text-xl font-playfair font-semibold mb-2">Heartfelt</h3>
                <p className="text-gray-600">Messages that touch the soul</p>
              </div>
              <div className="p-6">
                <div className="text-5xl mb-4">🎵</div>
                <h3 className="text-xl font-playfair font-semibold mb-2">Musical</h3>
                <p className="text-gray-600">Soundtracks for your memories</p>
              </div>
              <div className="p-6">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl font-playfair font-semibold mb-2">Timeless</h3>
                <p className="text-gray-600">Memories that last forever</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-gold text-2xl font-playfair font-bold">PrintScribe</span>
          </div>
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://www.facebook.com/printscribeph" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors touch-manipulation" style={{ WebkitTapHighlightColor: 'transparent' }}>
              Facebook
            </a>
            <a href="https://www.instagram.com/printscribeph" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors touch-manipulation" style={{ WebkitTapHighlightColor: 'transparent' }}>
              Instagram
            </a>
            <a href="https://www.tiktok.com/@printscribe" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors touch-manipulation" style={{ WebkitTapHighlightColor: 'transparent' }}>
              TikTok
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 PrintScribe. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
