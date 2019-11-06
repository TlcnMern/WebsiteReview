const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const config=require('./config/config');

// const socketOps = require('./config/socketOps');
// const socket = require('socket.io');

const aclConfig =require('./config/acl-config');
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
// let io = socket(server);
// socketOps.allSocketOps(io)


function authorizationSetup() {
    aclConfig.dbConnection(mongoose.connection.db);
    const userRoutes=require('./routes/user.routes');
    const authRouters=require('./routes/auth.routes');
    const postRouters=require('./routes/post.routes');
    app.use('/', userRoutes);
    app.use('/auth',authRouters);
    app.use('/post',postRouters);
}
  