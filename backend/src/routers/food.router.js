import { Router } from "express";
import { FoodModel } from "../Models/food.model.js";
import handler from 'express-async-handler';
import admin from "../middleware/admin.mid.js";
// import { sample_foods, sample_tags } from "../data.js";

const router = Router();

router.get('/', handler(async (req, res) => {
  const foods = await FoodModel.find({});
  res.send(foods);
})
);

// router.get('/tags', (req, res) => {
//   res.send(sample_tags);
// })

router.post(
  '/',
  admin,
  handler(async (req, res) => {
    const { name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    const food = new FoodModel({
      name,
      price,
      tags: tags.split ? tags.split(',') : tags,
      favorite,
      imageUrl,
      origins: origins.split ? origins.split(',') : origins,
      cookTime,
    });

    await food.save();
    res.send(food);
  })
);

router.put('/', admin, handler(async (req, res) => {
  const { id, name, price, tags, favorite, imageUrl, origins, cookTime } = req.body;

  await FoodModel.updateOne(
    { _id: id },
    {
      name,
      price,
      tags: tags.split? tags.split(',') : tags,
      favorite,
      imageUrl,
      origins: origins.split? origins.split(','): origins,
      cookTime
    }
  );
  res.send();
}))


router.delete(
  '/:foodId',
  admin,
  handler(async (req, res) => {
    const { foodId } = req.params;
    await FoodModel.deleteOne({ _id: foodId });
    res.send();
  })
);
  
router.get('/tags', handler(async (req, res) => {
  const tags = await FoodModel.aggregate([
    {
      $unwind: '$tags',
    },
    {
      $group: {
        _id: '$tags',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        count: '$count',
      },
    },
  ]).sort({ count: -1 });
  
  const all = {
    name: 'All',
    count: await FoodModel.countDocuments(),
  };

  tags.unshift(all);//add items to the beginning of the array

  res.send(tags);
}));

// router.get('/search/:searchTerm', (req, res) => {
//   const { searchTerm } = req.params;
  
//   const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   res.send(foods);
// })
router.get('/search/:searchTerm',
  handler(async (req, res) => {
  const { searchTerm } = req.params;
  const searchRegex = new RegExp(searchTerm, 'i');//case insensitive

  const foods = await FoodModel.find({ name: { $regex: searchRegex } });
  res.send(foods);
}));

// router.get('/tag/:tag', (req, res) => {
//   const { tag } = req.params;
//   const foods = sample_foods.filter(item => item.tags?.includes(tag));
//   res.send(foods);
// })
router.get('/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
  }));

// router.get('/:foodId', (req, res) => {
//   const {foodId} = req.params;

//   const food = sample_foods.find(item => item.id === foodId);

//   res.send(food);
// })

// router.get('/', (req, res) => {
//   res.send(sample_foods);
// })
router.get('/:foodId',
  handler(async(req, res) => {
  const { foodId } = req.params;
  const food = await FoodModel.findById(foodId);
  res.send(food);
}))

export default router;
