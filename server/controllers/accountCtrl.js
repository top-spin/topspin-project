function checkStatus(req,res){
    res.status(200).json(req.session.status)
}
module.exports = {
    checkStatus
}