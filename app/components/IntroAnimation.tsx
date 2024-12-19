'use client'

import { motion } from 'framer-motion'

const IntroAnimation = () => {
  const text = "Snapoutt"

  return (
    <div className="flex justify-center items-center h-screen">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="text-6xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: [0, 1, 0], y: [50, 0, -50] }}
          transition={{
            duration: 2,
            times: [0, 0.5, 1],
            delay: index * 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

export default IntroAnimation

