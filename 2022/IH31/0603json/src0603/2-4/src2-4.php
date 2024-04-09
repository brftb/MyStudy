<?php
// jsonから受け取り
$json = file_get_contents("php://input");
// 受け取った文字列を配列に変換
$data = json_decode($json);

//// 受け取った配列をcsvに格納
$file = '../csv/enquete.csv';
$current = file_get_contents($file);
// 複雑な配列を一括implode
foreach($data as $key => $value){
   if(is_array($value)){
      $string = '';
      foreach($value as $details){
         $string .= $details;
      }
      $current .= $key."=".$string.",";
   }else{
      $current .= $key."=".$value.",";
   }
}
$current = rtrim($current, ',');
$current .= "\n";

file_put_contents($file,$current);

// JSON文字列に変換してjsで受け取るためにecho
echo json_encode($data);
?>