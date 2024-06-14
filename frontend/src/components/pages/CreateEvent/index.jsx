import { useState } from 'react'
import { addEvent } from '@/services/eventsService.js'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui'

import './style.scss'
import { getFromLocalStorage } from '../../../utils/localStorage'

const CreateEvent = () => {
  const [isDone, setIsDone] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      // short_description: '',
      description: '',
    },
  })

  const sendData = async data => {
    const userId = getFromLocalStorage('userData')?.id_user

    const newData = {
      created_user_id: userId,
      name: data.name,
      description: data.addEvent,
    }
    try {
      const response = await addEvent(newData)
      console.log(response)
    } catch (error) {}
  }

  const processForm = data => {
    sendData(data)
  }

  return (
    <div className='create-event'>
      <div className='create-event__container'>
        <div className='create-event__title'>Create Event</div>
        {isDone && (
          <div className='create-event__form-done'>
            <div>The event has been successfully created!</div>
          </div>
        )}

        {!isDone && (
          <div className='create-event__body'>
            <form
              onSubmit={handleSubmit(processForm)}
              className='create-event__form create-event-form'
            >
              <div className='create-event-form__line'>
                <Input
                  register={register}
                  validationSchema={{ required: 'This field is required' }}
                  error={errors.name?.message}
                  name='name'
                  placeholder='Name'
                />
              </div>

              {/* <div className='create-event-form__line'>
              <Input
                register={register}
                validationSchema={{ required: 'This field is required' }}
                error={errors.short_description?.message}
                name='short_description'
                placeholder='Short description'
              />
            </div> */}

              <div className='create-event-form__line'>
                <Input
                  register={register}
                  validationSchema={{ required: 'This field is required' }}
                  error={errors.description?.message}
                  name='description'
                  placeholder='Description'
                />
              </div>
              <div className='create-event-form__line'>
                <input
                  type='text'
                  placeholder='Date event'
                  className='create-event-form__input input'
                />
              </div>

              <div className='create-event-form__bottom'>
                <button
                  type='submit'
                  className='create-event-form__submit-button button'
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateEvent
