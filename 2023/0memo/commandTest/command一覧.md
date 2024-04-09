https://qiita.com/kohga/items/dccf135b0af395f69144

●初期設定
git config —global user.name “brftb”
git config —global user.email “05017hal@gmail.com”

●git token を作成してキーチェーンアクセスに保存


—————+—————+—————+—————+—————+—————
◆初手どれかやる

●ローカルリポジトリを作成してプッシュ
git init
git add .
git commit -m “Initial commit”
// git branch -M main
git remote add origin https://github.com/brftb/commandTest.git
git push -u origin master
// git push -u origin main


●リモートからクローン
git clone https://github.com/brftb/commandTest.git

—————+—————+—————+—————+—————+—————

●プル
git pull
or
git fetch
git merge origin/master

●ステージ
git add <ファイル名>

●コミット
git commit -m  “コミットメッセージ”

●プッシュ
git push origin <ブランチ名>

●ステージの取り消し
git reset HEAD <ファイル名>

—————+—————+—————+—————+—————+—————

●commitの履歴確認
git log

●commitの打ち消し
git reset [コミットID]	ローカルリポジトリ内のコミット自体を削除する
git revert <コミットのハッシュ値>	コミットと逆のコミットを作成する

または
`git reset --hard HEAD~1`
HEAD~1は直前のコミットを指し、--hardフラグは、コミット後の変更内容を完全に削除し、指定したコミットまでの履歴を変更することを意味します

●commitのメッセージ修正
git commit —amend “新しいメッセージ”

—————+—————+—————+—————+—————+—————

●ローカルでブランチを作成
git branch <ブランチ名>

●ローカルでブランチを切り替え
git checkout <ブランチ名>
●ブランチ作成＆切り替え
git checkout -b <ブランチ名>

●ブランチ名の変更
git branch -m <古いブランチ名> <新しいブランチ名>

●ブランチの削除
git branch -d <ブランチ名>

●ローカルのブランチをリモートに反映
git push -u origin <ローカルのブランチ名>

●リモートのブランチをローカルに反映
git branch <ブランチ名> origin/<ブランチ名>
●リモートのブランチをローカルに反映
git checkout -b <ブランチ名> origin/<ブランチ名>

●全てのブランチを確認
git branch -a

●ブランチの比較
git diff <ブランチ名> <ブランチ名>

●ブランチをマージする(HEADが指定ブランチに取り込まれる)
git merge <ブランチ名>




中間生成ファイルやログファイル・パスワードなどをgitの監視追跡対象から除外
.gitignore
.DS_Store
Thumbs.db
logs/
config


***
<span style="color:dimgray; text-align:right;">0707 CAMP</span>
#### git log
```sh
git log：コミットログを確認する
便利なオプション
git log --oneline
1コミット1行表示される
git log -n 10
表示するコミットの数を指定
```
#### git rebase
自由自在にコミット操作をすることが出来るようになります！
rebaseコマンドは本当に色んな使い方がありますが、例えば、過去のコミットの変更内容を修正する
[過去のgit commitの変更内容を修正したいときの手順 - Qiita](https://qiita.com/kotomin_m/items/a1ab500cf238fc836625)


***
#### リモートのブランチをローカルにプルする
```sh
git pull [remote]:[local]
git pull origin develop/1.0.0:develop/1.0.0
```

#### リモートのdevelopをローカルのfeatureにプルする
```sh
git checkout develop
git pull origin develop
git checkout feature
git merge develop
```

***
#### コミットメッセージを変更したい場合
git commit --amend
テキストエディタでコミットメッセージを編集し、コミットを保存


***
#### スタッシュ
コミットはせずに変更を退避したいとき
[参考リンク](https://qiita.com/chihiro/items/f373873d5c2dfbd03250)
[コマンド一覧](https://qiita.com/akasakas/items/768c0b563b96f8a9be9d)
```sh
# 変更を退避する
git stash -u
# 退避した作業の一覧を見る
git stash list
# 退避した作業を元に戻すと同時に、stashのリストから消す
git stash pop stash@{0}
# 番号を指定しない場合0番目がpopされる
git stash pop
git stash drop # 最新のスタッシュを削除
git stash drop stash@{N} # N番目のスタッシュを削除
```
