export const cleanText = (text: string) => text.replace(/[^\x00-\x7F]/g, '');
