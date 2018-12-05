const {checkStatus, addUser,getInfoForNavbar,logout} = require("./controllers/accountCtrl");
const { profileInfo , searchPlayers , getAllPlayers} = require("./controllers/playerCtrl");
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
}