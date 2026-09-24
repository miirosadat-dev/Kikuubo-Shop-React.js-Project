import { useState } from "react";
import FormField from "./FormField";
import { requestPasswordReset } from "../services/authService";
import { isValidEmail } from "../utils/validators";

const ForgotPassword = ({ openLogin }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError("Enter a valid email address.");
            return;
        }

        setIsSubmitting(true);
        try {
            await requestPasswordReset({ email });
            setSent(true);
        } catch {
            setError("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (sent) {
        return (
            <div className="pt-2 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
                <p className="mt-3 text-sm text-gray-600">
                    If an account exists for{" "}
                    <span className="font-semibold text-gray-900">{email.trim()}</span>,
                    you will receive instructions to reset your password.
                </p>
                <button
                    type="button"
                    className="btn btn-primary mt-8 px-8"
                    onClick={openLogin}
                >
                    Back to login
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6 pr-8">
                <h2 className="text-2xl font-bold text-gray-900">Reset password</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Enter your email and we will send you instructions.
                </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <FormField id="forgot-email" label="Email address" error={error}>
                    <input
                        id="forgot-email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? "forgot-email-error" : undefined}
                        className={`input ${error ? "input-error" : ""}`}
                    />
                </FormField>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-block py-3.5"
                >
                    {isSubmitting ? "Sending..." : "Send reset instructions"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Remembered it?
                <button
                    type="button"
                    className="ml-2 font-semibold text-brand-600 hover:underline"
                    onClick={openLogin}
                >
                    Back to login
                </button>
            </p>
        </div>
    );
};

export default ForgotPassword;