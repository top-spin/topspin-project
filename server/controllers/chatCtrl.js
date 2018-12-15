function getMessagesForChat(req,res){
    const db = req.app.get("db");
    db.query(`
    select * from messages
        where (from_user='${req.session.user.user_id}' or from_user='${req.params.id}') and
        (to_user='${req.session.user.user_id}' or to_user='${req.params.id}');
    `).then(messages=>{
        res.status(200).json(messages)
    }).catch(err=>console.log(err))
}
function addMessage(req,res){
    const db = req.app.get("db");
    db.messages.insert(req.body).then(newMessage=>{
        res.status(200).json("Success!")
    }).catch(console.log)
}
function getUsersForChat(req,res){
    const db = req.app.get("db");
    db.query(`
    select date_sent,from_user,to_user from messages
        where (from_user='${req.session.user.user_id}') or
        (to_user='${req.session.user.user_id}')
        order by date_sent desc;
    `).then(messages=>{
        let chatUsers = messages.reduce((previousValue,message,i)=>{
            let includesStream = previousValue.filter(value=>{
              if((value.from_user===message.to_user ||
              value.from_user===message.from_user) &&
              (value.to_user===message.to_user||
              value.to_user===message.from_user)){
                return true;
              }
              else{
                return false
              }
            })
            if(includesStream.length===0){
              previousValue.push(message)
            }
            else{
          
            }
            return previousValue
          },[]).map(message=>{
            if(message.from_user===req.session.user.user_id){
              return "'"+message.to_user+"'"
            }
            else{
              return "'"+message.from_user+"'"
            }
          })
          db.query(`
            select * from topspin_user
                where user_id in (${chatUsers.join(",")});
          `).then(recentUsers=>{
              recentUsers = chatUsers.map(user_id=>{
                  let user
                  recentUsers.map(obj=>{
                      if(("'"+obj.user_id+"'")===user_id){
                          user = obj
                      }
                  })
                  return user
              })
             db.query(`
            select * from topspin_user
                where user_id not in (${chatUsers.join(",")});
            `).then(users=>{
                res.status(200).json(recentUsers.concat(users))
            }).catch(err=>console.log(err))
          }).catch(err=>console.log(err))
     
    }).catch(err=>console.log(err))
}

module.exports = {
    getMessagesForChat,
    addMessage,
    getUsersForChat
}