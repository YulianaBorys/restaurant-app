import SiteHeader from "./SiteHeader.jsx";

export default function AppLayout({title, links, children}) {
    return (
        <>
            <a className="skip-link" href="#main-content">Перейти до основного вмісту</a>
            <SiteHeader title={title} links={links} />
            <main id="main-content" tabIndex={-1}>
                {children}
            </main>
            <footer className="site-footer">
                <p>Ресторан. Каталог та підготовка замовлень</p>
            </footer>
        </>
    );
}