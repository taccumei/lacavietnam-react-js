import React, { useEffect, useReducer } from 'react'
import { getAll } from '../../services/foodService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import Search from '../../components/Search/Search';
import { useParams } from 'react-router-dom';
import { search } from '../../services/foodService';

const initialState = { foods: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED': 
      return { ...state, foods: action.payload }
    default:
      return state;
  }
}


export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods } = state;
  const { searchTerm } = useParams();

  useEffect(() => {
    const loadedFoods = searchTerm ? search(searchTerm) : getAll();
    loadedFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));

  }, [searchTerm]);

  return (
    <div>
      <Search/>
      <Thumbnails foods={foods} />
    </div>
  )
}
