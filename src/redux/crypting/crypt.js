var CryptoJS = require("crypto-js");

// Encrypt
export function encrypt(message) {
    var ciphertext = CryptoJS.AES.encrypt(message, 'secret-agent');
    return ciphertext;
}

export function decrypt(message) {
// Decrypt
    var bytes = CryptoJS.AES.decrypt(message.toString(), 'secret-agent');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

