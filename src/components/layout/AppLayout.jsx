import SiteHeader from "./SiteHeader.jsx";
import {Outlet} from 'react-router-dom'
import {DishSelectionProvider} from '../../context/DishSelectionContext'

const navigationLinks=[
    {to: '/', label: 'Головна', end: true},
    {to: '/menu', label: 'Меню', },
    {to: '/order', label: 'Замовлення'},
]

export default function AppLayout() {
    const links = navigationLinks;

    return (
        <DishSelectionProvider>
            <SiteHeader links={links} />
            <main id="main-content" tabIndex={-1}>
                <Outlet/>
            </main>
        </DishSelectionProvider>
    );
}