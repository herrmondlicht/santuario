module.exports = function(app, req, res) {
    //index
    app.get('/', (req, res) => {
        goToindex(req,res);
    });

    app.get('/index', (req, res) => {
        goToindex(req,res);
    });

    app.get("/login/",(req,res)=>{
        app.controllers.login.index(app,req,res);
    });

    //chat

    app.post("/home/send-chat/",(req,res)=>{
        app.controllers.chat.sendChat(app,req,res);
    });

    app.post("/home/chat-layout/",(req,res)=>{
        app.controllers.chat.getLayout(app,req,res);
    });

};


var goToindex = function(req,res){
    console.log("passou index");
    res.render("home/index");
}
