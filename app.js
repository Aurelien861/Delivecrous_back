//configurate the server
import express, { json as _json } from 'express'
import { connect, Schema as _Schema } from "mongoose"
import pkg from 'body-parser';
import router from './src/router/router.js';
const { json } = pkg;
const app = express()

app.use(_json())
app.use(json())
app.use('/', router);
connect("mongodb://localhost:27017/DeliveCrous")


// Ecouter le Serveur
app.listen(3001, () => {
    console.log('Server started at http://localhost:3001')
})
