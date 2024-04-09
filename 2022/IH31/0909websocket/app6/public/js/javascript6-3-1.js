const socketio = io(); // サーバーへ接続
const form = document.getElementById("chat-form");

form.addEventListener("submit", function(event){
    event.preventDefault();

    const input_message = document.getElementById("get-text").value;
    console.log(input_message);
    socketio.emit('c2s-chat1', input_message); // サーバーに送信①
});

// サーバーが配送したデータを待ち受ける
socketio.on('s2c-chat1', (msg) => { // データ「s2c-chat1:msg」を受信したら④
    console.log('s2c-chat1: '+msg);
    // htmlに表示
    let ul = document.getElementById("output");
    let li = document.createElement('li');
    li.innerHTML = msg;
    ul.appendChild(li);
});
