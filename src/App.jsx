import { Routes, Route } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout'
import OrdersLayout from './components/layout/OrdersLayout'

import Mainpage from './components/Mainpage'
import MenuPage from './pages/MenuPage'
import DishDetailsPage from './pages/DishDetailsPage'
import OrdersPage from './pages/OrdersPage'
import OrderCreatePage from './pages/OrderCreatePage'
import OrderEditPage from './pages/OrderEditPage'
import BookingForm from './components/BookingForm'
import ReviewList from './components/ReviewList'
import NotFoundPage from './pages/NotFoundPage'

import {MENU_ITEMS, REVIEWS} from './data/restaurantData'

import './App.css'

export default function App() {
  return (
          <Routes>
            <Route element={<AppLayout/>}>
            <Route path="/" element={<Mainpage />} />

            <Route path="/menu" element={<MenuPage dish={MENU_ITEMS}/>}/>
            <Route path="/menu/:dishId" element={<DishDetailsPage dishes={MENU_ITEMS}/>}/>

            <Route path="/order" element={<OrdersLayout/>}>
              <Route index element={<OrdersPage dishes={MENU_ITEMS}/>}/>
              <Route path="new" element={<OrderCreatePage dishes={MENU_ITEMS}/>}/>
              <Route path=":orderId/edit" element={<OrderEditPage/>}/>
            </Route>

            <Route path="/booking" element={<BookingForm />}/>
            <Route path="/reviews" element={<ReviewList reviews={REVIEWS} />}/>

             <Route path="*" element={<NotFoundPage/>}/>
            </Route>
          </Routes>
  )
}
