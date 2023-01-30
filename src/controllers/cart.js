import { Cart, Dish } from "../db/schema.js";
import express from 'express';


const cartRouter = express.Router();

// add a new cart to database
cartRouter.post("/", (request, response) => {
    Dish.findById(request.body.dishId, (err, dish) => {
        if(dish){
            const cart = new Cart(request.body);
            cart.save();
            response.status(200).send(cart);
        }else{
            response.status(204).send({
                message: `Impossible to find dish with id ${request.body.dishId}`
            })
        }
    }) 
})

// modify a cart
cartRouter.put("/:id", (request, response) => {
    Dish.findById(request.body.dishId, (err, dish) => {
        if(dish){
            Cart.findById(request.params.id, (err, cart) => {
                if(cart){
                    Cart.updateOne({id: request.params.id}, request.body, (err, cart) => {
                        response.status(200).send(cart);
                    }) 
                }else{
                    response.status(204).send({
                        message: `Impossible to find dish with id ${request.params.id}`
                    })
                }
            })
        }else{
            response.status(204).send({
                message: `Impossible to find dish with id ${request.body.dishId}`
            })
        }
    }) 
    
})

//get the list of carts in the database
cartRouter.get("/", (request, response) =>
{
    Cart.find({}, (err, carts) => {
        response.status(200).send(carts);
    })
})

//get a cart thanks to its id
cartRouter.get("/:id", (request, response) =>
{
    Cart.findById(request.params.id, (err, cart) => {
        if(cart){
            response.status(200).send(cart);
        }else{
            response.status(204).send({
                message: `Impossible to find cart with id ${request.params.id}`
            })
        }
    })
})

//remove a cart thanks to its id
cartRouter.delete('/:id', (request, response) => {
    Cart.findById(request.params.id, (err, cart) => {
        if(cart){
            Cart.deleteOne({id: request.params.id}, request.body, (err, cart) => {
                response.status(200).send(cart);
            }) 
        }else{
            response.status(204).send({
                message: `Impossible to find dish with id ${request.params.id}`
            })
        }
    })
})

export default cartRouter;