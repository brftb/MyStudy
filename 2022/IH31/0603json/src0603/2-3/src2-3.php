<?php
// jsonから受け取り
//$json = file_get_contents("php://input");
// 受け取った文字列を配列に変換
//$data = json_decode($json);
$data = json_decode($_POST['value']);

// 受け取った配列をcsvに格納
$strData = implode(',', (array)$data); //連想配列(object(stdClass))からarrayに変換(cast)：stackoverflow.com/questions/20297435
$file = '../csv/json2-3.csv';
$current = file_get_contents($file);
$current = $strData."\n";
file_put_contents($file,$current);

// JSON文字列に変換してjsで受け取るためにecho
echo json_encode($data);
?>