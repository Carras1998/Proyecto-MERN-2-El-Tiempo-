import MainView from './pages/MainView'
//import CitiesView from './pages/FiveCitiesView'
import FiveDaysInCities from './pages/FiveDaysInCities'
import FiveDaysMainView from './pages/FiveDaysMainView'

import Navbar from './components/Navbar'

import './App.css'
import { Routes, Route } from 'react-router'
import { Suspense } from 'react'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element=
          {
            <Suspense fallback={<h1>Cargando...</h1>}>
              <MainView />
            </Suspense>
          }
        />
        <Route path="/FiveDaysMainView" element=
          {
            <Suspense fallback={<h1>Cargando...</h1>}>
              <FiveDaysMainView />
            </Suspense>
          }
        />
        <Route path="/FiveDaysInCities" element=
          {
            <Suspense fallback={<h1>Cargando...</h1>}>
              <FiveDaysInCities />
            </Suspense>
          }
        />
      </Routes>
    </>
  )
}

export default App