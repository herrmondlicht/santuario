module.exports.index = function(app,req,res){
    console.log("passou index login")
    res.render("login/login",{resp:"testando"});
}
