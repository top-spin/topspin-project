function checkStatus(req,res){
    res.status(200).json(req.session.status)
}
function addUser(req,res){
    const db = req.app.get("db");
    const {username,email,name,dominant_hand,organization,city,state,lat,lng,avatar} = req.body;
    db.topspin_user.insert({
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
        res.status(200).send(newUser)
    }).catch(console.log)
}
module.exports = {
    checkStatus,
    addUser
}