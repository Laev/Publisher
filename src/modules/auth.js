/*
 * @Author: Whzcorcd
 * @Date: 2020-12-08 13:15:18
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2022-01-04 09:35:56
 * @Description: file content
 */
import { decrypt } from '#/plugins/encrypt'

import store from '@/store'
const insideDeveloperUsergroup = JSON.parse(process.env.AUTH_INSIDEDEVELOPERUSERGROUP_ARRAY) // JSON.parse(window.$u)
const insidePMUsergroup = JSON.parse(process.env.AUTH_INSIDEPMUSERGROUP_ARRAY) // JSON.parse(window.$pm)
const insidePassword = process.env.AUTH_INSIDEPASSWORD // window.$p
const privatekey = process.env.AUTH_PRIVATEKEY

store.dispatch('user/setUserList', {
  developersList: insideDeveloperUsergroup,
  productManagersList: insidePMUsergroup
})

export const login = async ({ username, password }) => {
  try {
    await store.dispatch('user/setUserSession', { username })
  } catch (err) {
    return Promise.reject(err)
  }

  const verification = decrypt({
    value: insidePassword,
    privateKey: privatekey
  })

  if (password === verification) return Promise.resolve()
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject()
}

export const logout = async () => {
  await store.dispatch('user/clearUserSession')
}
