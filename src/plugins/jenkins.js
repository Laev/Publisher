/*
 * @Author: Whzcorcd
 * @Date: 2020-12-04 17:22:13
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-07-30 00:53:27
 * @Description: file content
 */
import qs from 'qs'
import _axios from '@/request'

const baseUrl = process.env.JENKINS_BASEURL
const authorization = {
  username: process.env.JENKINS_USERNAME,
  password: process.env.JENKINS_API_TOKEN // api
}
const request = (
  actionUrl,
  method,
  params = {},
  headers = {},
  isStringified = true
) => {
  return _axios({
    method,
    url: `${baseUrl}/${actionUrl}`,
    headers: Object.assign(
      {
        Authorization: `Basic ${window.btoa(
          `${authorization.username}:${authorization.password}`
        )}`,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' // 指定提交方式为表单提交
      },
      headers
    ),
    data: method === 'POST' && isStringified ? qs.stringify(params) : params
  })
}

// 获取任务信息
export const getJobInfo = jobName => {
  return request(`job/${jobName}/api/json`, 'GET')
}

// 获取任务配置文件
export const getJobConfig = jobName => {
  return request(`job/${jobName}/config.xml`, 'GET')
}

// 获取构建详情
export const getBuildInfo = (jobName, buildNumber) => {
  return request(`job/${jobName}/${buildNumber}/api/json`, 'GET')
}

// 获取控制台输出
export const console = jobName => {
  return request(`job/${jobName}/lastBuild/logText/progressiveText`, 'GET')
}

// 获取最后一次构建数据
export const getLastBuildNumber = jobName => {
  return request(`job/${jobName}/lastBuild/buildNumber`, 'GET')
}

// 获取最后一次构建时间戳
export const getBuildTimestamp = jobName => {
  return request(`job/${jobName}/lastBuild/buildTimestamp`, 'GET')
}

// 任务普通构建
export const build = jobName => {
  return request(`job/${jobName}/build`, 'POST')
}

// 任务参数化构建
export const buildWithParams = (jobName, preload) => {
  return request(`job/${jobName}/buildWithParameters`, 'POST', preload)
}

// 创建任务
export const createJob = (jobName, preload) => {
  return request(
    `createItem?name=${jobName}`,
    'POST',
    preload,
    {
      'Content-Type': 'application/xml'
    },
    false
  )
}

// 更新任务配置文件
export const updateJobConfig = jobName => {
  return request(`job/${jobName}/config.xml`, 'POST')
}

// TODO 合并所有 jenkins 相关操作
