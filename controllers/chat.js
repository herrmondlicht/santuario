var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
    username: "fc3dd609-82f3-4824-9f4a-b41dc0726b2c",
    password: "UQijutnm2Sf2",
    version: 'v1',
    version_date: '2017-05-26'
});

var wId = 'cdf10301-3924-4d73-9d26-0c89b15d976a';

var conversationId = null;


var chat = {
    startConversation: function(callback) {
        if (conversationId == null) {
            conversation.message({
                workspace_id: wId,
                input: {
                    'text': '_conversation_start'
                }
            }, function(err, response) {
                if (err) {
                    callback(err, response);
                } else {
                    console.log(JSON.stringify(response, null, 2));
                    conversationId = response.context.conversation_id;
                    callback(err, response);
                }
            });
        }
    },
    stopConversation: function() {
        conversationId = null;
    },
    sendMessage: function(text, callback) {
        console.log("Entrou no sendmessage");
        if (conversationId == null) {
            console.log("Sem conversationID");
            chat.startConversation(function(err, res) {
                console.log(err)
                if (err) throw err;
                else {
                    console.log("Vai retornar para mandar mensagem");
                    chat.sendMessage(text, callback);
                }
            });
        } else {
            console.log("Vai mandar mensagem");
            conversation.message({
                workspace_id: wId,
                input: {
                    'text': text,
                },
                context: {
                    conversation_id: conversationId,
                }
            }, function(err, response) {
                console.log("enviou mensagem")
                if (err)
                    console.log('error:', err);
                else {
                    if (callback) {
                        callback(err, response);
                    }
                }

            });
        }

    }
};

module.exports.sendChat = function(app, req, res) {
    console.log(req);
    if (req.body) {
        var text = req.body.text;
        chat.sendMessage(text, function(err, response) {
            if (err) throw err;
            else {
                req.body.emitter = "watson"
                req.body.message = response.output.text[0];
                getLayout(app,req,res)
            }
        });
    }
}

function getLayout(app, req, res) {
    console.log(req.body);
    if (req.body) {
        var emi = req.body.emitter,
            msg = req.body.message;
        res.render('home/chat-layout', {
            response: {
                emi: emi,
                msg: msg
            }
        });
    }
}

module.exports.getLayout = getLayout;
