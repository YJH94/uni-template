
import CryptoJS from './crypto-js.js'

/**
 * aes加密
 * @param {String} key 加密得key
 * @param {String} data 加密内容
 */
function aesEncrypt(key,data) {
  //加密
  var key = CryptoJS.enc.Utf8.parse(key);
  //  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data, key, {
    //          iv:iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString(); //返回的是16进制格式的密文
}


/**
 * aes解密
 * @param {String} key 加密得key
 * @param {String} data 需要解密的内容
 */
function aesDecrypt(key,encrypted ) {
  //解密 入参为16进制
  var key = CryptoJS.enc.Utf8.parse(key);
  //  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var datahex = CryptoJS.enc.Hex.parse(encrypted);
  var dataBase64 = CryptoJS.enc.Base64.stringify(datahex);
  var decrypted = CryptoJS.AES.decrypt(dataBase64, key, {
    //          iv:iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}



const aeskey_jkt='jfdjk670qEH5lm3b'

function aesEncryptJKT(data){ 
	//加密
  var key  = aeskey_jkt;  //密钥
  var encrypted =aesEncrypt(key,data); //密文
  return encrypted;
}

function aesDecryptJKT(data){
	//解密
  var key  = aeskey_jkt;  //密钥
  var decryptedStr =aesDecrypt(key,data);
  return trim(decryptedStr);
}

module.exports={
	aeskey_jkt:aeskey_jkt,
	aesEncrypt:aesEncrypt,
	aesDecrypt:aesDecrypt,
	aesEncryptJKT:aesEncryptJKT,
	aesDecryptJKT:aesDecryptJKT
}