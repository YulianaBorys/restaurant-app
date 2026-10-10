import { useSearchParams, useSearchParams } from "react-router-dom"

export default function useDishFilters(items) {
  const [searchParams, setSearchParams]=useSearchParams()

  const query = searchParams.get('q') ?? ''
  const availableOnly=searchParams.get('available') === '1'

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  const visibleItems=items.filter((item)=>(
    item.name.toLocaleLowerCase('uk').includes(normalizedQuery) &&
    (!availableOnly || item.availableForDelivery)
  ))
  
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