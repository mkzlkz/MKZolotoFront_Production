const state = {
  singleFile: null
}
const getters = {
  getFileModule: state => name => state[name]
}
const mutations = {
  setFileModule (state, { type, data }) {
    state[type] = data
  }
}
const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
