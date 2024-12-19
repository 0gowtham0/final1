'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IntroAnimation from './components/IntroAnimation'
import ImageSwiper from './components/ImageSwiper'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3000) // Adjust this value to control how long the intro animation shows

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-3xl font-bold text-white">Snapoutt</h1>
      </div>
      <AnimatePresence>
        {showIntro ? (
          <IntroAnimation />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full z-10"
          >
            <ImageSwiper />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

