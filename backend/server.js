import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongoDB.js';

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

//middlewares
app.use(express.json()); //to parse the incoming requests with JSON payloads
app.use(cors()); //to enable CORS

//API endpoints
app.get('/', (req, res) => {
    res.send('api working good');
})

app.listen(port,()=>{
    console.log(`listening on localhost:${port}`)
})