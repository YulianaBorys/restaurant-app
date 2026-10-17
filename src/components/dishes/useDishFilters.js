import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function useDishFilters(items = []) {
  const [searchParams, setSearchParams] = useSearchParams()

  // 1. Читання параметрів із URL
  const query = searchParams.get('q') ?? ''
  const availableOnly = searchParams.get('available') === '1'

  // 2. Локальний стан для виключених алергенів
  const [excludedAllergens, setExcludedAllergens] = useState([])

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  // 3. Єдине обчислення похідного списку visibleItems під час рендеру
  const visibleItems = items.filter((dish) => {
    // Перевірка за назвою
    const matchesQuery = dish.name.toLocaleLowerCase('uk').includes(normalizedQuery)

    // Перевірка прапорця "Лише для доставки"
    const matchesAvailability = !availableOnly || dish.available

    // Перевірка на відсутність виключених алергенів
    const hasExcludedAllergen = dish.allergens?.some((allergen) =>
      excludedAllergens.includes(allergen)
    )

    return matchesQuery && matchesAvailability && !hasExcludedAllergen
  })

  // 4. Функції оновлення фільтрів у URL
  function setQuery(value) {
    const next = new URLSearchParams(searchParams)
    if (value === '') {
      next.delete('q')
    } else {
      next.set('q', value)
    }
    setSearchParams(next, { replace: true })
  }

  function setAvailableOnly(value) {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set('available', '1')
    } else {
      next.delete('available')
    }
    setSearchParams(next)
  }

  // Перемикач виключення конкретного алергену
  function toggleAllergen(allergenValue) {
    setExcludedAllergens((previous) =>
      previous.includes(allergenValue)
        ? previous.filter((item) => item !== allergenValue)
        : [...previous, allergenValue]
    )
  }

  // Скидання всіх фільтрів (і з URL, і з стану алергенів)
  function resetFilters() {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    next.delete('available')
    setSearchParams(next)
    setExcludedAllergens([])
  }

  return {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    excludedAllergens,
    toggleAllergen,
    visibleItems,
    resetFilters,
  }
}