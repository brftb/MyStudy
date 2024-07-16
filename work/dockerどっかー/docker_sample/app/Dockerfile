##############
# base image #
##############
# 全てのベースとなるコンテナ構成

# コンテナのベースとなるイメージ(OS)
FROM node:lts-alpine3.16 as base

# 環境変数
ENV LANG="ja_JP.UTF-8"
ENV APP_HOME="/home/node"

# コマンドを実行する際の作業ディレクトリの指定
WORKDIR $APP_HOME

# アプリケーションのポート番号の指定
EXPOSE 3000

# 全ファイルの権限をnodeユーザーへ割り当てる
RUN chown -R node:node .

# ユーザーをnodeユーザーへ切り替え(Linuxでいうsu nodeと同義)
USER node

RUN echo "WORKDIR is $WORKDIR . HOME is $HOME . LANG is $LANG ." && npm config list

###############
# development #
###############
# 開発環境用のコンテナ構成

# コンテナのベースとなるイメージ(node + 上記の仕様 = base)
FROM base as development

# 開発環境用の環境変数
ENV NODE_ENV="development"

RUN echo "image is development"

##############
# production #
##############
# 本番環境用のコンテナ構成

# コンテナのベースとなるイメージ(node + 上記の仕様 = base)
FROM base as production

# 本番環境用の環境変数
ENV NODE_ENV="production"

RUN echo "image is production"