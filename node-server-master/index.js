const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const MongoDB = require('./mongoDB/connectDB')

MongoDB.connect();

//set static website
app.use(express.static(path.join(__dirname, 'public')));

//set express bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//GET routy pro videa a kategorie
app.use('/video', require('./routes/GET/GetVideos'))
app.use('/category', require('./routes/GET/GetCategory'))

//POST routy pro videa a kategorie
app.use('/video', require('./routes/POST/PostVideos'))
app.use('/category', require('./routes/POST/PostCategories'))

//PUT routy pro videa a kategorie
app.use('/videos', require('./routes/PUT/PutRequests'))

//DELETE routy pro videa a kategorie
app.use('/video', require('./routes/DELETE/DeleteRequests'))



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});