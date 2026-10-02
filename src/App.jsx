import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { MENU_ITEMS, REVIEWS } from './data/restaurantData'
import Mainpage from './components/Mainpage'
import MenuPage from './pages/MenuPage'
import OrderPage from './pages/OrderPage'
import BookingForm from './components/BookingForm'
import ReviewList from './components/ReviewList'

import './App.css'

export default function App() {
  // 1. Спільний стан вибору страви (Л 2.1)
  const [selectedId, setSelectedId] = useState(null)
  const selectedItem = MENU_ITEMS.find((item) => item.id === selectedId)

  function handleSelect(id) {
    if (MENU_ITEMS.some((item) => item.id === id)) {
      setSelectedId(id)
    }
  }

  function handleClearSelection() {
    setSelectedId(null)
  }

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
              element={
                <MenuPage
                  items={MENU_ITEMS}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                />
              }
            />

            <Route path="/booking" element={<BookingForm />} />
            <Route path="/reviews" element={<ReviewList reviews={REVIEWS} />} />

            <Route
              path="/order"
              element={
                <OrderPage
                  key={selectedId ?? 'empty'}
                  item={selectedItem}
                  onClearSelection={handleClearSelection}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}