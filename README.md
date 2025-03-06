# Polygonal Auxions
## 0. 目次
1. 概要
2. 実装済の機能/画面（全14点）
3. 使用技術
4. アプリケーションの起動方法
5. 各種操作方法（全7点）
6. その他のコマンド

## 1. 概要
現時点ではまだ途中段階ですが、3Dコンテンツを作品として共有するプラットフォームです。
某イラストコミュニケーションプラットフォームに似たアプリを想定して開発しています。
2025年3月5日時点ではまだ導入していませんが、将来的には下記2点の導入を予定しております。
1. WebGLの導入
2. 管理画面の導入

## 2. 実装済の機能/画面（全14点）
1. 機能（全8点）
    1. ログイン機能
    2. ログアウト機能
    3. 作品追加機能
    4. 作品のお気に入り追加機能
    5. 作品のブックマーク機能
    6. コメント一覧機能
    7. フォロー機能
    8. フォロー解除機能
2. 画面とその主な特徴（全6点）
    1. ホーム画面
          1. ログインの有無で画面の内容が変わります。
    3. 作品一覧画面
          1. お気に入り追加機能とブックマーク機能が使用できます。
          2. 各作品の上側にあるユーザのアイコン、もしくはその隣のユーザネームをクリックすると、その作品のユーザのプロフィール画面に遷移できます。
          3. 作品名の上にある大きな囲いをクリックすると、その作品の作品詳細画面に遷移できます。
    4. 作品詳細画面
          1. お気に入り追加機能とブックマーク機能が使用できます。
          2. 各作品の上側にあるユーザのアイコン、もしくはその隣のユーザネームをクリックすると、その作品のユーザのプロフィール画面に遷移できます。
          3. 作品に対するコメントが閲覧できます。
    5. 作品追加画面
          1. 作品名と説明文を両方入れた状態に限り、作品が追加できます。
    6. ユーザのプロフィール画面
          1. ログインしているユーザ以外に対し、フォロー/フォロー解除機能が使用できます。
3. 各機能の操作方法については、「4. アプリケーションの起動方法」の「3. 各種操作方法」を参照

## 3. 使用技術
* フロントエンド：Next.js、URQL
* サーバーサイド：GraphQL Yoga
* CSS：MUI
* DB：PostgreSQL
* 言語：TypeScript
* その他：Docker

## 4. アプリケーションの起動方法
### 1. 注意
1. **Windows PowerShellでのコマンド操作を想定しております。**
2. **制作途中の段階のため、操作手順が少し複雑です。お手数おかけしますがご了承ください。**
### 2. 操作手順（全12点）
```
# 1. デスクトップのディレクトリまで移動
cd Desktop\

# 2. プロジェクトのディレクトリを作成し、そのディレクトリへ移動
mkdir Y1K8M2NT1RK_projects
cd .\Y1K8M2NT1RK_projects\

# 3. Gitのクローン
git clone https://github.com/Y1K8M2NT1RK/polygonal-auxions.git

# 4. プロジェクトのディレクトリへ移動
cd .\polygonal-auxions\

# 5. dockerコンテナのビルド/起動
docker compose up -d --build

# 6. 起動中のコンテナを確認
docker ps

# ※この時点でコンテナpolygonal-auxions-app-1（以下appコンテナとする）が起動できない場合は、1のコマンドを実行してください
# 1. appコンテナのログの確認コマンド
   docker logs -f $(docker ps -f "name=app" -q)
# ※1のコマンドを実行した結果、2のエラーが出力された場合は、お手数ですがCtrl + Cキーを押したのち、3→4の順にのコマンドを実行してください。
# 2. エラー
   exec /entrypoint.sh no such file or directory
# 3. 上のエラーに対する実行コマンド
   git config --global core.autocrlf input
# 4. appコンテナをもう一度起動
   docker compose up -d

# 7. polygonal-auxions/package.json（Dockerfile.appと同じディレクトリ）で用意されたライブラリをインストール
# インストールに数分時間を要するためしばらく待機
docker compose exec app npm install

# 8. appコンテナの再起動
docker restart $(docker ps -f "name=app" -q)

# 9. 約1,2分後、起動中のコンテナをもう一度確認
docker ps

# 10. appコンテナの情報が出力されなくなるので、もう一度下記コマンドを実行して起動
# ※仮にそれでもappコンテナが出力されなかった場合は、お手数ですが出力が確認できるまで下記コマンドの実行をお願いいたします
docker compose up -d
```
11. ここまで操作したら、また約1,2分後に[http://localhost:3001/](http://localhost:3001/)をブラウザのURLに入力してEnterキーを押下

※なお、下の画像の画面が開いてしまった場合は、お手数ですが読込が開始されるまで下記のいずれかの方法で対処をお願いします。
1. ブラウザリロード（再読み込み）
2. URL入力部分をクリックしてもう一度Enterキーを押す

![スクリーンショット 2025-03-05 154740](https://github.com/user-attachments/assets/3d34dffc-1d86-4d57-ab9f-faf021ba5c86)

12. 下の画像の画面が開いたら軌道に成功

![スクリーンショット 2025-02-18 151619](https://github.com/user-attachments/assets/56733872-b8b7-4b89-9c48-841a03547464)

## 5. 各種操作方法（全7点）
 1. ログイン
     1. 下記のパターンに応じてログインボタンをクリック
         1. ホーム画面を開いている場合：右側のログインボタンをクリック
            * ホーム画面：http://localhost:3001/
         3. ホーム画面以外を開いている場合：右上のログインボタンをクリック 
     2. 下記の情報を入力する
        * メールアドレス： `abcd@efgh.jp`
        * パスワード： `0000`
     3. ログインボタンをクリック
     4. 右上の「＋」ボタンとユーザアイコンボタンが表示出来たら成功
 2. ログアウト
     1. ※1の操作を行ってから進めてください
        * ∵ログインしていない状態だとログアウトボタンが表示されないため
     1. 右上のユーザアイコンボタン（「＋」ボタンの右隣）をクリック
     2. ログアウトボタンをクリック
     3. ログインボタンが表示出来たらログアウト成功
 4. 作品の追加
     1. ※1の操作を行ってから進めてください
        * ∵ログインしていない状態だと「＋」ボタンが表示されないため
     1. 「＋」ボタンをクリックし、作品追加画面を開く
     2. 作品名と説明文を入れる
     3. 追加ボタンをクリック
     4. 作品一覧画面に遷移され、自身が入力した作品名と説明文が左上に表示出来たら成功
5. お気に入りに追加/ブックマーク
     1. ※1の操作を行ってから進めてください
         * ∵ログインしていない状態だと、エラーが表示されるため
     1. 作品一覧画面を開く
         * 作品一覧画面URL：http://localhost:3001/artworks/
     3. 下記のいずれかのボタンをクリック
         1. お気に入り：線のみのハートマーク
         2. ブックマーク：線のみのしおり
     4. 上記操作の結果、下記のいずれかの通りに表示出来たら成功
         1. お気に入り：赤塗りのハートマーク
         2. ブックマーク：青塗りのハートマーク
6. ユーザーのフォロー
     1. ※1の操作を行ってから進めてください
         * ∵ログインしていない状態だと、エラーが表示されるため
     1. 作品一覧画面を開く
         * 作品一覧画面URL：http://localhost:3001/artworks/
     2. 各作品の上側にあるユーザのアイコン、もしくはその隣のユーザネームをクリックし、フォローしていない※ユーザのプロフィール画面を開く
         1. ※フォローしていない：フォローボタンが表示されている状態
         2. ※フォロー中のユーザであれば、お手数ですが一度作品一覧へ戻っていただき、別のフォローしていないユーザに対して上記操作をもう一度行うようお願いします。
             * ※フォロー中：フォロー解除ボタンが表示されている状態
     3. 画面左側のフォローボタンをクリック
     4. フォロー解除ボタンが表示出来たら成功
7. ユーザーのフォロー解除
     1. ※1→4の順にの操作を行ってから進めてください
         * ∵ログインかつフォローしていない※状態だと「＋」ボタンが表示されないため
             * ※フォローしていない：フォローボタンが表示されている状態
     1. 作品一覧画面を開く
         * 作品一覧画面URL：http://localhost:3001/artworks/
     2. フォロー中※のユーザのプロフィール画面を開く
        1. ※フォロー中：フォロー解除ボタンが表示されている状態
        2. ※フォローしていないユーザであれば、お手数ですが一度作品一覧へ戻っていただき、別のフォロー中のユーザに対して上記操作をもう一度行うようお願いします。
            * ※フォローしていない：フォローボタンが表示されている状態
            * 作品一覧画面URL：http://localhost:3001/artworks/
     3. 画面左側のフォロー解除ボタンをクリック
     4. フォローボタンが表示出来たら成功

## 6. その他のコマンド
#### 1. 停止したコンテナをもう一度起動
```
docker compose up -d
```
#### 2. コンテナの停止
```
# 全体
docker stop $(docker ps -q)

# appコンテナ
docker stop $(docker ps -f "name=app" -q)

# dbコンテナ
docker stop $(docker ps -f "name=db" -q)
```
#### 3. コンテナの再起動
```
# 全体
docker restart $(docker ps -q)

# appコンテナ
docker restart $(docker ps -f "name=app" -q)

# dbコンテナ
docker restart $(docker ps -f "name=db" -q)
```
#### 4. コンテナ/イメージ/ボリュームの削除
```
# [y/N]?の質問が来るため、削除したいときはy、そうでなければN
docker system prune -a

# [y/N]?の質問を省略して強制削除
docker system prune -af
```
#### 5. プロジェクトの削除
```
rm -rf .\polygonal-auxions\
```
※上記コマンドで削除できない場合は、お手数ですがマウス操作で削除をお願いいたします。
