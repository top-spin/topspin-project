require("dotenv").config();
const express = require("express");
const {json} = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const masterRoutes = require("./masterRoutes");
const ethanRoutes = require("./ethanRoutes");
const session = require('express-session');
const authCtrl = require("./controllers/authCtrl");
const path = require("path");
const sockets = require("./services/ssl_sockets_server");

var app = express();

app.use(json());
app.use(cors());
app.use(session({ 
    secret:process.env.SESSION_SECRET,
    saveUninitialized:true,
    resave:false
}))

app.use( express.static( `${__dirname}/../dist/` ) );

massive(process.env.CONNECTION_STRING).then(dbInstance=>{
    app.set("db",dbInstance)
}).catch(err=>console.log(err));

sockets(app);
masterRoutes(app);
ethanRoutes(app);
authCtrl(app);

// var port = process.env.PORT || 3999;
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
var port = 4000
app.listen(port,()=>{
    console.log("Listening on port: "+port);
})