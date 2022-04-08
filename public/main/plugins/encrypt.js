/*
 * @Author: Whzcorcd
 * @Date: 2020-12-08 13:28:42
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-12-08 14:58:34
 * @Description: file content
 */
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 加密
export const encrypt = ({ value, privateKey }) => {
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(privateKey)
  return jsencrypt.encrypt(value)
}

// 解密
export const decrypt = ({ value, privateKey }) => {
  const jsdecrypt = new JSEncrypt()
  jsdecrypt.setPrivateKey(privateKey)
  return jsdecrypt.decrypt(value)
}
