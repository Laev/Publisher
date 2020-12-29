/* eslint-disable no-shadow */
/*
 * @Author: Whzcorcd
 * @Date: 2020-12-28 14:52:41
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-12-29 12:18:15
 * @Description: file content
 */
const state = {
  ongoingTasks: [],
  failedTasks: [],
  completedTasks: []
}

const mutations = {
  ADD_ONGOING_TASKS(state, { id }) {
    if (!state.ongoingTasks.includes(id)) {
      if (state.failedTasks.includes(id)) {
        state.failedTasks.splice(state.failedTasks.indexOf(id), 1)
      }
      if (state.completedTasks.includes(id)) {
        state.completedTasks.splice(state.completedTasks.indexOf(id), 1)
      }
      state.ongoingTasks.push(id)
    }
  },
  ADD_FAILED_TASKS(state, { id }) {
    if (state.ongoingTasks.includes(id) && !state.failedTasks.includes(id)) {
      state.ongoingTasks.splice(state.ongoingTasks.indexOf(id), 1)
      state.failedTasks.push(id)
    }
  },
  ADD_COMPLETED_TASKS(state, { id }) {
    if (state.ongoingTasks.includes(id) && !state.failedTasks.includes(id)) {
      state.ongoingTasks.splice(state.ongoingTasks.indexOf(id), 1)
      state.failedTasks.push(id)
    }
  }
}

const actions = {
  addOngoingTasks({ commit }, preload) {
    commit('ADD_ONGOING_TASKS', preload)
  },
  addFailedTasks({ commit }, preload) {
    commit('ADD_FAILED_TASKS', preload)
  },
  addCompletedTasks({ commit }, preload) {
    commit('ADD_COMPLETED_TASKS', preload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}