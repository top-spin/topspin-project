const {getCurrentUser} = require("./controllers/accountCtrl");
const {editPlayers} = require("./controllers/tournamentCtrl");
const {submitRound} = require("./controllers/matchCtrl");


module.exports = app =>{
    app.get("/api/current-user",getCurrentUser);
    app.put("/api/edit-tournament/:id",editPlayers)
    app.post("/api/submit-round",submitRound)
}