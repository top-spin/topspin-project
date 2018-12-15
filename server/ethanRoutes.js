const {getCurrentUser} = require("./controllers/accountCtrl");
const {editPlayers} = require("./controllers/tournamentCtrl");
const {submitRound,getMatchesForTournament} = require("./controllers/matchCtrl");
const {getMessagesForChat,addMessage,getUsersForChat} = require("./controllers/chatCtrl");


module.exports = app =>{
    app.get("/api/current-user",getCurrentUser);
    app.put("/api/edit-tournament/:id",editPlayers)
    app.post("/api/submit-round",submitRound)
    app.get("/api/started-matches/:id",getMatchesForTournament)
    app.get("/api/messages/:id",getMessagesForChat)
    app.post("/api/add-message",addMessage)
    app.get("/api/chat-users",getUsersForChat)
}