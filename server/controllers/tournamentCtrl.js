function pastTournament(req,res){
    const db = req.app.get('db');
    db.query(`
    select * from users_in_tournament ut
        join topspin_user u
        on u.user_id = ut.user_id
        join tournament t
        on t.tournament_id = ut.tournament_id
        where ut.user_id = '${req.session.user.user_id}'
        and t.date_finished is not null;
    `).then(tournaments=>{
        res.status(200).json(tournaments)
    }).catch(err=>console.log(err))
}
function upcomingTournament(req,res){
    const db = req.app.get('db');
    db.query(`
    select * from users_in_tournament ut
        join topspin_user u
        on u.user_id = ut.user_id
        join tournament t
        on t.tournament_id = ut.tournament_id
        where ut.user_id = '${req.session.user.user_id}'
        and t.date_finished is null;
    `).then(tournaments=>{
        res.status(200).json(tournaments)
    }).catch(err=>console.log(err))
}
module.exports = {
    pastTournament,
    upcomingTournament
}