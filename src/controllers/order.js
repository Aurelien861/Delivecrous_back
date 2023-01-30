import { Order, Cart } from "../db/schema.js";
import express from 'express';


const orderRouter = express.Router();


// add a new order to database
orderRouter.post("/", async (request, response) => {
    const order = new Order({
        ...request.body,
        state: "pending"
    });
    order.save();
    response.status(200).send(order);
    
})

// validate an order
orderRouter.post("/", (request, response) => {
    Order.findById(request.params.id, (err, order) => {
        if(order){
            const userAddress = request.body.address;
            if(userAddress){
                const validatedOrder = new Order({
                    cartsId: order.cartsId,
                    address: userAddress,
                    state: "ordered"
                })
                Order.updateOne({id: request.params.id}, validatedOrder, (err, order) => {
                    response.status(200).send(order);
                }) 
            }else{
                response.status(422).send({
                    message: `You must give an address`
                })
            }
        }else{
            response.status(204).send({
                message: `Impossible to find order with id ${request.params.id}`
            })
        }
    })
   
    
})

// modify a order
orderRouter.put("/:id", (request, response) => {
    Order.findById(request.params.id, (err, order) => {
        if(order){
            Order.updateOne({id: request.params.id}, request.body, (err, order) => {
                response.status(200).send(order);
            }) 
        }else{
            response.status(204).send({
                message: `Impossible to find order with id ${request.params.id}`
             })
        }
     })
})

//get the list of orders in the database
orderRouter.get("/", (request, response) =>
{
    Order.find({}, (err, orders) => {
        response.status(200).send(orders);
    })
})

//get a order thanks to its id
orderRouter.get("/:id", (request, response) =>
{
    Order.findById(request.params.id, (err, order) => {
        if(order){
            Order.deleteOne({id: request.params.id}, request.body, (err, order) => {
                response.status(200).send(order);
            }) 
        }else{
            response.status(204).send({
                message: `Impossible to find order with id ${request.params.id}`
            })
        }
    })
})


//remove a order thanks to its id
orderRouter.delete('/:id', (request, response) => {
    const order = order.findById(request.params.id);
    Order.deleteOne(order, (err, order) => {
        if(order){
            response.status(200).send(order);
        }else{
            response.status(204).send({
                message: `Impossible to find order with id ${request.params.id}`
            })
        }
    })
})

export default orderRouter;