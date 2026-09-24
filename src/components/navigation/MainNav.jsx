export default function MainNav({links}) {
    return (
        <nav aria-label="Основна навігація">
            <ul className="nav-list">
                {links.map((link)=> (
                    <li key={link.id || link.href} className="nav-item">
                        <a href={link.href} className="nav-link">
                            {link.label}
                            </a>
                    </li>       
                ))}
            </ul>
        </nav>
    );
}
