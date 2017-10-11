import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Polyfill for window.fetch()
require('whatwg-fetch')

const store = () => new Vuex.Store({

  state: {
    user: null,
    polls: [],
    title: 'Voting App'
  },

  mutations: {
    SET_USER: function (state, user) {
      state.user = user
    },
    UNSET_USER: function (state) {
      state.user = null
    },
    ADD_POLL: function (state, newPoll) {
      state.polls.push(newPoll)
    },
    UPDATE_POLLS: function (state, pollArray) {
      state.polls = pollArray
    }
  },

  actions: {

    nuxtServerInit ({ commit, dispatch }, { req }) {
      if (req.user) {
        commit('SET_USER', {name: req.user.name, email: req.user.email, id: req.user._id})
      }
    },

    // Handle User Login from Login component
    login ({ commit }, { name, email, _id }) {
      // Add User to state
      commit('SET_USER', { name, email, id: _id })
    },

    logout ({ commit }, { req }) {
      commit('UNSET_USER')
    }
  }

})

export default store
