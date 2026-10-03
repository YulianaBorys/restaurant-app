import { useState } from 'react'

export default function useDishFilters(items = []) {
  const [query, setQuery] = useState('')
  const [excludedAllergens, setExcludedAllergens] = useState([])

  // Перемикач виключення конкретного алергену
  function toggleAllergen(allergenValue) {
    setExcludedAllergens((previous) =>
      previous.includes(allergenValue)
        ? previous.filter((item) => item !== allergenValue)
        : [...previous, allergenValue]
    )
  }

  // Скидання всіх фільтрів
  function resetFilters() {
    setQuery('')
    setExcludedAllergens([])
  }

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  // Похідний список visibleItems — обчислюється під час рендеру без дублювання стану
  const visibleItems = items.filter((dish) => {
    const matchesQuery = dish.name.toLocaleLowerCase('uk').includes(normalizedQuery)
    const hasExcludedAllergen = dish.alergens?.some((allergen) =>
      excludedAllergens.includes(allergen)
    )
    return matchesQuery && !hasExcludedAllergen
  })

  return {
    setQuery,
    excludedAllergens,
    toggleAllergen,
    visibleItems,
    resetFilters,
  }
}