import MainNav from "../navigation/MainNav.jsx";
import {Link} from 'react-router-dom'

export default function SiteHeader({title, links}) {
    return (
        <header className="site-header">
            <Link to="/" className="site-title">
                {title}
            </Link>
            <MainNav links={links} />
        </header>
    );
}
