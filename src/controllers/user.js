import { User, Cart } from "../db/schema.js";
import express from 'express';
import jwt from 'jsonwebtoken';


const userRouter = express.Router();

function generateAccessToken(email) {
    return jwt.sign(email, '09f26e402586e2faa8da4c98a35f1b20d6b033c60');
}


// add a new user to database
userRouter.post("/", (request, response) => {
    const token = generateAccessToken(request.body.email)
    const user = new User({
        ...request.body,
        token: token
    });
    user.save();
    response.status(200).send(user);
})

// modify a user
userRouter.put("/:id", (request, response) => {
    User.findById(request.params.id, (err, user) => {
        if(user){
            User.updateOne({id: request.params.id}, request.body, (err, user) => {
                response.status(200).send(user);
            }) 
        }else{
            response.status(204).send({
                message: `Impossible to find user with id ${request.params.id}`
            })
        }
    })
})

//get the list of users in the database
userRouter.get("/", (request, response) =>
{
    User.find({}, (err, users) => {
        response.status(200).send(users);
    })
})

//get a user thanks to its id
userRouter.get("/:id", (request, response) =>
{
    User.findById(request.params.id, (err, user) => {
        if(user){
            response.status(200).send(user);
        }else{
            response.status(204).send({
                message: `Impossible to find user with id ${request.params.id}`
            })
        }
    })
})


//remove a user thanks to its id
userRouter.delete('/:id', (request, response) => {
    User.findById(request.params.id, (err, user) => {
        if(user){
            User.deleteOne({id: request.params.id}, request.body, (err, user) => {
                response.status(200).send(user);
            }) 
        }else{
            response.status(204).send({
                message: `Impossible to find user with id ${request.params.id}`
            })
        }
    })
})

export default userRouter;