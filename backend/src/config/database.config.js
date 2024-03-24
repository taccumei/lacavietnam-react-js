import { connect, set } from 'mongoose';
import { sample_foods, sample_users } from '../data.js';
import { UserModel } from '../Models/user.model.js';
import { FoodModel } from '../Models/food.model.js';
import bcrypt from 'bcryptjs';

const PASSWORD_HASH_SALT_ROUNDS = 10;

set('strictQuery', true);

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedUsers();
    await seedFoods();
    console.log('connect sucessfully---');
  } catch (error) {
    console.log(error);
  }
}

async function seedUsers() {
  const userCount = await UserModel.countDocuments();
  if (userCount > 0) {
    console.log('Users seed is aldready done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }
  console.log('Users seed is done!');
}

async function seedFoods() {
  const foods = await FoodModel.countDocuments();
  if (foods > 0) {
    console.log('Foods seed is already done!');
    return;
  }

  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }

  console.log('Foods seed is done!');
}