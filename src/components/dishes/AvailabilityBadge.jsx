export default function AvailabilityBadge({ available=false }) {
    const label=available ? "Доступно для замовлення" : "Тільки в закладі";
    const className=`availability-badge ${available ? "available" : "unavailable"}`;
    return (
        <span className={className}>{label}</span>
    );
}