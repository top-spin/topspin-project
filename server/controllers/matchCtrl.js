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
function getMyMatches(req,res){
    const db = req.app.get('db');
    db.query(`
    select * from match m
        where m.match_winner = '${req.session.user.user_id}'
        or m.match_loser = '${req.session.user.user_id}'
        order by match_id desc;
    `).then(matches=>{
        db.query(`
        select * from topspin_user
        `).then(players=>{
            let response = matches.map((obj,i)=>{
                return {
                  match_id:obj.match_id,
                  tournament_id:obj.tournament_id,
                  winning_score:obj.winning_score,
                  losing_score:obj.losing_score,
                  match_winner:players.filter(e=>{
                    // console.log(e)
                    if(e.user_id===obj.match_winner){
                      return true
                    }
                    else{
                      return false
                    }
                  })[0],
                  match_loser:players.filter(e=>{
                    // console.log(e)
                    if(e.user_id===obj.match_loser){
                      return true
                    }
                    else{
                      return false
                    }
                  })[0],
                  round:obj.round
                }
              })
            res.status(200).json(response)
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
}
module.exports = {
    getMatchLoser,
    getMatchWinner,
    getMyMatches
}