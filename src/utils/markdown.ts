
export const formatMarkdown = (text: string): string => {
  // Convert **bold** to <strong>
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert *italic* to <em>
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert line breaks to <br>
  formatted = formatted.replace(/\n/g, '<br>');
  
  // Convert bullet points (- or *) to proper list items
  formatted = formatted.replace(/^[\-\*]\s(.+)$/gm, '• $1');
  
  return formatted;
};
