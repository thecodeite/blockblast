import React from 'react'
import './App.css'
import { Board } from './Board'
import { useRoutes, Navigate, Outlet } from 'react-router-dom'
import { Screen } from './Screen'

const MainLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: '/',
    strict: true,
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to="blockblast/level1" /> },
      { path: '/blockblast/', element: <Navigate to="blockblast/level1" /> },
      { path: '/blockblast/:level', element: <Screen /> },
      { path: '/blockblast/blockblast/:level', element: <Screen /> },
      { path: '/:level', element: <Screen /> },
    ],
  }

  const routing = useRoutes([mainRoutes])

  return <>{routing}</>
}

export default App
