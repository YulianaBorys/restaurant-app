import { useSearchParams } from 'react-router-dom'

export default function useDishFilters(items = []) {
  const [searchParams, setSearchParams] = useSearchParams()

  const section = searchParams.get('section') || 'dishes'
  const query = searchParams.get('q') || ''
  const availableOnly = searchParams.get('available') === '1'
  const sortBy = searchParams.get('sort') || 'name-asc'
  const excludedAllergens = (searchParams.get('allergens') || '').split(',').filter(Boolean)

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  const visibleItems = items
    .filter((dish) => {
      const searchableText = `${dish.name} ${dish.category} ${dish.description}`.toLocaleLowerCase('uk')
      const matchesSection = dish.section === section
      const matchesQuery = searchableText.includes(normalizedQuery)
      const matchesAvailability = !availableOnly || dish.available
      const hasExcludedAllergen = dish.allergens?.some((allergen) =>
        excludedAllergens.includes(allergen)
      )

      return matchesSection && matchesQuery && matchesAvailability && !hasExcludedAllergen
    })
    .sort((first, second) => {
      if (sortBy === 'price-asc') return first.price - second.price
      if (sortBy === 'price-desc') return second.price - first.price
      if (sortBy === 'name-desc') return second.name.localeCompare(first.name, 'uk')
      return first.name.localeCompare(second.name, 'uk')
    })

  function updateParam(key, value, {replace = false} = {}) {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    setSearchParams(next, {replace})
  }

  function setSection(nextSection) {
    const next = new URLSearchParams(searchParams)
    next.set('section', nextSection)
    next.delete('q')
    next.delete('allergens')
    setSearchParams(next)
  }

  function setQuery(value) {
    updateParam('q', value, {replace: true})
  }

  function setSortBy(value) {
    updateParam('sort', value === 'name-asc' ? '' : value)
  }

  function setAvailableOnly(value) {
    updateParam('available', value ? '1' : '')
  }

  function toggleAllergen(allergenValue) {
    const nextAllergens = excludedAllergens.includes(allergenValue)
      ? excludedAllergens.filter((item) => item !== allergenValue)
      : [...excludedAllergens, allergenValue]
    updateParam('allergens', nextAllergens.join(','))
  }

  function resetFilters() {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    next.delete('available')
    next.delete('allergens')
    next.delete('sort')
    setSearchParams(next)
  }

  return {
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
    visibleItems,
    resetFilters,
  }
}