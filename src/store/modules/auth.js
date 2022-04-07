import { AUTH_LOGIN, AUTH_LOGOUT } from '../mutation-types'
import router from '../../router'
import { login } from '../../services/auth'
export default {
  namespaced: true,
  state: () => ({
    user: JSON.parse(localStorage.getItem('user'))
  }),
  mutations: {
    [AUTH_LOGIN] (state, payload) {
      state.user = payload
    },
    [AUTH_LOGOUT] (state) {
      state.user = null
    }
  },
  actions: {
    async login ({ commit }, payload) {
      console.log(payload)
      try {
        const res = await login(payload.email, payload.password)
        const user = res.data.user
        const token = res.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        console.log(res)

        router.push('/')
        commit(AUTH_LOGIN, user)
      } catch (e) {
        console.log('Error')
      }
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      commit(AUTH_LOGOUT)
    }
  },
  getters: {
    isLogin (state, getters) {
      return state.user != null
    }
  }
}
