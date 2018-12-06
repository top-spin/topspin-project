function getAllFollowing(req,res){
    const db = req.app.get('db')
    db.query(`
    select * from friend f 
    join topspin_user u 
    on  f.friend = u.user_id
    where f.user_id='${req.session.user.user_id}'   
    `).then(results=>{
        res.status(200).json(results)
    }).catch(err=>(console.log(err)))
}
function getAllFollowers(req,res){
    const db = req.app.get('db')
    db.query(`
    select * from friend f
    join topspin_user u
    on  u.user_id = f.user_id
    where f.friend='${req.session.user.user_id}'   `).then(results=>{
        res.status(200).json(results)
    }).catch(err=>(console.log(err)))
}
// function deleteFollowing(req,res){
//     const db = req.app.get('db')
//     db.query(`
//     delete from friend 
//     where friend='${}' and user_id='${req.session.user.user_id}'   `).then(results=>{
//         res.status(200).json(results)
//     }).catch(err=>(console.log(err)))
// }
// function addFollowing(req,res){
//     const db = req.app.get("db");
//      db.friend.insert({
//         user_id:req.session.user.user.id,
//         friend: friends id
//     }) 
//     .catch(console.log)
// }
module.exports = {
    getAllFollowers,
    getAllFollowing
    // deleteFollowing,
    // addFollowing
}