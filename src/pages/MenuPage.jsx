import {useEffect, useState} from 'react';
import Section from "../components/ui/Section";
import MenuList from "../components/MenuList";
import DishFilters from "../components/dishes/DishFilters";
import useDishFilters from "../components/dishes/useDishFilters";
import MenuSummary from "../components/dishes/MenuSummary";
import EmptyState from '../components/ui/EmptyState'
import AppButton from '../components/ui/AppButton'

import useDishSelection from '../hooks/useDishSelection';
import {MENU_ITEMS} from '../data/restaurantData';

const SECTIONS = [
  {id: 'dishes', label: 'Страви'},
  {id: 'drinks', label: 'Напої'},
  {id: 'hookah', label: 'Кальян'},
];

export default function MenuPage() {
  const [scrollNavVisible, setScrollNavVisible] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState('');

  const { selectedId, selectDish } = useDishSelection();

  const {
    section,
    setSection,
    query,
    setQuery,
    sortBy,
    setSortBy,
    availableOnly,
    setAvailableOnly,
    excludedAllergens,
    toggleAllergen,
    resetFilters,
    visibleItems,
  } = useDishFilters(MENU_ITEMS);

  const sectionItems = MENU_ITEMS.filter((item) => item.section === section);
  const sectionAllergens = [...new Set(
    sectionItems.flatMap((item) => item.allergens ?? [])
  )].sort((first, second) => first.localeCompare(second, 'uk'));
  const categories = [...new Set(visibleItems.map((item) => item.category))];
  const categoriesKey = categories.join('|');
  const activeCategoryIsVisible = categories.some((_, index) =>
    `menu-category-${index}` === activeCategoryId
  );
  const currentActiveCategoryId = activeCategoryIsVisible
    ? activeCategoryId
    : categories.length > 0 ? 'menu-category-0' : '';

  useEffect(() => {
    let previousScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 120) {
        setScrollNavVisible(false);
      } else if (currentScrollY < previousScrollY - 4) {
        setScrollNavVisible(true);
      } else if (currentScrollY > previousScrollY + 4) {
        setScrollNavVisible(false);
      }
      previousScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const categoryNames = categoriesKey ? categoriesKey.split('|') : [];
    const categoryIds = categoryNames.map((_, index) => `menu-category-${index}`);

    if (!('IntersectionObserver' in window) || categoryIds.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const firstVisible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

      if (firstVisible) setActiveCategoryId(firstVisible.target.id);
    }, {rootMargin: '-120px 0px -65% 0px'});

    categoryIds.forEach((id) => {
      const categoryElement = document.getElementById(id);
      if (categoryElement) observer.observe(categoryElement);
    });

    return () => observer.disconnect();
  }, [categoriesKey]);

  function handleSectionChange(nextSection) {
    setSection(nextSection);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  
  return (
    <div className="menu-page">
      <nav
        className={`menu-scroll-nav${scrollNavVisible ? ' is-visible' : ''}`}
        aria-label="Швидка навігація меню"
        aria-hidden={!scrollNavVisible}
        inert={!scrollNavVisible}
      >
        <div className="menu-scroll-nav-inner">
          <div className="menu-scroll-sections" aria-label="Розділи меню">
            {SECTIONS.map((item) => (
              <AppButton
                key={item.id}
                type="button"
                variant={section === item.id ? 'primary' : 'secondary'}
                aria-pressed={section === item.id}
                onClick={() => handleSectionChange(item.id)}
              >
                {item.label}
              </AppButton>
            ))}
          </div>
          {categories.length > 0 && (
            <div className="menu-scroll-categories" aria-label="Категорії активного розділу">
              {categories.map((category, index) => {
                const categoryId = `menu-category-${index}`;
                return (
                  <a
                    key={category}
                    href={`#${categoryId}`}
                    className={currentActiveCategoryId === categoryId ? 'is-active' : ''}
                    aria-current={currentActiveCategoryId === categoryId ? 'location' : undefined}
                  >
                    {category}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      <Section id="catalog">
        <div className='section-tabs'>
          {SECTIONS.map((item) => (
            <AppButton
              key={item.id}
              type="button"
              variant={section === item.id ? 'primary' : 'secondary'}
              aria-pressed={section === item.id}
              onClick={() => handleSectionChange(item.id)}
            >
              {item.label}
            </AppButton>
          ))}
        </div>

        <DishFilters
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          availableOnly={availableOnly}
          onAvailableOnlyChange={setAvailableOnly}
          allergens={sectionAllergens}
          excludedAllergens={excludedAllergens}
          onExcludedAllergensChange={toggleAllergen}
          onReset={resetFilters}
        />

        <MenuSummary count={visibleItems.length} />

        {sectionItems.length === 0 ? (
          <EmptyState title="У цьому розділі поки немає позицій">
            <p>Оберіть інший розділ меню.</p>
          </EmptyState>
        ) : visibleItems.length === 0 ? (
          <EmptyState title="За цими параметрами нічого не знайдено">
            <p>Змініть пошук або фільтри, щоб побачити позиції.</p>
            <AppButton type="button" variant="secondary" onClick={resetFilters}>
              Скинути фільтри
            </AppButton>
          </EmptyState>
        ) : (
          <>
            <nav className="anchor-nav" aria-label="Категорії меню">
              {categories.map((category, index) => (
                <a key={category} href={`#menu-category-${index}`}>
                  {category}
                </a>
              ))}
            </nav>
            {categories.map((category, index) => (
              <section
                key={category}
                id={`menu-category-${index}`}
                className={`menu-category-section${currentActiveCategoryId === `menu-category-${index}` ? ' is-active' : ''}`}
              >
                <h2>{category}</h2>
                <MenuList
                  items={visibleItems.filter((item) => item.category === category)}
                  selectedId={selectedId}
                  onSelect={selectDish}
                />
              </section>
            ))}
          </>
        )}
      </Section>
    </div>
  );
}