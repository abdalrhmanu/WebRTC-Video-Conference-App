let webSocketServer = require('ws').Server;

let wss = new webSocketServer({
    port:9090
});

let users = {};

// Fire when user connects to server
wss.on('connection', connection =>{
    console.log("User Connected");
    
    connection.on('message', msg =>{
        let data;

        try {
            data = JSON.parse(msg);
        } catch (error) {
            console.log("Invalid JSON");
            data = {};
        }

        switch (data.type){
            case "login":
                if(users[data.name]){
                    sendToOtherUsers(connection, {
                        type:"login",
                        success: false
                    })
                }else{
                    users[data.name] = connection;
                    connection.name = data.name;

                    sendToOtherUsers(connection, {
                        type:"login",
                        success: true
                    })
                }
                break;

        }

    })

    connection.on('close', () =>{
        console.log('Connection closed');
    })

    connection.send('Hello World')
});

// Helping Fx to send msg to other users
function sendToOtherUsers(connection, message){
    connection.send(JSON.stringify(message));
}
