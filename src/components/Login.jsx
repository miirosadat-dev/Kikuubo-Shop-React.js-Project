import { useState } from "react";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import { loginUser } from "../services/authService";
import { isValidEmail } from "../utils/validators";

const Login = ({ openSignUp, openForgot, onSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update one field, and clear its error while the person types
  const handleChange = (field) => (e) => {
    const value = field === "remember" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = {};
    if (!isValidEmail(form.email)) found.email = "Enter a valid email address.";
    if (!form.password) found.password = "Enter your password.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsSubmitting(true);
    try {
      const user = await loginUser(form);
      onSuccess(user, form.remember);
    } catch (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 pr-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-1 text-sm text-gray-500">
          Log in to your Kikuubo Shop account
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField id="login-email" label="Email address" error={errors.email}>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            className={`input ${errors.email ? "input-error" : ""}`}
          />
        </FormField>

        <FormField id="login-password" label="Password" error={errors.password}>
          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange("password")}
            invalid={Boolean(errors.password)}
          />
        </FormField>

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={handleChange("remember")}
              className="h-4 w-4 rounded accent-brand-600"
            />
            Remember me
          </label>

          <button
            type="button"
            onClick={openForgot}
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {submitError && (
          <p
            role="alert"
            className="rounded-xl bg-brand-50 p-3 text-sm text-brand-800"
          >
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-block py-3.5"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <button
          type="button"
          className="ml-2 font-semibold text-brand-600 hover:underline"
          onClick={openSignUp}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;