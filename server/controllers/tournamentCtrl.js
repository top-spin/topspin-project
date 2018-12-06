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
module.exports = {
    pastTournament,
    upcomingTournament
}