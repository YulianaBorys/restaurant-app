import AppButton from "../ui/AppButton.jsx";
import {useState} from 'react';

const ALLERGEN_LABELS = {
  'глютен': 'глютену',
  'молочні продукти': 'молочних продуктів',
  'яйця': 'яєць',
  'морепродукти': 'морепродуктів',
  'горіхи': 'горіхів',
  'соя': 'сої',
  'риба': 'риби',
};

export default function DishFilters({
  query = '',
  onQueryChange,
  sortBy = 'name-asc',
  onSortChange,
  availableOnly = false,
  onAvailableOnlyChange,
  allergens = [],
  excludedAllergens = [],
  onExcludedAllergensChange,
  onReset,
}) {
  const [allergensOpen, setAllergensOpen] = useState(false);

  return (
    <div className="catalog-filters">
      <label className="checkbox-field" htmlFor="menu-search">
        Пошук у меню
        <input
          id="menu-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Введіть назву страви"
        />
      </label>
      <label className="checkbox-field" htmlFor="menu-sort">
        Сортування
        <select
          id="menu-sort"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="name-asc">Назва: А–Я</option>
          <option value="name-desc">Назва: Я–А</option>
          <option value="price-asc">Ціна: від дешевшої</option>
          <option value="price-desc">Ціна: від дорожчої</option>
        </select>
      </label>
      <label className="checkbox-field">
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(event) => onAvailableOnlyChange(event.target.checked)}
        />
        Лише доступні страви
      </label>
      {allergens.length > 0 && (
        <div className="allergens-filter">
          <AppButton
            type="button"
            variant="secondary"
            aria-expanded={allergensOpen}
            aria-controls="menu-allergens"
            onClick={() => setAllergensOpen((open) => !open)}
          >
            {allergensOpen ? 'Сховати алергени' : `Показати алергени (${allergens.length})`}
          </AppButton>
          {allergensOpen && (
            <fieldset id="menu-allergens" className="allergens-fieldset">
              <legend>Не показувати страви з:</legend>
              <div className="allergens-grid">
                {allergens.map((allergen) => (
                  <label key={allergen} className="checkbox-field">
                    <input
                      type="checkbox"
                      checked={excludedAllergens.includes(allergen)}
                      onChange={() => onExcludedAllergensChange(allergen)}
                    />
                    {`Без ${ALLERGEN_LABELS[allergen] ?? allergen}`}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
        </div>
      )}

      <AppButton type="button" variant="secondary" onClick={onReset}>
        Скинути фільтри
      </AppButton>
    </div>
  );
}