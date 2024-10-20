import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/admin.route.js';
import doctorRouter from './routes/doctor.route.js';



//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json()); //to parse the incoming requests with JSON payloads
app.use(cors()); //to enable CORS

//API endpoints
app.use('/api/admin', adminRouter) //localhost:4000/api/admin/
app.use('/api/doctor', doctorRouter) //localhost:4000/api/doctor/


app.get('/', (req, res) => {
    res.send('api working good');
})

app.listen(port,()=>{
    console.log(`listening on localhost:${port}`)
})