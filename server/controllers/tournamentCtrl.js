function pastTournament(req, res) {
  const db = req.app.get("db");
  db.query(
    `
    select t.tournament_id as tournament_id, t.name as tournament_name, u.username as creator from users_in_tournament ut
        join tournament t
        on t.tournament_id = ut.tournament_id
        join topspin_user u
        on u.user_id = t.user_id
        where ut.user_id = '${req.session.user.user_id}'
        and t.date_finished is not null;
    `
  )
    .then(tournaments => {
      res.status(200).json(tournaments);
    })
    .catch(err => console.log(err));
}
function upcomingTournament(req, res) {
  const db = req.app.get("db");
  db.query(
    `
        select t.tournament_id as tournament_id, t.name as tournament_name, u.username as creator from users_in_tournament ut
        join tournament t
        on t.tournament_id = ut.tournament_id
        join topspin_user u
        on u.user_id = t.user_id
        where ut.user_id = '${req.session.user.user_id}'
        and t.date_finished is null;
    `
  )
    .then(tournaments => {
      res.status(200).json(tournaments);
    })
    .catch(err => console.log(err));
}
function tournamentMatches(req, res) {
  const db = req.app.get("db");
  db.query(
    `
    select * from tournament
        where tournament_id = ${req.params.id};
    `
  )
    .then(tournament => {
      db.query(
        `
        select * from match m
            where m.tournament_id = ${req.params.id}
            order by m.round;
        `
      )
        .then(matches => {
          db.query(
            `
            select * from topspin_user
            `
          )
            .then(players => {
              let response = matches.map((obj, i) => {
                return {
                  match_id: obj.match_id,
                  tournament_id: obj.tournament_id,
                  winning_score: obj.winning_score,
                  losing_score: obj.losing_score,
                  match_winner: players.filter(e => {
                    // console.log(e)
                    if (e.user_id === obj.match_winner) {
                      return true;
                    } else {
                      return false;
                    }
                  })[0],
                  match_loser: players.filter(e => {
                    // console.log(e)
                    if (e.user_id === obj.match_loser) {
                      return true;
                    } else {
                      return false;
                    }
                  })[0],
                  round: obj.round
                };
              });
              // console.log(tournament)
              if (tournament[0].date_finished === null) {
                db.query(
                  `
                        select * from pending_users_in_tournament p
                            join topspin_user u
                            on u.user_id = p.user_id
                            where p.tournament_id = '${req.params.id}';
                        `
                )
                  .then(pendingPlayers => {
                    db.query(
                      `
                            select * from users_in_tournament p
                                join topspin_user u
                                on u.user_id = p.user_id
                                where p.tournament_id = '${req.params.id}';
                            `
                    )
                      .then(acceptedPlayers => {
                        res.status(200).json({
                          tournament: tournament[0],
                          pendingPlayers,
                          acceptedPlayers,
                          finished: false
                        });
                      })
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));
              } else {
                res.status(200).json({
                  matches: response,
                  tournamet: tournament[0]
                });
              }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}
function addTournament(req, res) {
  const db = req.app.get("db");
  const { name, description, count, date } = req.body.tournament;
  db.tournament
    .insert({
      name,
      user_id: req.session.user.user_id,
      description,
      size: count,
      start_date: date
    })
    .then(newTournament => {
      // console.log(newTournament)
      let toInsert = req.body.players
        .filter(player => player.user_id !== req.session.user.user_id)
        .reduce((prev, player, i) => {
          if (i === 0) {
            return (
              prev +
              "('" +
              newTournament.tournament_id +
              "','" +
              player.user_id +
              "')"
            );
          } else {
            return (
              prev +
              ",('" +
              newTournament.tournament_id +
              "','" +
              player.user_id +
              "')"
            );
          }
        }, "");
      db.query(
        `
        insert into pending_users_in_tournament(tournament_id,user_id)
            values ${toInsert};
        `
      )
        .then(players => {
          db.users_in_tournament
            .insert({
              tournament_id: newTournament.tournament_id,
              user_id: req.session.user.user_id
            })
            .then(creator => {
              res.status(200).json({ newTournament, players, creator });
            });
        })
        .catch(console.log);
    })
    .catch(console.log);
}
function getPendingCount(req, res) {
  const db = req.app.get("db");
  db.query(
    `
    select count (user_id) from pending_users_in_tournament where (user_id, rejected) = ('${
      req.session.user.user_id
    }',false) 
          `
  )
    .then(pending => {
      res.status(200).json(+pending[0].count);
    })
    .catch(err => console.log(err));
}
function editPlayers(req, res) {
  //console.log(req.body.players);
  const db = req.app.get("db");
  db.query(
    `
    select * from pending_users_in_tournament p
        join topspin_user u
        on u.user_id = p.user_id
        where p.tournament_id = '${req.params.id}';
    `).then(pendingPlayers => {
      db.query(
        `
        select * from users_in_tournament p
            join topspin_user u
            on u.user_id = p.user_id
            where p.tournament_id = '${req.params.id}';
        `).then(acceptedPlayers => {
          // console.log(pendingPlayers.concat(acceptedPlayers))
          let oldPlayers = pendingPlayers.concat(acceptedPlayers);
          let newPlayers = req.body.players;
          function inPlayers(type,id){
            if(type==="old"){
                let existsArray = oldPlayers.filter(player=>{
              return id === player.user_id;
            })
            return existsArray.length===0;
            }
            else if(type==="new"){
              let existsArray = newPlayers.filter(player=>{
              return id === player.user_id;
              })
              return existsArray.length===0;
            }
          }
          
          let playersToAdd = newPlayers.filter(player=>{
            return inPlayers("old",player.user_id);
          }).reduce((prev, player, i) => {
            // console.log(player)
                    if (i === 0) {
                      return (
                        prev +"('" +req.params.id +"','" +player.user_id +"')"
                      );
                    } else {
                      return (
                        prev +",('" +req.params.id +"','" +player.user_id +"')"
                      );
                    }
                  }, "");
          
          let playersToRemove = oldPlayers.filter(player=>{
            return inPlayers("new",player.user_id);
          }).reduce((prev, player, i,array) => {
            // console.log(player)
                    if (i === 0) {
                      if(array.length>1){
                      return (
                        prev +
                        "user_id = '" +player.user_id +"' or "
                      );
                      }
                      else{
                        return (
                          prev +
                          "user_id = '" +player.user_id +"'"
                        );
          
                      }
                    } else {
                     if((array.length-1) === i){
                      return (
                        prev +
                        "user_id = '" +player.user_id +"'"
                      );
                      }
                      else{
                        return (
                          prev +
                          "user_id = '" +player.user_id +"' or "
                        );
          
                      }
                    }
                  }, "");
                  if(playersToAdd===""&&playersToRemove===""){
                    db.query(`
                      delete from pending_users_in_tournament
                        where tournament_id = '${req.params.id}' and ${playersToRemove};
                      delete from users_in_tournament
                        where tournament_id = '${req.params.id}' and ${playersToRemove};
                    `).then(deletedPlayers=>{
                  
                     db.query(
                      `
                      insert into pending_users_in_tournament(tournament_id,user_id)
                          values ${playersToAdd};
                      `
                    ).then(newPlayersFromDB=>{
                      res.status(200).json({
                        playersToAdd,
                        playersToRemove
                      });
                    }).catch(err => console.log(err));
                    }).catch(err => console.log(err));
                  }
                  else if(playersToAdd===""){
                    db.query(`
                    delete from pending_users_in_tournament
                      where tournament_id = '${req.params.id}' and ${playersToRemove};
                    delete from users_in_tournament
                      where tournament_id = '${req.params.id}' and ${playersToRemove};
                  `).then(deletedPlayers=>{
                    res.status(200).json({
                              playersToAdd,
                              playersToRemove
                            });
                  }).catch(err => console.log(err));
                  }
                  else if(playersToRemove===""){
                    db.query(
                      `
                      insert into pending_users_in_tournament(tournament_id,user_id)
                          values ${playersToAdd};
                      `
                    ).then(newPlayersFromDB=>{
                      res.status(200).json({
                        playersToAdd,
                        playersToRemove
                      });
                    }).catch(err => console.log(err));
                  }
                  else{
                    res.status(200).json("No changes needed.")
                  }
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

module.exports = {
  pastTournament,
  upcomingTournament,
  tournamentMatches,
  addTournament,
  editPlayers,
  getPendingCount
};
