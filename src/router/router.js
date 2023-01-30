import express from 'express';
import cartRouter from '../controllers/cart.js';
import dishRouter from '../controllers/dish.js';
import orderRouter from '../controllers/order.js';
import userRouter from '../controllers/user.js';


const router = express.Router()
router.use('/dishes', dishRouter)
router.use('/carts', cartRouter)
router.use('/users', userRouter)
router.use('/orders', orderRouter)

export default router;