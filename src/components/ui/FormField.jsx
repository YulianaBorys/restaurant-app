export default function FormField({ id, label, hint, children }) {
    const hintId=hint ? `${id}-hint` : undefined;

    return (
        <div className="form-field">
            {label && <label htmlFor={id}>{label}</label>}
            {children}
            {hint && <p id={hintId} className="form-field-hint">{hint}</p>}
        </div>
    );
}
