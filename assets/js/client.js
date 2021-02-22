// Connection to signaling server
let connection = new WebSocket('ws://localhost:9090');

connection.onopen = ()=>{
    console.log('Connected to server');
}

connection.onmessage = (msg)=>{
    let data = JSON.parse(msg.data);
    
    switch(data.type){
        case "login":
            loginProcess(data.success);
        break;
    }
}

connection.onerror = (err)=>{
    console.log(err)
}



// Get Username from URL
let url_string = window.location.href;
let url = new URL(url_string);
let username = url.searchParams.get("username");

setTimeout(function(){
    if(connection.readyState === 1){
        if(username != null){
            if(username.length > 0){
                send({
                    type:"login",
                    name: username
                });
            }
        }
    }else{
        console.log("Connection has not established yet.")
    }

}, 3000);


// Send data method 
let connectedUser;
function send(message){
    if(connectedUser){
        message.name = connectedUser;
    }
    connection.send(JSON.stringify(message));
}

// Function to login
function loginProcess(success){
    if(success === false){
        alert("Try a different username");
    }else{

        // Get Local Video
        let local_video = document.getElementById('local-video');

        navigator.getUserMedia({
            video: true,
            audio: true
        }, (localStream)=>{
            stream = localStream;
            local_video.srcObject = stream;
        }, (err)=>{
            console.log(err);
        });
         
    }
}