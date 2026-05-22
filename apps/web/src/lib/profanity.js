
const profanityList = [
  'caralho', 'porra', 'merda', 'buceta', 'foda', 'puta', 'viado', 'cu',
  'arrombado', 'pqp', 'filha da puta', 'filho da puta', 'puto', 'corno',
  'pica', 'rola', 'cacete', 'babaca', 'escroto', 'otario', 'otário',
  'joder', 'mierda', 'puta', 'cabron', 'cabrón', 'gilipollas', 'hostia',
  'coño', 'polla', 'capullo'
];

export const checkProfanity = (text) => {
  if (!text) return false;
  
  // Normalize text: lowercase, remove accents
  const normalizedText = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return profanityList.some(word => {
    // Exact word match to avoid false positives like "curva" matching "cu"
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(normalizedText);
  });
};
