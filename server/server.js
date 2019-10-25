const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const config=require('./config/config');

const userRoutes=require('./routes/user.routes');
const authRouters=require('./routes/auth.routes');
const postRouters=require('./routes/post.routes');

app.use(cors());
app.use(bodyParser.json());

// mount routes
app.use('/', userRoutes);
app.use('/auth',authRouters);
app.use('/post',postRouters);


const db=config.mongoUri;
mongoose.connect(db, { useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});