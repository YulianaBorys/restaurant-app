import {Link} from 'react-router-dom'
import PageHeading from '../components/ui/PageHeading'

export default function NotFoundPage({
    title="404: сторінку не знайдено",
    message="Перевірте адресу або перейдіть до каталогу меню"
}){
    return(
        <div className="not-found-page">
            <PageHeading title={title} />
            <p>{message}</p>
            <div>
                <Link to="/menu" className="app-button app-button-primary">
                Відкрити меню
                </Link>
                <Link to="/" className="app-button app-button-secondary">
                На головну
                </Link>
            </div>
        </div>
    )
}