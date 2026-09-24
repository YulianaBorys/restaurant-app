import MainNav from "../navigation/MainNav.jsx";

export default function SiteHeader({title, links}) {
    return (
        <header className="site-header">
            <h1 className="site-header-title">{title}</h1>
            <MainNav links={links} />
        </header>
    );
}
