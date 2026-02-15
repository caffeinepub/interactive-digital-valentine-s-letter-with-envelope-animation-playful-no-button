import { useEffect, useState } from 'react';

interface EnvelopeProps {
  onComplete: () => void;
}

export function Envelope({ onComplete }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Start opening animation immediately
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 300);

    // Trigger completion callback after animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="envelope-container relative h-64 w-80 sm:h-80 sm:w-96">
      {/* Envelope Body */}
      <div className="envelope-romantic absolute inset-0 rounded-lg shadow-romantic-lg">
        {/* Envelope Flap */}
        <div
          className={`envelope-flap-romantic absolute left-0 right-0 top-0 h-32 origin-top rounded-t-lg transition-transform duration-1000 ease-out sm:h-40 ${
            isOpening ? 'envelope-flap-open' : ''
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="envelope-seal h-16 w-16 rounded-full sm:h-20 sm:w-20" />
          </div>
        </div>

        {/* Letter Inside */}
        <div
          className={`paper-card absolute left-1/2 top-8 h-48 w-64 -translate-x-1/2 rounded-lg shadow-romantic transition-all duration-1000 ease-out sm:top-12 sm:h-56 sm:w-80 ${
            isOpening ? 'letter-rise' : ''
          }`}
        >
          <div className="relative flex h-full items-center justify-center p-6">
            <div className="accent-heart-top-left" />
            <div className="accent-heart-bottom-right" />
            <p className="love-letter-script relative z-10 text-center text-2xl sm:text-3xl">
              Opening with love...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
