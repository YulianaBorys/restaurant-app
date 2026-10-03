import AppButton from "../ui/AppButton.jsx";
import FormField from "../ui/FormField.jsx";

export default function OrderForm({
  dishName,
  draft = { comment: '', needsCutlery: false },
  onCommentChange,
  onNeedsCutleryChange,
  onReset,
}) {
  return (
    <form className="order-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Оформлення замовлення: {dishName}</h2>

      <FormField
        id="order-comment"
        label="Коментар до замовлення (необов'язково)"
        hint="Вкажіть коментар для кухаря або уточнення щодо доставки."
      >
        <textarea
          id="order-comment"
          rows={3}
          value={draft.comment || ''}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Наприклад: без цибулі, зателефонувати за 10 хвилин..."
        />
      </FormField>

      <div className="checkbox-field">
        <label htmlFor="order-cutlery">
          <input
            type="checkbox"
            id="order-cutlery"
            checked={Boolean(draft.needsCutlery)}
            onChange={(e) => onNeedsCutleryChange(e.target.checked)}
          />
          Потрібні столові прибори та серветки
        </label>
      </div>

      <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <AppButton type="button" variant="secondary" onClick={onReset}>
          Скинути форму
        </AppButton>
      </div>
    </form>
  );
}