import { Outlet } from 'react-router-dom'
import TheHeader from '../components/TheHeader'

const DefaultLayout = () => {
  return (
    <div className='wrapper'>
      <TheHeader />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout
