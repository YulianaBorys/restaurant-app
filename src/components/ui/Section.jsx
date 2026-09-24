export default function Section({ id, title, children }) {
    const titleId=id ? `${id}-title` : undefined;
    return (
        <section id={id} className="section" aria-labelledby="titleId">
            {title && <h2 id={titleId}>{title}</h2>}
            {children}
        </section>
    );
}
