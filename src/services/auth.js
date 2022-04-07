import api from './api'

export function login (username, password) {
  return api.post('/auth/login', { username: username, password: password })
}
