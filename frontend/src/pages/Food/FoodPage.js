import classes from './foodpage.module.css';
import StarRating from '../../components/StarRating/StarRating';
import Price from '../../components/Price/Price';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/foodService';
import Tags from '../../components/Tags/Tags';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../components/NotFound/NotFound';

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
const {addToCart} = useCart()

  const handleAddToCart = () => {
    addToCart(food);
    navigate('/cart');
  }

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);


  return (
    <>
      {!food ? (<NotFound messages="Food Not Found" linkText="Back To Home Page"/>) : (
    <div className={classes.container}>
      <img className={classes.image} src={`/foods/${food.imageUrl}`} alt={food.name}/>
      <div className={classes.content}>
        <div className={classes.title}>
            <span className={classes.name}>{food.name}</span>
            <span
              className={`${classes.favorite} ${food.favorite ? '' : classes.not}`}>
              ❤
            </span>
        </div>
        <div className={classes.stars}>
          <StarRating stars={food.stars} />
        </div>
        <div className={classes.origins}>
          {
            food.origins?.map(origin => <span key={origin}>{origin}</span>)
          }
        </div>
        <div className={classes.tags}>
          {
            food.tags && <Tags tags={food.tags.map(tag=>({name:tag}))} forFoodPage={true}/>
          }
        </div>
        <div className={classes.cook_time}>
          <span>🕒</span>
          {food.cookTime}
        </div>
        <div className={classes.price}>
          <Price price={food.price}/>
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      </div>
      )}
    </>
  )
}
      
