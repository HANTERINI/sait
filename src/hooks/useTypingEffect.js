import { useState, useEffect } from 'react';

export default function useTypingEffect(phrases, speed = 100, pauseDuration = 4000) {
  const [display, setDisplay] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!isDeleting && charIdx === current.length) {
      const pause = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(pause);
    }
    if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setPhraseIdx((phraseIdx + 1) % phrases.length);
      return;
    }
    const timer = setTimeout(() => {
      if (isDeleting) {
        setCharIdx(charIdx - 1);
        setDisplay(current.slice(0, charIdx - 1));
      } else {
        setCharIdx(charIdx + 1);
        setDisplay(current.slice(0, charIdx + 1));
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx, phrases, speed, pauseDuration]);

  return display;
}