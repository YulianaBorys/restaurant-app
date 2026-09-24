export default function EmptyState({ title="Немає доступних елементів." , children}) {
    return (
        <div className="empty-state">
            <h3 className="empty-state-title">{title}</h3>
            {children && <div className="empty-state-content">{children}</div>}
        </div>
    );
}
