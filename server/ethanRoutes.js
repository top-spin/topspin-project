const {getCurrentUser} = require("./controllers/accountCtrl");
const {editPlayers} = require("./controllers/tournamentCtrl");
const {submitRound,getMatchesForTournament} = require("./controllers/matchCtrl");


module.exports = app =>{
    app.get("/api/current-user",getCurrentUser);
    app.put("/api/edit-tournament/:id",editPlayers)
    app.post("/api/submit-round",submitRound)
    app.get("/api/started-matches/:id",getMatchesForTournament)
}