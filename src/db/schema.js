import mongoose from "mongoose"
mongoose.connect("mongodb://localhost:27017/DeliveCrous")

const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: String,
    description: String,
    allergens: [String]
})
export const Dish = mongoose.model('Dish', dishSchema);


const cartSchema = new Schema({
    dishId: String,
    price: {
        type: Number,
        min: 0
    },
    image: String
})
export const Cart = mongoose.model('Cart', cartSchema);


const userSchema = new Schema({
    token: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})
export const User = mongoose.model('User', userSchema);

const orderSchema = new Schema({
    cartsId: [String],
    userId: String,
    address: String,
    state: {
        type: String,
        enum: ['pending', 'ordered', 'received', 'cancelled']
    }
})
export const Order = mongoose.model('Order', orderSchema);
