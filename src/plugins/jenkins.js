/*
 * @Author: Whzcorcd
 * @Date: 2020-12-04 17:22:13
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-12-19 14:34:21
 * @Description: file content
 */
import _axios from '@/request'
import { jenkins } from '@/config'
import qs from 'qs'

const { baseUrl, authorization } = jenkins

const request = (jobName, actionUrl, method, params = {}) => {
  return method === 'POST'
    ? _axios({
        method,
        url: `${baseUrl}/${jobName}/${actionUrl}`,
        headers: {
          Authorization: `Basic ${window.btoa(
            `${authorization.username}:${authorization.password}`
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' // 指定提交方式为表单提交
        },
        data: params ? qs.stringify(params) : {}
      })
    : _axios({
        method,
        url: `${baseUrl}/${jobName}/${actionUrl}`,
        headers: {
          Authorization: `Basic ${window.btoa(
            `${authorization.username}:${authorization.password}`
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' // 指定提交方式为表单提交
        }
      })
}

export const getJobInfo = jobName => {
  return request(jobName, 'api/json', 'GET')
}

export const getBuildInfo = (jobName, buildNumber) => {
  return request(jobName, `${buildNumber}/api/json`, 'GET')
}

export const console = jobName => {
  return request(jobName, 'lastBuild/logText/progressiveText', 'GET')
}

export const getLastBuildNumber = jobName => {
  return request(jobName, 'lastBuild/buildNumber', 'GET')
}

export const build = jobName => {
  return request(jobName, 'build', 'POST')
}

export const buildWithParams = (jobName, preload) => {
  return request(jobName, 'buildWithParameters', 'POST', preload)
}

// TODO 合并所有 jenkins 相关操作
