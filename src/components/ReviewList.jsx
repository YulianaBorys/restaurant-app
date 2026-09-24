export default function ReviewList({ reviews }) {
    return (
        <div className="review-list">   
        {reviews.map((review) => (
            <div key={review.id} className="review-item">
                <h4 className="reviewer-name">{review.name}</h4>
                <p className="review-text">{review.text}</p>
                <p className="review-rating">Рейтинг: {review.rating} / 5</p>
            </div>
        ))}
        </div>
    );

}