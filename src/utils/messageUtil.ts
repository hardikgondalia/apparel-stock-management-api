import path from 'path';
import fs from 'fs';

const messagePath = path.join(__dirname, '../../message.json');

const messages = JSON.parse(fs.readFileSync(messagePath, 'utf-8'));

export const getMessage = (key: string): string => {
  return messages[key] || `Message not found for key: ${key}`;
};