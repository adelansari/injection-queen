import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const renderMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let inList = false;
    let key = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${key++}`} className="list-disc pl-6 space-y-2 my-4 text-gray-700 dark:text-gray-300">
            {currentList.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
        currentList = [];
        inList = false;
      }
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      // Check for bullet points (• or - at start)
      if (trimmedLine.match(/^[•\-]\s/)) {
        inList = true;
        const itemContent = trimmedLine
          .replace(/^[•\-]\s*/, '')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        currentList.push(itemContent);
        return;
      }

      // If we were in a list and now have a non-list line, flush the list
      if (inList && !trimmedLine.match(/^[•\-]\s/) && trimmedLine !== '') {
        flushList();
      }

      // Empty line
      if (trimmedLine === '') {
        return;
      }

      // H2 headers
      if (trimmedLine.startsWith('## ')) {
        flushList();
        const heading = trimmedLine.replace('## ', '');
        elements.push(
          <h2 key={key++} className="text-2xl font-bold text-[#1a1a2e] dark:text-white mt-10 mb-4">
            {heading}
          </h2>
        );
        return;
      }

      // Bold paragraphs that act as subheaders
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && trimmedLine.includes(' ')) {
        flushList();
        const heading = trimmedLine.replace(/\*\*/g, '');
        elements.push(
          <h3 key={key++} className="text-xl font-semibold text-[#1a1a2e] dark:text-white mt-8 mb-3">
            {heading}
          </h3>
        );
        return;
      }

      // Regular paragraphs with bold text
      flushList();
      const formattedText = trimmedLine
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      elements.push(
        <p 
          key={key++} 
          className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });

    // Flush any remaining list
    flushList();

    return elements;
  };

  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
      {renderMarkdown(content)}
    </div>
  );
};

export default MarkdownRenderer;
