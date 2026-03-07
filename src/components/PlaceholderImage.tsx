import { Image } from 'lucide-react';

interface PlaceholderImageProps {
  text: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'banner';
}

export function PlaceholderImage({ text, className = '', aspectRatio = 'square' }: PlaceholderImageProps) {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    banner: 'aspect-[21/9]',
  };

  return (
    <div 
      className={`relative bg-gradient-to-br from-[#c9a961]/20 to-[#d4a5a5]/20 rounded-xl overflow-hidden flex flex-col items-center justify-center ${aspectClasses[aspectRatio]} ${className}`}
    >
      <Image className="w-12 h-12 text-[#c9a961]/50 mb-2" />
      <span className="text-sm text-[#c9a961]/70 font-medium text-center px-4">{text}</span>
      <div className="absolute inset-0 border-2 border-dashed border-[#c9a961]/30 rounded-xl m-2" />
    </div>
  );
}
