async function socketIO(server){
    const io = require('socket.io')(server);

    var redis = require('socket.io-redis');
    io.adapter(redis({ host: 'ip_server_redis', port: 6379 }));

    // io.emit('hi', 'all sockets from server 01');

    io.on("connection" , function(socket){

        socket.emit('hello', 'Connect server 1: port ===> 3100');

        console.log("New user connect to server 1:" + socket.id);

        socket.on("user_send_message_to_all" , (data) => {
            console.log(data);
            io.sockets.emit("server_send_data_to_all" , ` Server 01: ${data}` );
        })
    });

 
}

export { socketIO }