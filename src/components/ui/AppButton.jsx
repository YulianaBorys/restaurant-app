export default function AppButton( {type='button', variant='primary', disabled=false, children } ) {
    return (
        <button type={type} className={`btn btn-${variant}`} disabled={disabled}>
            {children}
        </button>
    );
}
