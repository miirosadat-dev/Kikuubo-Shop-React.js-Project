import { useState } from "react";
import toast from "react-hot-toast";
import { updateShippingAddress } from "../redux/CartSlice";
import { isValidUgandaPhone } from "../utils/validators";

const ChangeAddress = ({ address, dispatch, setIsModalOpen }) => {
  const [form, setForm] = useState({
    name: address.name,
    phone: address.phone,
    address: address.address,
  });
  const [errors, setErrors] = useState({});

  // Update one field and clear its error message while the person is typing
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const found = {};
    if (form.name.trim().length < 2) found.name = "Enter your full name.";
    if (!isValidUgandaPhone(form.phone))
      found.phone = "Enter a valid Ugandan mobile number, e.g. +256 772 123 456.";
    if (form.address.trim().length < 5)
      found.address = "Enter your delivery address.";
    return found;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    dispatch(
      updateShippingAddress({
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      }),
    );
    toast.success("Delivery address updated");
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSave} noValidate>
      <h2 className="mb-6 pr-10 text-xl font-bold text-gray-900">
        Delivery address
      </h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="addr-name" className="label">
            Full name
          </label>
          <input
            id="addr-name"
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange("name")}
            aria-invalid={Boolean(errors.name)}
            className={`input ${errors.name ? "input-error" : ""}`}
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="addr-phone" className="label">
            Phone number
          </label>
          <input
            id="addr-phone"
            type="tel"
            placeholder="+256 7XX XXX XXX"
            value={form.phone}
            onChange={handleChange("phone")}
            aria-invalid={Boolean(errors.phone)}
            className={`input ${errors.phone ? "input-error" : ""}`}
          />
          {errors.phone && <p className="field-error">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="addr-address" className="label">
            Delivery address
          </label>
          <textarea
            id="addr-address"
            rows={3}
            placeholder="Area, street and landmark"
            value={form.address}
            onChange={handleChange("address")}
            aria-invalid={Boolean(errors.address)}
            className={`input resize-none ${errors.address ? "input-error" : ""
              }`}
          />
          {errors.address && <p className="field-error">{errors.address}</p>}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save address
        </button>
      </div>
    </form>
  );
};

export default ChangeAddress;