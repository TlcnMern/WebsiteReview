const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const config=require('./config/config');

const aclConfig =require('./config/acl-config');

app.use('/dist', express.static('dist'));
app.use(cors());
app.use(bodyParser.json());

const databaseURI=config.mongoUri;
mongoose.connect( databaseURI, _mongo_connected ,{useUnifiedTopology: true});

function _mongo_connected( error) {
    if (error) {
        throw error;
    }
    authorizationSetup();
    console.log("MongoDB database connection established successfully");
}
// mount routes

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

function authorizationSetup() {
    aclConfig.dbConnection(mongoose.connection.db);
    const userRoutes=require('./routes/user.routes');
    const authRouters=require('./routes/auth.routes');
    const postRouters=require('./routes/post.routes');
    const ratingRouters=require('./routes/rating.routes');
    const commentRouters=require('./routes/comment.routes');

    app.use('/', userRoutes);
    app.use('/auth',authRouters);
    app.use('/post',postRouters);
    app.use('/post',commentRouters);
    app.use('/rating',ratingRouters);
}
  