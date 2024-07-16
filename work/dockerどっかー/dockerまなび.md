
# 20230518

## Docker-compose
コンテナとホストマシンの接続を記述するファイル
初回起動時にのみ実行されるコマンドを記述

## DockerFile
コンテナの中身の詳細を切り分けたもの
docker-compose start 時に毎回実行される
普遍的な情報を記述


## 環境の使い分け

* base
* development
* production

Docker-compose : target: development
DockerFile : NODE_ENV


## build と image
* build : DockerFile を参照してコンテナを構築
* image : image を参照してコンテナを構築
   image が存在しない場合は build で構築した image を登録する


## 起動
Docker Desktop を起動
docker-compose up -d
docker-compose down


## init と tty
* init : 
* tty : true にしてないとコンテナが自動停止する


***

## 記述
id と 別名
```yml
   db:
      container_name: db
      image: mariadb:latest
      ports:
      - '33060:3306'
```
左がホストマシン：右がコンテナ

ネットワークの作成
```sh
docker network create backend
```
