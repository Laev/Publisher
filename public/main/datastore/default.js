/*
 * @Author: Whzcorcd
 * @Date: 2020-12-26 18:02:41
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-01-06 15:54:14
 * @Description: file content
 */
export const defaultData = {
  posts: [],
  records: [],
  user: {
    name: '',
    contact: '',
    workmail: ''
  },
  mail: {
    addressee: process.env.DEF_MAIL_ADDRESSEE,
    auth: {
      user: process.env.DEF_MAIL_SENDER_USER, // 发件人
      pass: process.env.DEF_MAIL_SENDER_PASS // 授权码
    }
  }
}