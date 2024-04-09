const socketio = io(); // サーバーへ接続
const form = document.getElementById("chat-form");

form.addEventListener("submit", function(event){
    event.preventDefault();

    const sendData = {
        input1 : document.getElementById("chat-input1").value,
        input2 : document.getElementById("chat-input2").value
    };
    socketio.emit('c2s', sendData); // サーバーに送信
});

// サーバーが配送したデータを待ち受ける
socketio.on('s2c', (msg) => { // データ「s2c:msg」を受信したら
    console.log('ソケットs2c[input1]: '+msg.input1);
    console.log('ソケットs2c[input2]: '+msg.input2);
    let ul = document.getElementById("output");
    let li = document.createElement('li');
    li.innerHTML = msg.input1 + " : " + msg.input2;
    ul.appendChild(li);
});
