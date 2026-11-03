import AppButton from './AppButton'

export default function ErrorMessage({message, onRetry}){
    return(
        <div className='error-box'style={{padding:'20px', backgroundColor: '#ffebee', border: '1px solid #ffcdd2', borderRadius: '8px', margin: '20 px 0'}}>
            <h4 style={{color: '#c62828', marginTop: 0}}>Сталася помилка!</h4>
            <p>{message || 'Не вдалось завантажити дані з сервера'}</p>
            {onRetry && (
                <AppButton variant="secondary" onClick={onRetry}>
                    Повторити спробу
                </AppButton>
            )}
        </div>
    )
}