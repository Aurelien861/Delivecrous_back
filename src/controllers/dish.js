import { Dish } from "../db/schema.js";
import express from 'express';


const dishRouter = express.Router();

// add a new dish to database
dishRouter.post("/", (request, response) => {
    const dish = new Dish(request.body);
    dish.save();
    response.status(200).send(dish);
})

// modify a dish
dishRouter.put("/:id", (request, response) => {
    Dish.findById(request.params.id, (err, dish) => {
        if(dish){
            Dish.updateOne({id: request.params.id}, request.body, (err, dish) => {
                response.status(200).send(dish);
            }) 
        }else{
            response.status(204).send({
                message: `Impossible to find dish with id ${request.params.id}`
            })
        }
    })
})

//get the list of dishes in the database
dishRouter.get("/", (request, response) =>
{
    Dish.find({}, (err, dishes) => {
        response.status(200).send(dishes);
    })
})

//get a dish thanks to its id
dishRouter.get("/:id", (request, response) =>
{
    Dish.findById(request.params.id, (err, dish) => {
        if(dish){
            response.status(200).send(dish);
        }else{
            response.status(204).send({
                message: `Impossible to find dish with id ${request.params.id}`
            })
        }
    })
})

//get dishes containing a text in their name or description
dishRouter.get("/:id/:text", (request, response) =>
{
    Dish.find({}, (err, dishes) => {
        if (dishes){
            const matchDishes = dishes.filter((dish) => 
                dish.name.includes(request.params.text) 
                || dish.description.includes(request.params.text))
            response.status(200).send(matchDishes);
        }
    })
})

//remove a dish thanks to its id
dishRouter.delete('/:id', (request, response) => {
    Dish.findById(request.params.id, (err, dish) => {
        if(dish){
            Dish.deleteOne({id: request.params.id}, request.body, (err, dish) => {
                response.status(200).send(dish);
            }) 
        }else{
            response.status(204).send({
                message: `Impossible to find dish with id ${request.params.id}`
            })
        }
    })
})

export default dishRouter;