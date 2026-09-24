import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

import { MENU_ITEMS, REVIEWS } from "./data/restaurantData";
import MenuList from "./components/MenuList"; 
import BookingForm from "./components/BookingForm";
import ReviewList from "./components/ReviewList";
import Mainpage from "./components/Mainpage";


import "./App.css";


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Головна</Link>
          <Link to="/menu">Меню</Link>
          <Link to="/booking">Бронювання</Link>
          <Link to="/reviews">Відгуки</Link>
        </nav>
      
        <div className="content">
          <Routes>
            <Route path="/" element={<Mainpage/>} />
            <Route path="/menu" element={<MenuList items={MENU_ITEMS} />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/reviews" element={<ReviewList reviews={REVIEWS} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;