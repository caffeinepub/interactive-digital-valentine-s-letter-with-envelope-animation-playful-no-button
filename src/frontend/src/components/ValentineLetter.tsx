import { useState, useRef } from 'react';
import { Envelope } from './Envelope';
import { RunawayNoButton } from './RunawayNoButton';
import { VideoView } from './VideoView';
import { Button } from '@/components/ui/button';
import { Upload, Heart } from 'lucide-react';
import { useObjectUrl } from '../hooks/useObjectUrl';

type ViewState = 'front' | 'opening' | 'message' | 'video';

export function ValentineLetter() {
  const [viewState, setViewState] = useState<ViewState>('front');
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const videoUrl = useObjectUrl(selectedVideo);

  const handleFrontClick = () => {
    setViewState('opening');
  };

  const handleEnvelopeComplete = () => {
    setViewState('message');
  };

  const handleYesClick = () => {
    setViewState('video');
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedVideo(file);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-parchment-gradient">
      {/* Decorative floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Heart className="absolute left-[10%] top-[15%] h-6 w-6 text-rose-warm/20 float-gentle" style={{ animationDelay: '0s' }} />
        <Heart className="absolute right-[15%] top-[25%] h-4 w-4 text-rose-soft/20 float-gentle" style={{ animationDelay: '1s' }} />
        <Heart className="absolute left-[20%] bottom-[20%] h-5 w-5 text-rose-warm/20 float-gentle" style={{ animationDelay: '2s' }} />
        <Heart className="absolute right-[10%] bottom-[30%] h-6 w-6 text-rose-soft/20 float-gentle" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Front Page */}
      {viewState === 'front' && (
        <div
          className="flex min-h-screen cursor-pointer flex-col items-center justify-center px-4 transition-opacity duration-500"
          onClick={handleFrontClick}
        >
          <div className="relative">
            <div className="accent-floral-corner accent-floral-top-right" />
            <div className="accent-floral-corner accent-floral-bottom-left" />
            <h1 className="love-letter-title relative z-10 text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              To my dear Kanmani
            </h1>
          </div>
          <p className="love-letter-body mt-8 animate-pulse text-lg sm:text-xl opacity-70">
            Tap to open your letter
          </p>
        </div>
      )}

      {/* Envelope Opening Animation */}
      {viewState === 'opening' && (
        <div className="flex min-h-screen items-center justify-center px-4">
          <Envelope onComplete={handleEnvelopeComplete} />
        </div>
      )}

      {/* Message with Yes/No Buttons */}
      {viewState === 'message' && (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
          <div className="message-appear w-full max-w-2xl space-y-8">
            <div className="relative paper-card paper-card-hover rounded-3xl p-8 sm:p-12">
              {/* Decorative accents */}
              <div className="accent-heart-top-left" />
              <div className="accent-heart-bottom-right" />
              
              <h2 className="love-letter-message relative z-10 text-center text-3xl sm:text-4xl md:text-5xl">
                Will you be mine, Valentine Kanmani?
              </h2>
              
              <p className="love-letter-body relative z-10 mt-6 text-center text-base sm:text-lg opacity-80">
                My heart beats only for you. Say yes and let our love story unfold...
              </p>
            </div>

            <div className="buttons-appear relative flex flex-col items-center gap-6 sm:gap-8">
              <Button
                onClick={handleYesClick}
                size="lg"
                className="btn-yes-romantic h-14 w-48 text-xl sm:h-16 sm:w-56 sm:text-2xl"
              >
                Yes! 💕
              </Button>

              <RunawayNoButton />
            </div>

            {/* Video Upload Control */}
            <div className="upload-appear mt-8 flex flex-col items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoSelect}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="sm"
                className="btn-upload-romantic gap-2"
              >
                <Upload className="h-4 w-4" />
                {selectedVideo ? 'Change video' : 'Choose a video'}
              </Button>
              {selectedVideo && (
                <p className="love-letter-body text-sm opacity-70">
                  Selected: {selectedVideo.name}
                </p>
              )}
              <p className="love-letter-body max-w-md text-center text-xs opacity-60 sm:text-sm">
                Choose a short video (like a 31-second message) that will play when you click "Yes"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video View */}
      {viewState === 'video' && (
        <VideoView videoUrl={videoUrl} onBack={() => setViewState('message')} />
      )}
    </div>
  );
}
