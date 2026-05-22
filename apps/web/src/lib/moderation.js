
import { checkProfanity } from './profanity.js';

const lastActionTimes = new Map();

export const moderateContent = (text, images = [], userId = 'anonymous') => {
  const errors = [];

  // Rate Limiting (1 message per 2 seconds)
  const now = Date.now();
  const lastTime = lastActionTimes.get(userId) || 0;
  if (now - lastTime < 2000) {
    errors.push('Por favor, aguarde alguns segundos antes de enviar outra mensagem.');
  } else {
    lastActionTimes.set(userId, now);
  }

  // Text Validation
  if (text) {
    if (text.length < 1) {
      errors.push('A mensagem não pode estar vazia.');
    }
    if (text.length > 5000) {
      errors.push('A mensagem excede o limite de 5000 caracteres.');
    }
    if (checkProfanity(text)) {
      errors.push('Sua mensagem contém linguagem inapropriada. Por favor, revise.');
    }
  }

  // Image Validation
  if (images && images.length > 0) {
    for (const file of images) {
      // Size < 4MB
      if (file.size > 4 * 1024 * 1024) {
        errors.push(`A imagem ${file.name} excede o limite de 4MB.`);
      }
      
      // MIME Type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        errors.push(`Formato não suportado para ${file.name}. Use JPG, PNG ou WEBP.`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
