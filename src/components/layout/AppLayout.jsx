import SiteHeader from "./SiteHeader.jsx";
import {Outlet} from 'react-router-dom'
import {DishSelectionProvider} from '../../context/DishSelectionContext'

const navigationLinks=[
    {to: '/', label: 'Головна', end: true},
    {to: '/menu', label: 'Меню', },
    {to: '/order', label: 'Замовлення'},
]

export default function AppLayout() {
    return (
        <DishSelectionProvider>
            <a className="skip-link" href="#main-content">Перейти до основного вмісту</a>
            <SiteHeader title={title} links={links} />
            <main id="main-content" tabIndex={-1}>
                <Outlet/>
            </main>
            <footer className="site-footer">
                <p>Ресторан. Каталог та підготовка замовлень</p>
            </footer>
        </DishSelectionProvider>
    );
}