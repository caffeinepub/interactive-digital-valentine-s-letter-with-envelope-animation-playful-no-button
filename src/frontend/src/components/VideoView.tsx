import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';

interface VideoViewProps {
  videoUrl: string | null;
  onBack: () => void;
}

export function VideoView({ videoUrl, onBack }: VideoViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);

  useEffect(() => {
    // Auto-play video when view appears (user-initiated action)
    // Do not mute, do not loop - let it play naturally with sound
    if (videoRef.current && videoUrl) {
      videoRef.current.muted = false;
      videoRef.current.loop = false;
      
      videoRef.current.play().catch((error) => {
        console.log('Autoplay prevented:', error);
        setPlaybackBlocked(true);
      });
    }
  }, [videoUrl]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Play error:', error);
      });
      setPlaybackBlocked(false);
    }
  };

  return (
    <div className="video-appear flex min-h-screen flex-col items-center justify-center px-4 py-8 bg-parchment-gradient">
      {/* Decorative floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Heart className="absolute left-[8%] top-[10%] h-8 w-8 text-rose-warm/20 float-gentle" style={{ animationDelay: '0s' }} />
        <Heart className="absolute right-[12%] top-[20%] h-6 w-6 text-rose-soft/20 float-gentle" style={{ animationDelay: '1.2s' }} />
        <Heart className="absolute left-[15%] bottom-[15%] h-7 w-7 text-rose-warm/20 float-gentle" style={{ animationDelay: '2.4s' }} />
        <Heart className="absolute right-[8%] bottom-[25%] h-8 w-8 text-rose-soft/20 float-gentle" style={{ animationDelay: '1.8s' }} />
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="btn-back-romantic gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="relative paper-card overflow-hidden rounded-3xl shadow-romantic-lg">
          {/* Decorative accents */}
          <div className="accent-floral-corner accent-floral-top-right" />
          <div className="accent-floral-corner accent-floral-bottom-left" />
          
          {videoUrl ? (
            <div className="relative">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="aspect-video w-full relative z-10"
                playsInline
              >
                Your browser does not support the video tag.
              </video>
              
              {playbackBlocked && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-parchment/90">
                  <div className="text-center space-y-4 p-6">
                    <p className="love-letter-script text-2xl sm:text-3xl">
                      Click to play with sound 🔊
                    </p>
                    <Button
                      onClick={handlePlayClick}
                      className="btn-yes-romantic"
                    >
                      Play Video
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-parchment-gradient p-8">
              <div className="text-center space-y-4">
                <Heart className="mx-auto h-16 w-16 text-rose-warm/40" />
                <p className="love-letter-script text-2xl sm:text-3xl">
                  No video selected yet
                </p>
                <p className="love-letter-body text-sm sm:text-base opacity-70">
                  Go back and choose a video to play when you click "Yes"
                </p>
              </div>
            </div>
          )}
        </div>

        {videoUrl && (
          <div className="text-center space-y-2">
            <p className="love-letter-message text-2xl sm:text-3xl">
              Happy Valentine's Day, Kanmani! 💕
            </p>
            <p className="love-letter-body text-base sm:text-lg opacity-80">
              With all my love, forever and always
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
