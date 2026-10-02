import FormField from "../ui/FormField.jsx";
import AppButton from "../ui/AppButton.jsx";

const ALLERGENS = [
  { id: 'gluten', label: 'Без глютену', value: 'глютен' },
  { id: 'dairy', label: 'Без молочних продуктів', value: 'молочні продукти' },
  { id: 'eggs', label: 'Без яєць', value: 'яйця' },
  { id: 'shellfish', label: 'Без морепродуктів', value: 'морепродукти' },
];

export default function DishFilters({
  query,
  onQueryChange,
  excludedAllergens = [],
  onExcludedAllergensChange,
  onReset,
}) {
  return (
    <div className="catalog-filters">

      <fieldset className="allergens-fieldset">
        <legend>Виключити алергени:</legend>
        <div className="allergens-grid">
          {ALLERGENS.map((allergen) => (
            <label key={allergen.id} className="checkbox-field">
              <input
                type="checkbox"
                checked={excludedAllergens.includes(allergen.value)}
                onChange={() => onExcludedAllergensChange(allergen.value)}
              />
              {allergen.label}
            </label>
          ))}
        </div>
      </fieldset>

      <AppButton type="button" variant="secondary" onClick={onReset}>
        Скинути фільтри
      </AppButton>
    </div>
  );
}