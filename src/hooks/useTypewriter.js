import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

export default function useTypewriter({ words, speed = 120 }) {
  const reduce = useReducedMotion()
  const wordsRef = useRef(words)

  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (reduce) return

    if (wordIndex >= wordsRef.current.length) return

    const currentWord = wordsRef.current[wordIndex]

    if (charIndex >= currentWord.length) {
      const done = setTimeout(() => {
        setWordIndex((i) => i + 1)
        setCharIndex(0)
      }, speed * 2)
      return () => clearTimeout(done)
    }

    const timer = setTimeout(() => {
      setCharIndex((c) => c + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [wordIndex, charIndex, speed, reduce])

  if (reduce) {
    return { completedWords: words, currentWord: '', showCursor: true }
  }

  const completedWords = words.slice(0, wordIndex)
  const currentWord =
    wordIndex < words.length ? words[wordIndex].slice(0, charIndex) : ''
  const showCursor = wordIndex < words.length || charIndex > 0

  return { completedWords, currentWord, showCursor }
}
