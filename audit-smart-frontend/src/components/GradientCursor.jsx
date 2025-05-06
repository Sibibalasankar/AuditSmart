import { useEffect, useState } from 'react';
import './GradientCursor.css';

export default function GradientCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if element is clickable
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`cursor ${isPointer ? 'pointer' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: isPointer 
          ? 'linear-gradient(135deg, #6e48aa, #9d50bb)'
          : 'radial-gradient(circle, rgba(110,72,170,0.2) 0%, rgba(157,80,187,0) 70%)'
      }}
    />
  );
}