import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import {DishSelectionProvider} from './context/DishSelectionContext'

import Mainpage from './components/Mainpage'
import MenuPage from './pages/MenuPage'
import OrderPage from './pages/OrderPage'
import BookingForm from './components/BookingForm'
import ReviewList from './components/ReviewList'
import {REVIEWS} from './data/restaurantData'

import './App.css'

export default function App() {
  return (
    <Router>
        <div className="App">
          <nav className="navbar">
            <Link to="/">Головна</Link>
            <Link to="/menu">Меню</Link>
            <Link to="/booking">Бронювання</Link>
            <Link to="/reviews">Відгуки</Link>
          <Link to="/order">Замовлення</Link>
        </nav>  

        <div className="content">
          <Routes>
            <Route path="/" element={<Mainpage />} />

            <Route
              path="/menu"
              element={<DishSelectionProvider>
                <MenuPage/>
              </DishSelectionProvider>}
            />

            <Route
              path="/order"
              element={
                <DishSelectionProvider>
                  <OrderPage />
                </DishSelectionProvider>
              }
            />

            <Route
              path="/booking"
              element={<BookingForm />}
            />

            <Route
              path="/reviews"
              element={<ReviewList reviews={REVIEWS} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
