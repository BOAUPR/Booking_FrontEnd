import api from './api'

export function getEvents (startDate, endDate) {
  return api.get('/booking', { params: { startDate: startDate, endDate: endDate } })
}
