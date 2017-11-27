var message = "";
var sendMessage = function() {
    message = $("#txtMessage").val();
    if (message != "") {
        $.post('home/chat-layout/', {
            emitter: "human",
            message: message,
        }, loadView);
    }
    clear();
}

var clear = function() {
    $("#txtMessage").val("");
};

var loadView = function(view) {
    $("#messages").append(view);
    scrollToBottom();
    $.post("home/send-chat/", {
        text: message,
    }, (view) => {
        $("#messages").append(view);
        scrollToBottom();
    });
}

var scrollToBottom = function() {
    document.querySelector(".message-container").scrollTo(0, document.querySelector(".message-container").scrollHeight);
};


//listeners

$("#btnSend").on("click", (e) => {
    sendMessage();
});

$("#txtMessage").on("keypress", (e) => {
    if (e.which == 13) {
        sendMessage();
        scrollToBottom();
    }
});
