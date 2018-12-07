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
function deleteFollowing(req,res){
    const db = req.app.get('db')
    db.query(`
    delete from friend 
    where friend='${req.params.id}' and user_id='${req.session.user.user_id}'   `).then(results=>{
        res.status(200).json(results)
    }).catch(err=>(console.log(err)))
}
function addFollowing(req,res){
    const db = req.app.get("db");
    db.query(`
    insert into friend (user_id, friend)

    values ('${req.session.user.user_id}', '${req.params.id}')  `)
    .catch(console.log)
}
function getFriendCount(req,res){
    const db = req.app.get('db')
    db.query(`
    select count (friend) from friend where user_id = '${req.session.user.user_id}'
          `).then(following => {
    const db = req.app.get('db')
    db.query(`
    select count (user_id) from friend where friend = '${req.session.user.user_id}'
          `).then(followers =>{
    
        res.status(200).json( 
            [+following[0].count, +followers[0].count]
         )
    }).catch(err=>(console.log(err)))
    }).catch(err=>(console.log(err)))

}
module.exports = {
    getAllFollowers,
    getAllFollowing,
    deleteFollowing,
    addFollowing,
    getFriendCount
}