const socketio = io(); // サーバーへ接続
const form = document.getElementById("chat-form");

form.addEventListener("submit", function(event){
    event.preventDefault();
    const input_message = document.getElementById("get-text").value;
    socketio.emit('c2s', input_message); // サーバーに送信
});

// サーバーが配送したデータを待ち受ける
socketio.on('s2c', (msg) => {
    console.log('ソケットs2c: '+msg);
    // htmlに表示
    let ul = document.getElementById("output");
    let li = document.createElement('li');
    li.innerHTML = msg;
    ul.appendChild(li);
});
