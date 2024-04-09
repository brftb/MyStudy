
### 環境変数に登録済のポート確認
```
cat /etc/hosts
```

### ポートで現在動作中の確認
[参考](https://qiita.com/narikei/items/cd39cb9f64424d95f329)
```
lsof -i -P | grep 3000
node      91853 takekota   24u  IPv6 0x45392ffe240ec085      0t0  TCP *:3000 (LISTEN)
kill -9 91853
```

