import {useState} from 'react'

export default function useDishFilters(dishes){
    const [query, setQuery] = useState('')
    const [excludeAlergens, setExcludeAlergens] = useState([])

    function toggleAlergen(alergen){
        if(excludeAlergens.includes(alergen)){
            setExcludeAlergens(excludeAlergens.filter(a=>a!==alergen))
        }else{
            setExcludeAlergens([...excludeAlergens, alergen])
        }
    }

    function resetFilters(){
        setQuery('')
        setExcludeAlergens([])
    }

    const filteredDishes = dishes.filter(dish=>{
        const matchesQuery = dish.name.toLowerCase().includes(query.toLowerCase())
        const hasExcludedAlergen = dish.alergens.some(alergen=>excludeAlergens.includes(alergen))
        return matchesQuery && !hasExcludedAlergen
    })

    return {
        query,
        setQuery,
        excludeAlergens,
        toggleAlergen,
        resetFilters,
        filteredDishes
    }
}