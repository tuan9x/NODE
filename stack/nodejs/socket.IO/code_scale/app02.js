async function socketIO(server: any){
    const io = require('socket.io')(server);

    var redis = require('socket.io-redis');
	io.adapter(redis({ host: 'ip_server_redis', port: 6379 }));

	// io.emit('hi', 'all sockets from server 01');

    io.on("connection" , function(socket: any){

    	socket.emit('hello', 'Connect server 2: port ===> 3200');

        console.log("new User connect to server 2:" + socket.id);

        socket.on("user_send_message_to_all" , (data: any) => {
        	console.log(data);
        	io.sockets.emit("server_send_data_to_all" , ` Server 02: ${data}` );
        })
    });

 
}

export { socketIO }