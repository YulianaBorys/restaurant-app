import AppButton from "../ui/AppButton.jsx";
import FormField from "../ui/FormField.jsx";
import { useState } from "react";
import validateOrderForm from "../../utils/validation.js";

export default function OrderForm({
  initialValues,
  onSubmitSuccess,
  onCancel,
  submitLabel = "Зберегти",
}) {

  const [formData, setFormData] = useState(
    initialValues || {
      clientName: "",
      clientPhone: "",
      clientAddress: "",
      quantity: 1,
      comment: "",
      needsCutlery: false,
    }
  );


  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val=type==="checkbox"?checked:value
    setFormData((prev) => ({ ...prev, [name]: val }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateOrderForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmitSuccess(formData);
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}noValidate>
      <h2>Оформлення замовлення</h2>

      <FormField
        id="order-client-name"
        label="Ім'я клієнта"
        error={errors.clientName}
      >
        <input
          type="text"
          id="order-client-name"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          placeholder="Введіть ім'я клієнта"
        />
      </FormField>

      <FormField
        id="order-client-phone"
        label="Телефон клієнта"
        error={errors.clientPhone}
      >
        <input
          type="text"
          id="order-client-phone"
          name="clientPhone"
          value={formData.clientPhone}
          onChange={handleChange}
          placeholder="Введіть телефон клієнта"
        />
      </FormField>

      <FormField
        id="order-client-address"
        label="Адреса доставки"
        error={errors.clientAddress}
      >
        <input
          type="text"
          id="order-client-address"
          name="clientAddress"
          value={formData.clientAddress}
          onChange={handleChange}
          placeholder="Введіть адресу доставки"
        />
      </FormField>

      <FormField
        id="order-quantity"
        label="Кількість порцій"
        error={errors.quantity}
      >
        <input
          type="number"
          id="order-quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

      </FormField>
      <FormField
        id="order-comment"
        label="Коментар до замовлення (необов'язково)"
        hint="Вкажіть коментар для кухаря або уточнення щодо доставки."
        error={errors.comment}
      >
        <textarea
          id="order-comment"
          rows={3}
          value={formData.comment}
          onChange={handleChange}
          name="comment"
          placeholder="Наприклад: без цибулі, зателефонувати за 10 хвилин..."
        />
      </FormField>

      <div className="checkbox-field">
        <label htmlFor="order-cutlery">
          <input
            type="checkbox"
            id="order-cutlery"
            checked={Boolean(formData.needsCutlery)}
            onChange={handleChange}
            name="needsCutlery"
          />
          Потрібні столові прибори та серветки
        </label>
      </div>

      <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <AppButton type="submit" variant="primary">
          {submitLabel}
        </AppButton>
        <AppButton type="button" variant="secondary" onClick={onCancel}>
          Відмінити
        </AppButton>
      </div>
    </form>
  );
}