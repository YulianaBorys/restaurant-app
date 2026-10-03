import Section from "../components/ui/Section";
import MenuList from "../components/MenuList";
import DishFilters from "../components/dishes/DishFilters";
import useDishFilters from "../components/dishes/useDishFilters";
import MenuSummary from "../components/dishes/MenuSummary";

import {useDishSelection} from '../context/DishSelectionContext';
import {MENU_ITEMS} from '../data/restaurantData';

export default function MenuPage() {

  const { selectedId, selectDish } = useDishSelection();

  const {
    query,
    setQuery,
    excludedAllergens,
    toggleAllergen,
    resetFilters,
    visibleItems,
  } = useDishFilters(MENU_ITEMS);

  return (
    <div className="menu-page">

      <Section id="catalog">
        <DishFilters
          query={query}
          onQueryChange={setQuery}
          excludedAllergens={excludedAllergens}
          onExcludedAllergensChange={toggleAllergen}
          onReset={resetFilters}
        />

        <MenuSummary count={visibleItems.length} />

        <MenuList
          items={visibleItems}
          selectedId={selectedId}
          onSelect={selectDish}
          emptyTitle="На жаль, немає страв, що відповідають вашим критеріям."
        />
      </Section>
    </div>
  );
}