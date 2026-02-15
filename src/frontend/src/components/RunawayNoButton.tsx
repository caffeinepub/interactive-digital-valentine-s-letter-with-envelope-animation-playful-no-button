import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function RunawayNoButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasMovedOnce, setHasMovedOnce] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = () => {
    if (!containerRef.current || !buttonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();

    // Calculate safe movement bounds
    const maxX = container.width - button.width - 32;
    const maxY = container.height - button.height - 32;

    // Generate random position
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setPosition({ x: newX, y: newY });
    setHasMovedOnce(true);
  };

  // Reset position when component mounts
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    setHasMovedOnce(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-32 w-full max-w-md"
      style={{ minHeight: '8rem' }}
    >
      <Button
        ref={buttonRef}
        onMouseEnter={moveButton}
        onTouchStart={moveButton}
        onFocus={moveButton}
        size="lg"
        className="btn-no-romantic absolute left-1/2 top-1/2 h-14 w-48 -translate-x-1/2 -translate-y-1/2 text-xl transition-transform duration-300 ease-out sm:h-16 sm:w-56 sm:text-2xl"
        style={{
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
        }}
      >
        {hasMovedOnce ? 'Try again! 😊' : 'No'}
      </Button>
    </div>
  );
}
