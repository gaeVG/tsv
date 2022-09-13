import cryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY;

class AES {
  static encrypt = (data: string): string => {
    return cryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  };

  static decrypt = (data: string): string => {
    const bytes = cryptoJS.AES.decrypt(data, SECRET_KEY);
    return bytes.toString(cryptoJS.enc.Utf8);
  };
}

export { AES };
