module.exports = app =>{
    app.get("/api/test",(req,res)=>{
        res.status(200).json(req.session)
    })
}