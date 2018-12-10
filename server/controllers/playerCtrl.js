function profileInfo(req,res){
    const db = req.app.get('db')
    db.query(`
    select * from (
        select row_number() over(order by rating desc) as rank,  * from topspin_user 
        order by rating desc
        ) as ur
        where ur.username = '${req.params.username}';
    `).then(user=>{
        // res.status(200).json(user)
        
        db.query(`
        select count(m.match_id) from topspin_user u
            join match m
            on m.match_winner = u.user_id
            where u.user_id = '${user[0].user_id}';
        `).then(winCount=>{
            db.query(`
            select count(m.match_id) from topspin_user u
            join match m
            on m.match_loser = u.user_id
            where u.user_id = '${user[0].user_id}';
            `).then(lossCount=>{
                // res.status(200).json(winCount[0].count+lossCount[0].count)
                res.status(200).json({
                    user:user[0],
                    winCount:winCount[0].count,
                    winPercent:winCount[0].count*100/(+winCount[0].count+(+lossCount[0].count)),
                    rank:user[0].rank
                })
                
            }).catch(console.log())
        }).catch(console.log())
    }).catch(console.log())
}
function searchPlayers(req,res){
    const db = req.app.get('db')
    db.query(`
    select * from (
        select row_number() over(order by rating desc) as rank,  * from topspin_user 
        order by rating desc
        ) as ur
        where upper(ur.username) like '%${req.query.value.toUpperCase()}%' or
        upper(ur.name) like '%${req.query.value.toUpperCase()}%' or upper(email) like '%${req.query.value.toUpperCase()}%' or
        upper(ur.organization) like '%${req.query.value.toUpperCase()}%';
    `).then(results=>{
        res.status(200).json(results)
    }).catch(err=>(console.log(err)))
}
function getAllPlayers(req,res){
    const db = req.app.get('db')
    db.query(`
    select row_number() over(order by rating desc) as rank,  * from 
        topspin_user order by rating desc;
    `).then(results=>{
        res.status(200).json(results)
    }).catch(err=>(console.log(err)))
}
module.exports = {
    profileInfo,
    searchPlayers,
    getAllPlayers
}