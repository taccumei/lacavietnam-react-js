import express from 'express';
import cors from 'cors';
import foodRouter from './routers/food.router.js'

const app = express();


app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));
// http://localhost:6000/api/foods/
app.use('/api/foods', foodRouter);
const PORT = 4000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
})
