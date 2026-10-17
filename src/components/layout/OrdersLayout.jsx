import {NavLink, Outlet} from 'react-router-dom'

export default function OrdersLayout(){
    return(
        <div className="orders-section">
            <nav aria-label="Меню розділу замовлень" className="sub-nav">
                <ul className="nav-list">
                    <li>
                        <NavLink to="." end className={({isActive})=>(isActive? 'active': '')}>
                            Список замовлень
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="new" className={({isActive})=>(isActive? 'active': '')}>
                            Нове замовлення
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="orders-content">
                <Outlet/>
            </div>
        </div>
    )
}