## GitHub ラベル

このリポジトリでは、以下のラベルを使用しています。

```
❯ gh label list

Showing 13 of 13 labels in ReoHakase/simple-resas-app

📦️ build    ビルドシステムや依存関係の変更            #EDEEF0
✨ feat      機能の実装。                              #FFC53D
⚰️ feat      機能の削除                                #696E77
🐛 fix       バグの修正                                #12A594
🐞 fix       修正しなくても問題のないバグの修正        #A18072
🚑️ fix      重大なバグの修正                          #E5484D
🩹 patch     パッチの追加                              #6E56CF
📝 doc       ドキュメントの追加・更新                  #0090FF
♻️ refactor  コードのフォーマットやリファクタリング。  #BDEE63
🧪 test      テストの追加・更新                        #30A46C
🦺 ci        CIの変更                                  #F76B15
🔧 chore     設定ファイルの変更                        #18191B
🍱 chore     アセットの変更                            #D6409F
```

### ラベルの追加

以下のコマンドを実行することで、ラベルを追加できます。

```sh
gh label create "✨ feat" --description "機能の追加" --color "#FFC53D"
gh label create "⚰️ feat" --description "機能の削除" --color "#696E77"
gh label create "🐛 fix" --description "バグの修正" --color "#12A594"
gh label create "🐞 fix" --description "修正しなくても問題のないバグの修正" --color "#A18072"
gh label create "🚑️ fix" --description "重大なバグの修正" --color "#E5484D"
gh label create "🩹 patch" --description "パッチの追加" --color "#6E56CF"
gh label create "📝 doc" --description "ドキュメントの追加・更新" --color "#0090FF"
gh label create "♻️ refactor" --description "コードのフォーマットやリファクタリング。" --color "#BDEE63"
gh label create "🧪 test" --description "テストの追加・更新" --color "#30A46C"
gh label create "🦺 ci" --description "CIの変更" --color "#F76B15"
gh label create "📦️ build" --description "ビルドシステムや依存関係の変更" --color "#EDEEF0"
gh label create "🔧 chore" --description "設定ファイルの変更" --color "#18191B"
gh label create "🍱 chore" --description "アセットの変更" --color "#D6409F"
```
