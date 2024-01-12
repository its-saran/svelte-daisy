import cryptoRandomString from 'crypto-random-string';
import CryptoJS from 'crypto-js';

const Crypto = {
    generateKey: () => {
        return cryptoRandomString({ length: 32, type: 'base64' });
    },
    encrypt: (data, secretKey) => {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    },
    decrypt: (data, secretKey) => {
        return CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
    }
};

export default Crypto;
