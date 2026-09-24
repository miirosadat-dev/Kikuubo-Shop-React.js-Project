import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// A password box with a Show / Hide button
const PasswordInput = ({
    id,
    value,
    onChange,
    placeholder,
    autoComplete,
    invalid,
}) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <input
                id={id}
                type={visible ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={invalid}
                aria-describedby={invalid ? `${id}-error` : undefined}
                className={`input pr-12 ${invalid ? "input-error" : ""}`}
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 hover:text-gray-800"
            >
                {visible ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
};

export default PasswordInput;