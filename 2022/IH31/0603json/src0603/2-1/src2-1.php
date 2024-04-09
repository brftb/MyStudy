<?php
// 配列作成
$array = [
   "ID" => 1,
   "name" => "user01",
   "gender" => "women"
];

// JSON文字列に変換してjsで受け取るためにecho
echo json_encode($array);

?>