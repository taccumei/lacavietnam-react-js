import classes from './foodpage.module.css';
import StarRating from '../StarRating/StarRating';
import Price from '../Price/Price';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../../services/foodService';

export default function FoodPage() {
  const [food, setFood] = useState({});
  const {id} = useParams();

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);
  console.log(food.name);


  return (
    <>
    {food && (
    <div className={classes.container}>
          <img className={classes.image} src={`/foods/${food.imageUrl}`} alt={food.name} />
      <div className={classes.content}>
        <div className={classes.title}>
            <div className={classes.name}>{food.name}</div>
            <span
              className={`${classes.favorite} ${food.favorite ? '' : classes.not}`}>
              ❤
          </span>
        </div>
        <div className={classes.stars}>
          <StarRating stars={food.stars} />
        </div>
        {/* <div className={classes.origins}>
          {food.origins.map(origin=>(
          <span key={origin}>{origin}</span>))}
        </div> */}
        <div className={classes.cook_time}>
          <span>🕒</span>
          {food.cookTime}
        </div>
        <div className={classes.price}>
          <Price price={food.price}/>
        </div>
      </div>
      </div>
      )}
    </>
  )
}
      
