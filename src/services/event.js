import api from './api'

export function getEvents (startDate, endDate) {
  return api.get('/booking', { params: { startDate: startDate, endDate: endDate } })
}

export function addEvent (event) {
  return api.post('/booking', event)
}

export function deleteBooking (event) {
  return api.delete('/booking/' + event)
}

export function addApprover (item) {
  return api.post('/approver', item)
}
