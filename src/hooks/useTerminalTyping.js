import { useState, useEffect } from 'react';

export default function useTerminalTyping(lines, speed = 40, lineDelay = 600) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);

  const start = () => setStarted(true);

  useEffect(() => {
    if (!started || currentLine >= lines.length) return;

    const line = lines[currentLine];

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => {
          const copy = [...prev];
          copy[currentLine] = line.slice(0, currentChar + 1);
          return copy;
        });
        setCurrentChar(c => c + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
        setVisibleLines(prev => [...prev, '']);
      }, lineDelay);
      return () => clearTimeout(timer);
    }
  }, [started, currentLine, currentChar, lines, speed, lineDelay]);

  return { visibleLines, start, isDone: currentLine >= lines.length };
}