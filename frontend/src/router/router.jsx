import { createBrowserRouter } from 'react-router-dom'

// Layouts
import DefaultLayout from '../layouts/DefaultLayout'

// Pages
import Home from '../pages/HomePage'
import CreateEvent from '../pages/CreateEventPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          // <ProtoctedRoutes>
          <Home />
          // </ProtoctedRoutes>
        ),
      },
      {
        path: '/create-event',
        element: <CreateEvent />,
      },
    ],
  },
])
