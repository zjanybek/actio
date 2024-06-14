import { Link } from 'react-router-dom'
import './style.scss'

const Card = ({ event }) => {
  return (
    <div className='events-item'>
      <div className='events-item__title'>{event.name}</div>
      <div className='events-item__text'>{event.description}</div>
      <div className='events-item__bottom'>
        <span className='events-item__date'>13.06.2024</span>

        <Link
          to={`/event/${event._id}`}
          className='events-item__button-more button button_border'
        >
          Подробнее
        </Link>
      </div>
    </div>
  )
}

export default Card
