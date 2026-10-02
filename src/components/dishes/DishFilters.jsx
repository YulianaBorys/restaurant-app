import {MENU_ITEMS} from "../../data/restaurantData";
import {useState} from "react";
import FormField from "../ui/FormField";
import AppButton from "../ui/AppButton";

const ALLERGENS=[
    { id: 'gluten', label: 'Без глютену', value: "глютен" },
    { id: 'dairy', label: 'Без молочних продуктів', value: "молочні продукти" },
    { id: 'eggs', label: 'Без яєць', value: "яйця" }
]

export default function DishFilters({query, onQueryChange, excludeAlergens, onExcludeAlergensChange, onReset}) {
    return(
        <FormField id='dish-filters' label='Фільтри'>
            <input type='text' id='dish-filters' value={query} onChange={(e)=>onQueryChange(e.target.value)} placeholder="Пошук страви..." />

            <fieldset>
                <legend>Виключити алергени:</legend>
                {ALLERGENS.map((alergen)=>(
                    <label key={alergen.id}>
                        <input type='checkbox' checked={excludeAlergens.includes(alergen.value)} onChange={(e)=>{
                            if(e.target.checked){
                                onExcludeAlergensChange([...excludeAlergens, alergen.value])
                            }else{
                                onExcludeAlergensChange(excludeAlergens.filter(a=>a!==alergen.value))
                            }
                        }} />
                        {alergen.label}
                    </label>
                ))}
            </fieldset>

            <AppButton type='button' onClick={onReset}>
                Скинути фільтри
            </AppButton>
        </FormField>
    )
}