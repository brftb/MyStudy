<?php
// 配列作成
$array = [
   [
      "name" => "asada",
      "gender" => "男",
      "blog" => [
         "name" => "AsadaBlog",
         "published" => "2020-05-01",
         "url" => "https://test1.jp/"
      ]
   ],
   [
      "name" => "kawashima",
      "gender" => "男",
      "blog" => [
         "name" => "KawashimaBlog",
         "published" => "2020-06-11",
         "url" => "https://test2.jp/"
      ]
   ]
];

// JSON文字列に変換してjsで受け取るためにecho
echo json_encode($array);

?>