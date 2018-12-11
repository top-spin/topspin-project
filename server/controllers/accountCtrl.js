function checkStatus(req,res){
    res.status(200).json(req.session.status)
}
function addUser(req,res){
    const db = req.app.get("db");
    const {username,email,name,dominant_hand,organization,city,state,lat,lng,avatar} = req.body;
    db.topspin_user.insert({
        user_id:req.session.user.id,
        username,
        email,
        name,
        dominant_hand,
        organization,
        city,
        state,
        lat,
        lng,
        avatar
    }).then(newUser=>{
        req.session.user = newUser;
        req.session.status = "loggedIn"
        res.status(200).send(newUser)
    }).catch(console.log)
}
function getInfoForNavbar(req,res){
    res.status(200).json({
        image:req.session.user.avatar,
        username:req.session.user.username
    })
}
function logout(req,res){
    req.session.destroy();
    res.status(200).json("OK")
}
function getCurrentUser(req,res){
    const db = req.app.get("db");
    if(req.session.user){
        db.topspin_user.find({user_id:req.session.user.user_id}).then(user=>{
            req.session.user = user[0]
            res.status(200).json(user[0]);
        })
    }
    else{
        res.status(200).json("No User Logged In!")
    }
}
module.exports = { 
    checkStatus,
    addUser,
    getInfoForNavbar,
    logout,
    getCurrentUser
}