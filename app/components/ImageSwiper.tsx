'use client'

import { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import Image from 'next/image'
import CallbackForm from './CallbackForm'

const images = [
  '/placeholder.svg?height=800&width=600',
  '/placeholder.svg?height=800&width=600',
  '/placeholder.svg?height=800&width=600',
  '/placeholder.svg?height=800&width=600',
  '/placeholder.svg?height=800&width=600',
]

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

function ImageSwiper() {
  const [gone] = useState(() => new Set())
  const [props, api] = useSprings(images.length + 1, i => ({
    ...to(i),
    from: from(i),
  }))

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2
    const dir = xDir < 0 ? -1 : 1
    if (!down && trigger) gone.add(index)
    api.start(i => {
      if (index !== i) return
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
      const scale = down ? 1.1 : 1
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!down && gone.size === images.length + 1)
      setTimeout(() => {
        gone.clear()
        api.start(i => to(i))
      }, 600)
  })

  return (
    <div className="flex items-center justify-center h-screen w-full">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div 
          className="absolute w-[300px] h-[450px] will-change-transform" 
          key={i} 
          style={{ x, y }}
        >
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              boxShadow: '0 12px 24px -12px rgba(0, 0, 0, 0.5)',
              backgroundColor: i === 0 ? 'transparent' : undefined,
              backgroundImage: i === 0 ? undefined : `url(${images[i - 1]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {i === 0 && <CallbackForm />}
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}

export default ImageSwiper

