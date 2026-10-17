import {useContext} from 'react'
import DishSelectionContext from '../context/dishSelectionContext'

export default function useDishSelection(){
    const selection =useContext(DishSelectionContext)
    if(!selection){
        throw new Error('useDishSelection must be used within DishSelectionProvider')
    }
    return selection
}