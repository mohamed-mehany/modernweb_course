users = []

module.exports = io => {
  io.on('connection', function(socket){
    console.log('a user connected')
    users.push(socket.id);
    io.emit('users', users);
    socket.on('disconnect', function(){
      users.splice(users.indexOf(socket.id), 1);
      io.emit('users', users);

      console.log('user disconnected')
    })
  })

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg)
    })
  })

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      // console.log(msg);
      io.emit('chat message', {
        text: msg,
        userId: socket.id
      });
    });
    socket.on('started typing', function(){
      // console.log(socket.id + "API user typing");
      io.emit('started typing', socket.id);
    });
    socket.on('typed', function(){
      io.emit('typed');
    });

  })
}
