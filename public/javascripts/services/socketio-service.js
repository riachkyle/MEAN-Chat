$(function(){ //waits until the entire DOM is loaded so we have jQuery and everything here. 

  var socket = io.connect();

  var name = $('#name');

  var messageForm = $('#send-message');

  var messageBox = $('#message');

  var chat = $('#chat');


  //go and grab 
  $.get("/message", function(allMessages){
    for(var i = 0; i < allMessages.length; ++i) {
      printMessage(allMessages[i]);
    }
  });

  messageForm.submit(function(e){
    var messageObject = {name: name.val(), message: messageBox.val()};

    //preventing default behavoirs of refreshing the page after you submit
    e.preventDefault();

    socket.emit('send message', messageObject);

    messageBox.val('');

    $.ajax({
      type: "POST",
      url: '/message',
      data: messageObject
    });

  });

  socket.on('new message', function(data) {
    // chat.append('<strong>' + data.name + '</strong>: ' + data.message + '<br>');
    printMessage(data);
  });

  function printMessage(data) {
    chat.append('<strong>' + data.name + '</strong>: ' + data.message + '<br>');
  }

});