import MainNav from "../navigation/MainNav.jsx";

export default function SiteHeader({links}) {
    return (
        <header className="site-header">
            <MainNav links={links} />
        </header>
    );
}
