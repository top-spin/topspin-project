const {getCurrentUser} = require("./controllers/accountCtrl");
const {editPlayers} = require("./controllers/tournamentCtrl");


module.exports = app =>{
    app.get("/api/current-user",getCurrentUser);
    app.put("/api/edit-tournament",editPlayers)
}