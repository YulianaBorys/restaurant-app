export default function AppButton( {type='button', variant='primary', disabled=false, children, onClick, 'aria-pressed': ariaPressed, 'aria-expanded': ariaExpanded, 'aria-controls': ariaControls} ) {
    return (
        <button type={type} className={`app-button app-button-${variant}`} disabled={disabled} onClick={onClick} aria-pressed={ariaPressed} aria-expanded={ariaExpanded} aria-controls={ariaControls}>
            {children}
        </button>
    );
}
