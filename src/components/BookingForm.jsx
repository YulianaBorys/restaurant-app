import {useState} from "react";

export default function BookingForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);

    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

return (
    <div className="booking-form">
        <h2>Забронювати столик</h2>
        {submitted ? (
            <p>Дякуємо за бронювання, {name}! Ми зв'яжемося з вами найближчим часом.</p>
        ) : (
            <form onSubmit={handleSubmit}>  
            <input
                type="text"
                placeholder="Ваше ім'я"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Дата"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="time"
                placeholder="Час"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Кількість гостей"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                min="1"
                required
            />
            <button type="submit">Забронювати</button>
        </form>
        )}
    </div>
);
}