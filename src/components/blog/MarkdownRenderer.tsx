
interface MarkdownRendererProps {
  content: string;
  images?: string[];
}

interface ContentBlock {
  type: 'text' | 'heading' | 'image-left' | 'image-right' | 'image-full' | 'list';
  content: string;
  imageUrl?: string;
}

function parseContent(content: string, images: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  
  let imageIndex = 1; // Start from 1 because image 0 is the featured image
  
  for (let i = 0; i < paragraphs.length; i++) {
    const para = paragraphs[i].trim();
    
    // Check for image markers like [IMAGE:filename.jpg:left] or [IMAGE:filename.jpg:full]
    const imageMatch = para.match(/\[IMAGE:([^\]]+)\]/);
    if (imageMatch) {
      const imageRef = imageMatch[1]; // e.g., "botox-treatment.jpg:left"
      const parts = imageRef.split(':');
      const filename = parts[0];
      const position = parts[1] || 'full';
      
      // Find the full path for this image
      const imageUrl = images.find(img => img.includes(filename)) || '';
      
      if (position === 'left') {
        blocks.push({ type: 'image-left', content: '', imageUrl });
      } else if (position === 'right') {
        blocks.push({ type: 'image-right', content: '', imageUrl });
      } else {
        blocks.push({ type: 'image-full', content: '', imageUrl });
      }
      continue;
    }
    
    // Check for headings
    if (para.startsWith('## ')) {
      blocks.push({ type: 'heading', content: para.replace('## ', '') });
      continue;
    }
    
    // Check for bullet lists
    if (para.startsWith('•') || para.startsWith('-')) {
      const items = para.split('\n').filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'));
      blocks.push({ type: 'list', content: items.map(item => item.replace(/^[•-]\s*/, '')).join('|') });
      continue;
    }
    
    // Regular text - check if we need to inject an image
    // Inject full-width image after certain paragraphs if available
    if (i > 0 && i % 3 === 0 && images[imageIndex] && !blocks.some(b => b.type === 'image-full' && b.content === '')) {
      // Add text first
      blocks.push({ type: 'text', content: para });
      // Then add image
      if (imageIndex < images.length) {
        blocks.push({ type: 'image-full', content: '', imageUrl: images[imageIndex] });
        imageIndex++;
      }
    } else {
      blocks.push({ type: 'text', content: para });
    }
  }
  
  // Insert any remaining images as full-width at the end
  while (imageIndex < images.length) {
    blocks.push({ type: 'image-full', content: '', imageUrl: images[imageIndex] });
    imageIndex++;
  }
  
  return blocks;
}

export function MarkdownRenderer({ content, images = [] }: MarkdownRendererProps) {
  const blocks = parseContent(content, images);
  
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert space-y-6">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={idx} className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">
                {block.content}
              </h2>
            );
          
          case 'text':
            return (
              <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {block.content.split(/\*\*(.*?)\*\*/g).map((part, i) => 
                  i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part}</strong> : part
                )}
              </p>
            );
          
          case 'list':
            return (
              <ul key={idx} className="list-disc pl-6 space-y-2 my-4">
                {block.content.split('|').map((item, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">{item}</li>
                ))}
              </ul>
            );
          
          case 'image-full':
            return block.imageUrl ? (
              <div key={idx} className="my-8 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={block.imageUrl} 
                  alt="" 
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            ) : null;
          
          case 'image-left':
            return block.imageUrl ? (
              <div key={idx} className="my-8 flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/2">
                  <img 
                    src={block.imageUrl} 
                    alt="" 
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  {/* This is a placeholder - the text should be in the next block */}
                </div>
              </div>
            ) : null;
          
          case 'image-right':
            return block.imageUrl ? (
              <div key={idx} className="my-8 flex flex-col md:flex-row-reverse gap-6 items-start">
                <div className="md:w-1/2">
                  <img 
                    src={block.imageUrl} 
                    alt="" 
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  {/* This is a placeholder - the text should be in the next block */}
                </div>
              </div>
            ) : null;
          
          default:
            return null;
        }
      })}
    </div>
  );
}

// Alternative: Simpler renderer that just renders content with inline images
export function SimpleMarkdownRenderer({ content, images = [] }: MarkdownRendererProps) {
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  let imageIndex = 1; // Skip featured image
  
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {paragraphs.map((para, idx) => {
        const trimmed = para.trim();
        
        // Handle image markers
        if (trimmed.startsWith('[IMAGE:')) {
          const match = trimmed.match(/\[IMAGE:([^\]:]+)(?::([^\]]+))?\]/);
          if (match) {
            const filename = match[1];
            const position = match[2] || 'full';
            const imageUrl = images.find(img => img.includes(filename));
            
            if (!imageUrl) return null;
            
            if (position === 'full') {
              return (
                <div key={idx} className="my-8 rounded-xl overflow-hidden shadow-lg">
                  <img src={imageUrl} alt="" className="w-full h-64 md:h-80 object-cover" />
                </div>
              );
            }
            // For left/right, we'll need to handle this differently with the text
            return null;
          }
        }
        
        // Handle headings
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">
              {trimmed.replace('## ', '')}
            </h2>
          );
        }
        
        // Handle bullet lists
        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
          const items = trimmed.split('\n').filter(line => line.trim());
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 my-4">
              {items.map((item, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">
                  {item.replace(/^[•-]\s*/, '')}
                </li>
              ))}
            </ul>
          );
        }
        
        // Regular paragraph
        return (
          <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed my-4">
            {trimmed.split(/\*\*(.*?)\*\*/g).map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part}</strong> : part
            )}
          </p>
        );
      })}
      
      {/* Add remaining images at the end */}
      {images.slice(imageIndex).map((img, idx) => (
        <div key={`end-img-${idx}`} className="my-8 rounded-xl overflow-hidden shadow-lg">
          <img src={img} alt="" className="w-full h-64 md:h-80 object-cover" />
        </div>
      ))}
    </div>
  );
}
