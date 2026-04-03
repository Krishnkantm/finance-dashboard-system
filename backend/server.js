require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./src/config/db.js');

const recordRoutes = require('./src/routes/recordRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const dashboardRoutes = require('./src/routes/dashboardRoutes.js');

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/records',recordRoutes);
app.use('/api/users',userRoutes);
app.use('/api/dashboard',dashboardRoutes);

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`server listening...${PORT}`);
})
