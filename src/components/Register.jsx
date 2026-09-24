import { useState } from "react";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import { registerUser } from "../services/authService";
import {
  isValidEmail,
  isValidPassword,
  isValidUgandaPhone,
} from "../utils/validators";

const Register = ({ openLogin, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === "terms" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  };

  const validate = () => {
    const found = {};
    if (form.name.trim().length < 2) found.name = "Enter your full name.";
    if (!isValidEmail(form.email)) found.email = "Enter a valid email address.";
    if (!isValidUgandaPhone(form.phone))
      found.phone = "Enter a valid Ugandan mobile number, e.g. +256 772 123 456.";
    if (!isValidPassword(form.password))
      found.password = "Use at least 8 characters, with a letter and a number.";
    if (form.confirmPassword !== form.password)
      found.confirmPassword = "Passwords do not match.";
    if (!form.terms) found.terms = "Please accept the terms to continue.";
    return found;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsSubmitting(true);
    try {
      const user = await registerUser(form);
      onSuccess(user);
    } catch (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 pr-8">
        <h2 className="text-2xl font-bold text-gray-900">Create account</h2>
        <p className="mt-1 text-sm text-gray-500">
          Join Kikuubo Shop and start shopping
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField id="reg-name" label="Full name" error={errors.name}>
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            autoFocus
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "reg-name-error" : undefined}
            className={`input ${errors.name ? "input-error" : ""}`}
          />
        </FormField>

        <FormField id="reg-email" label="Email address" error={errors.email}>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "reg-email-error" : undefined}
            className={`input ${errors.email ? "input-error" : ""}`}
          />
        </FormField>

        <FormField id="reg-phone" label="Phone number" error={errors.phone}>
          <input
            id="reg-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+256 7XX XXX XXX"
            value={form.phone}
            onChange={handleChange("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "reg-phone-error" : undefined}
            className={`input ${errors.phone ? "input-error" : ""}`}
          />
        </FormField>

        <FormField
          id="reg-password"
          label="Password"
          error={errors.password}
          hint="At least 8 characters, with a letter and a number."
        >
          <PasswordInput
            id="reg-password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange("password")}
            invalid={Boolean(errors.password)}
          />
        </FormField>

        <FormField
          id="reg-confirm"
          label="Confirm password"
          error={errors.confirmPassword}
        >
          <PasswordInput
            id="reg-confirm"
            autoComplete="new-password"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            invalid={Boolean(errors.confirmPassword)}
          />
        </FormField>

        <div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={handleChange("terms")}
              className="h-4 w-4 rounded accent-brand-600"
            />
            I agree to the terms and conditions
          </label>
          {errors.terms && <p className="field-error">{errors.terms}</p>}
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
          className="btn btn-primary btn-block py-3"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-600">
        Already have an account?
        <button
          type="button"
          className="ml-2 font-semibold text-brand-600 hover:underline"
          onClick={openLogin}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;