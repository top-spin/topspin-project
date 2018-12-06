function getMatchWinner(req,res){
    const db = req.app.get('db')
    db.query(`
    select * from topspin_user p 
    join match m on p.user_id = m.match_winner order by match_id desc limit 3
    `).then(results=>{
        res.status(200).json(results)
    }).catch(err=>(console.log(err)))
}
function getMatchLoser(req,res){
    const db = req.app.get('db')
    db.query(`
    select * from topspin_user p 
join match m on p.user_id = m.match_loser order by match_id desc limit 3   `).then(results=>{
        res.status(200).json(results)
    }).catch(err=>(console.log(err)))
}