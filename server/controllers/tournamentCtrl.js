function pastTournament(req,res){
    const db = req.app.get('db');
    db.query(`
    select t.tournament_id as tournament_id, t.name as tournament_name, u.username as creator from users_in_tournament ut
        join tournament t
        on t.tournament_id = ut.tournament_id
        join topspin_user u
        on u.user_id = t.user_id
        where ut.user_id = '${req.session.user.user_id}'
        and t.date_finished is not null;
    `).then(tournaments=>{
        res.status(200).json(tournaments)
    }).catch(err=>console.log(err))
}
function upcomingTournament(req,res){
    const db = req.app.get('db');
    db.query(`
        select t.tournament_id as tournament_id, t.name as tournament_name, u.username as creator from users_in_tournament ut
        join tournament t
        on t.tournament_id = ut.tournament_id
        join topspin_user u
        on u.user_id = t.user_id
        where ut.user_id = '${req.session.user.user_id}'
        and t.date_finished is null;
    `).then(tournaments=>{
        res.status(200).json(tournaments)
    }).catch(err=>console.log(err))
}
function tournamentMatches(req,res){
    const db = req.app.get('db');
    db.query(`
    select * from match m
        where m.tournament_id = ${req.params.id}
        order by m.round;
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
    pastTournament,
    upcomingTournament,
    tournamentMatches
}