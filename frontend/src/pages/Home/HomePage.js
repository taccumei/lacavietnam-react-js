import React, { useEffect, useReducer } from 'react'
import { getAll, getAllTags, getAllByTag } from '../../services/foodService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import Search from '../../components/Search/Search';
import { useParams } from 'react-router-dom';
import { search } from '../../services/foodService';
import Tags from '../../components/Tags/Tags';
import FoodPage from '../../components/FoodPage/FoodPage';

const initialState = { foods: [], tags:[] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
}


export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));
    const loadedFoods = tag
      ? getAllByTag(tag)
      : searchTerm
        ? search(searchTerm)
        : getAll();
    loadedFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));

  }, [searchTerm, tag]);

  return (
    <div>
      <Search />
      <Tags  tags={tags} />
      <Thumbnails foods={foods} />
    </div>
  )
}
