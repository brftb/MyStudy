--復習
--SQL構文は大文字で書く

---- 選択
SELECT 「column名」 as '別名', ２個目以降
FROM 「テーブル名」
WHERE 「条件式」 --column上の値を絞り込み
GROUP BY 「column名」, 2個目以降--グループ化
HAVING 「条件式」 --集合関数の結果を絞り込み
ORDER BY 「column名」, 2個目以降(優先順位劣) --並び替え
LIMIT 0,5 インデックス０から５列表示 --表示件数の絞り込み


--- 条件式
WHERE id = 123 AND name = "yamada"
WHERE name LIKE "yamada" OR name LIKE "%yama%"
in()
between
IS NOT NULL

SELECT * FROM m_person WHERE name LIKE "%ama%" AND dm = 1;
SELECT id,password FROM users19;

-- 集合関数
max(), min(), count(), sum(), avg()
グループ化しなくても使えた

-- 分析関数
-- グループ化したcolumnにのみ適応可能?
COUNT() -- 件数
SUM() -- 合計
AVG() -- 平均
MAX() -- 最大
MIN() -- 最小
RANK() -- 順位
DENSE_RANK() -- 順位
-- 前後のレコードの値を取得するSQL(比較ができるだけか？)
LAG() -- n個前
LEAD() -- n個後

-- データ型を取得するSQL
SELECT TYPEOF(column) FROM table;

-- https://excel-ubara.com/vba_sql/vba_SQL023.html
-- OVER句
-- WINDOW句
-- FILTER句


---- INSERT
INSERT INTO テーブル名 (列名, 列名2)
VALUES (値, 値2), (値3, 値4)--2行目

-- 全列にINSERTする場合列名指定は省略可能
INSERT INTO users19 VALUES('yamada','tadaaki','1234','M','19870605');
INSERT INTO makers19(name) VALUES('ネスカフェ');


---- UPDATE
UPDATE テーブル名
SET カラム名 = 値, カラム名2 = 値2
WHERE 条件式


---- DELETE
DELETE FROM テーブル名 WHERE 条件式


-- UPDATE と DELETE は SELECT で一回確認する


---- テーブル追加

CREATE TABLE `dataTest01` (
   `id` int(11) NOT NULL,
   `time` date NOT NULL COMMENT '日時',
   `bit` float NOT NULL COMMENT '',
   `ask` float NOT NULL COMMENT '',
   `buyVol` float NOT NULL COMMENT 'B',
   `sellVol` float NOT NULL COMMENT 'S'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='2022.04.22';


CREATE TABLE `m_person` (
   `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   `name` varchar(20) NOT NULL,
   `gender` char(1) NOT NULL,
   `address` varchar(20) NOT NULL,
   `dm` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='2022.06.09';



-- SQLのCASE式を用いてORDER BY でソート列を作るテクニック
CASEを使った既存の体系を新たな体系に変換した集計
SELECT key
FROM Tests
ORDER BY CASE key
   WHEN 'B' THEN 1
   WHEN 'A' THEN 2
   WHEN 'D' THEN 3
   WHEN 'C' THEN 4
   ELSE NULL
   END;
ソート列も出力させたい場合
SELECT
key,
CASE key
   WHEN 'B' THEN 1
   WHEN 'A' THEN 2
   WHEN 'D' THEN 3
   WHEN 'C' THEN 4
   ELSE NULL
   END AS sort_col
FROM Tests
ORDER BY sort_col;

-- SELECT文の処理の実行順序

FROM // 検索対象のテーブルが決定
↓
WHERE // 条件による絞り込み
↓
GROUP BY // グループ化
↓
SELECT // SELECTに記述された計算が実行
↓
HAVING // グループ化された結果を条件によって絞り込み
↓
ORDER BY // ソート
↓
LIMIT // 指定された行数で絞り込む