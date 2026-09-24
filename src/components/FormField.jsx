// A label, the input you pass in, and an error (or hint) underneath.
// The input needs the same id, and aria-describedby={`${id}-error`} when it has an error.
const FormField = ({ id, label, error, hint, children }) => (
    <div>
        <label htmlFor={id} className="label">
            {label}
        </label>
        {children}
        {error ? (
            <p id={`${id}-error`} className="field-error">
                {error}
            </p>
        ) : (
            hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>
        )}
    </div>
);

export default FormField;