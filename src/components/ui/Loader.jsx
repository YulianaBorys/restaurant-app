export default function Loader({message='Завантаження даних...'}){
    return (
        <div clasName="loader-container" style={{textAlign: 'center', padding: '40px'}}>
            <div clasName="spinner" style={{fontSize: '24px', marginBottom: '10px'}}>⏳</div>
            <p>{message}</p>
        </div>
    )
}