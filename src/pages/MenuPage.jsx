import { MENU_ITEMS } from "../data/restaurantData";
import Section from "../components/ui/Section";
import MenuList from "../components/MenuList";
import DishFilters from "../components/dishes/DishFilters";
import useDishFilters from "../components/dishes/useDishFilters";

export default function MenuPage() {
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

        <p>Показано страв: {visibleItems.length}</p>

        <MenuList
          items={visibleItems}
          emptyTitle="На жаль, немає страв, що відповідають вашим критеріям."
        />
      </Section>
    </div>
  );
}