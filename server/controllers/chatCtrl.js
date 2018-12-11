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

module.exports = {
    getMessagesForChat,
    addMessage
}