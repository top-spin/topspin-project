const {getCurrentUser} = require("./controllers/accountCtrl");


module.exports = app =>{
    app.get("/api/current-user",getCurrentUser);
}