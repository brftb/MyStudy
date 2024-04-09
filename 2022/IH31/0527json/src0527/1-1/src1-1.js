// 配列作成
const value = [1,1,2,3,5,8,13];

// JSON文字列に変換
const val = JSON.stringify(value);

// 表示
let parent = document.getElementsByTagName('p');
parent[0].textContent = val;
