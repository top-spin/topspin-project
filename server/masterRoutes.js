const {checkStatus, addUser,getInfoForNavbar} = require("./controllers/accountCtrl");
module.exports = app =>{
    app.get("/api/test",(req,res)=>{
        res.status(200).json(req.session)
    })
    app.get("/api/status",checkStatus)
    app.post("/api/user",addUser)
    app.get("/api/navbar-info",getInfoForNavbar)
}