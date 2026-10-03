import Section from "../components/ui/Section";
import MenuList from "../components/MenuList";
import DishFilters from "../components/dishes/DishFilters";
import useDishFilters from "../components/dishes/useDishFilters";
import MenuSummary from "../components/dishes/MenuSummary";

export default function MenuPage({items=[], selectedId, onSelect}) {
  const {
    query,
    setQuery,
    excludedAllergens,
    toggleAllergen,
    resetFilters,
    visibleItems,
  } = useDishFilters(items);

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
          onSelect={onSelect}
          emptyTitle="На жаль, немає страв, що відповідають вашим критеріям."
        />
      </Section>
    </div>
  );
}