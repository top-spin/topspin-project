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
function getMyStats(req,res){
    const db = req.app.get('db')
    db.query(`
    select count (match_winner) from match where match_winner = '${req.session.user.user_id}'
          `).then(wins => {
    const db = req.app.get('db')
    db.query(`
    select count (match_winner) from match where match_loser = '${req.session.user.user_id}'
          `).then(losses =>{
    db.query(`
    select count (tournament_winner) from tournament where tournament_winner =  '${req.session.user.user_id}'
          `).then(twinner=>{
        res.status(200).json( 
            [+twinner[0].count, +wins[0].count,+losses[0].count ]
         )
    }).catch(err=>(console.log(err)))
    }).catch(err=>(console.log(err)))
    }).catch(err=>(console.log(err)))
}
function submitRound(req,res){
    const db = req.app.get('db')
    let rounds1 = ["1A","1B","1C","1D","1E","1F","1G","1H"]
    let rounds2 = ["2A","2B","2C","2D"]
    let rounds3 = ["3A","3B"]
    let rounds4 = ["4A"]
    db.match.count({tournament_id:req.body.tournament.tournament_id}).then(matchCount=>{
            let matches = req.body.matchesToBe.map((match,i)=>{
                return{
                    tournament_id:req.body.tournament.tournament_id,
                    winning_score:(()=>{
                        if(+match.score1>+match.score2){
                            return +match.score1
                        }
                        else{
                            return +match.score2
                        }
                    })(),
                    losing_score:(()=>{
                        if(+match.score1<+match.score2){
                            return +match.score1
                        }
                        else{
                            return +match.score2
                        }
                    })(),
                    match_winner:(()=>{
                        if(+match.score1>+match.score2){
                            return match.player1.user_id
                        }
                        else{
                            return match.player2.user_id
                        }
                    })(),
                    match_loser:(()=>{
                        if(+match.score1<+match.score2){
                            return match.player1.user_id
                        }
                        else{
                            return match.player2.user_id
                        }
                    })(),
                    round:(()=>{
                        if(+matchCount===0){
                            return rounds1[i]
                        }
                        else if(+matchCount===(req.body.tournament.size/2)){
                            return rounds2[i]
                        }
                        else if(+matchCount===(req.body.tournament.size/4)){
                            return rounds3[i]
                        }
                        else if(+matchCount===(req.body.tournament.size/8)){
                            return rounds4[i]
                        }
                    })()
                }
            })
            db.match.insert(matches).then(matchesAdded=>{
                let matchWinners = matchesAdded.map(match=>{
                    return "'"+match.match_winner+"'"
                })
                db.query(`
                    select * from topspin_user
                    where user_id in (${matchWinners.join(",")});
                `).then(arrayOfWinners=>{
                    res.status(200).json(arrayOfWinners);
                }).catch(console.log)
            }).catch(console.log)
    }).catch(console.log)

}
module.exports = {
    getMatchLoser,
    getMatchWinner,
    getMyMatches,
    getMyStats,
    submitRound
}