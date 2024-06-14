import { axiosDefault } from '@/lib/axios.js'

export const getEvents = async () => {
  return await axiosDefault.get('/events')
}

export const addEvent = async data => {
  return await axiosDefault.post('/events', data)
}
