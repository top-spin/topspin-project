const {checkStatus, addUser,getInfoForNavbar,logout} = require("./controllers/accountCtrl");
const { profileInfo , searchPlayers , getAllPlayers} = require("./controllers/playerCtrl");
const { pastTournament , upcomingTournament , tournamentMatches} = require("./controllers/tournamentCtrl");
const { getAllFollowers, getAllFollowing} = require("./controllers/friendCtrl")
module.exports = app =>{
    app.get("/api/test",(req,res)=>{
        res.status(200).json(req.session)
    })
    app.get("/api/status",checkStatus)
    app.post("/api/user",addUser)
    app.get("/api/navbar-info",getInfoForNavbar)
    app.delete("/api/logout",logout);
    app.get("/api/profile/:username",profileInfo)
    app.get("/api/players",searchPlayers);
    app.get("/api/all-players",getAllPlayers)
    app.get("/api/past-tournaments",pastTournament)
    app.get("/api/upcoming-tournaments",upcomingTournament)
    app.get("/api/tournament-matches/:id",tournamentMatches)
    app.get("/api/followers",getAllFollowers)
    app.get("/api/following",getAllFollowing)
    // app.post("/api/friend",addFollowing)
}