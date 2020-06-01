import * as Crypto from 'crypto';

export const cryptoPwd = (pwd: string, key: string) => {
  return Crypto.createHmac('sha256', key).update(pwd).digest('hex');
}