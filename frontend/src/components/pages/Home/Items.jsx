import { useEffect, useState } from 'react'
import { getEvents } from '@/services/eventsService.js'
import Card from '@/components/events/Card/Card.jsx'

const Items = () => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    setIsLoading(true)
    try {
      const response = await getEvents()
      setEvents(response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setEvents([])
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {isLoading && <div className='main-block__load-items'>Loading...</div>}

      {!isLoading && events.length === 0 && (
        <div className='main-block__none-items'>
          Sorry, the event was not found.
        </div>
      )}

      {!isLoading && events.length > 0 && (
        <div className='main-block__items'>
          {events.map(event => {
            return <Card key={event._id} event={event} />
          })}
        </div>
      )}
    </>
  )
}

export default Items
