
◆Git作業の流れ

●クローン
```
git clone [SSH key]
```

●ブランチ作成＆切り替え
```
git pull origin develop:develop

git checkout develop
git checkout -b feature/takeda/ログイン画面
```

もしくは
```
git fetch
git branch -a
git switch develop
git switch -c feature/takeda/aiueo
```

■◆ファイル作成など作業■◆

●ステージ
git add .

●コミット
git commit -m  “コミットメッセージ”

+—————+

●current branchをプッシュ
git push origin HEAD

●プルリクエスト
ブラウザで操作
リモートリポジトリのブランチをdevelopにマージするリクエスト
手順
Pull requestsタブ
New pull request
baseとcompareを選択
Create pull request
Create pull request
Merge pull request
Confirm merge

●プル
git checkout develop
git pull origin develop

—————+—————+—————+—————+—————+—————

■◆ 補足ーブランチをorigin - developにマージして作業を続けたい場合

●ブランチをマージする（HEADが指定ブランチに取り込まれる）（HEADを指定ブランチにマージする）
git checkout <ブランチ名>
git merge develop
git checkout develop

または
●ブランチの削除
git branch -d <ブランチ名>


—————+—————+—————+—————+—————+—————
git pull origin <ブランチ名>
差異がなく移動したことがないブランチは表示されない
よって、ローカルのブランチが追跡しているブランチを表示するために
git branch -vv
