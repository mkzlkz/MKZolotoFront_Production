import moment from 'moment'

export default {
  state: {
    isRunning: false,
    lifetime: 0,
    currentQuestion: 0,
    testId: null
  },
  mutations: {
    stopTest (state) {
      state.isRunning = false
      state.lifetime = 0
    },
    runTest (state) {
      state.isRunning = true
    },
    setTestId (state, testId) {
      state.testId = testId
    },
    setCurrentQuestion (state, index) {
      state.currentQuestion = index
    },
    setLifetime (state, lifetime) {
      state.lifetime = lifetime
    },
    tick (state) {
      if (state.lifetime > 0) {
        state.lifetime--
      } else if (state.lifetime < 0) {
        state.lifetime++
      }
    }
  },
  actions: {
    tick ({state, commit, dispatch}) {
      setTimeout(() => {
        commit('tick')

        if (state.lifetime) {
          dispatch('tick')
        }
      }, 1000)
    },
    startTest ({commit, dispatch}, testId) {
      commit('runTest')
      commit('setTestId', testId)
      commit('setCurrentQuestion', 0)
      dispatch('tick')
    },
    setTimer ({state, commit, dispatch}, test) {
      console.log(test)
      let lifetime = parseInt(test.Duration) * 60
      let date = moment(test.Date)
      let now = moment()
      let diff = now.diff(date, 'seconds')

      lifetime -= diff
      commit('setLifetime', lifetime)
    }
  }
}
