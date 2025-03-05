# Polygonal Auxions
## 注意
* **Windows PowerShellでのコマンド操作を想定しております。**
## アプリケーションの起動方法
```
# プロジェクトのディレクトリを作成し、そのディレクトリへ移動
mkdir Y1K8M2NT1RK_projects
cd .\Y1K8M2NT1RK_projects\

# Gitのクローン
git clone https://github.com/Y1K8M2NT1RK/polygonal-auxions.git

# プロジェクトのディレクトリへ移動
cd .\polygonal-auxions\

# dockerコンテナのビルド/起動
docker compose up -d --build

# ※appコンテナのログで下記のエラーが出力された場合は、次のコマンドを実行してください。
ERROR: exec /entrypoint.sh no such file or directory
COMMAND: git config --global core.autocrlf input

# polygonal-auxions/package.json（Dockerfile.appと同じディレクトリ）で用意されたライブラリをインストール
# インストールに数分時間を要するためしばらく待機
docker compose exec app npm install

# appコンテナの再起動
docker restart $(docker ps -f "name=app" -q)

# appコンテナをもう一度起動（もし止まった場合は、お手数ですがもう一度お願いいたします）
docker compose up -d
```
ここまで操作したら、[http://localhost:3001/](http://localhost:3001/)をブラウザのURLに入力します。
下の画像の画面が開いたら、起動完了です。
![スクリーンショット 2025-02-18 151619](https://github.com/user-attachments/assets/56733872-b8b7-4b89-9c48-841a03547464)

## 利用できる画面/機能
2025年2月18日現在、下記5つの画面/機能が利用できます。
* サンプルアカウント
   * メールアドレス： `abcd@efgh.jp`
   * パスワード： `0000`
* ログインの方法
   1. ヘッダーのログインボタンをクリック
   2. サンプルアカウントのメールアドレスとパスワードを入力
   3. ログインボタンをクリック
* ログアウトの方法
   1. 右上のアイコンをクリック
   2. ログアウトボタンをクリック
1. [ホーム](http://localhost:3001/)
   * ログインの有無で画面の内容が変わります。
2. [作品一覧](http://localhost:3001/artworks)
   * お気に入り（赤いハートマーク）やブックマーク（青いしおりマーク）も利用できます。
4. [作品詳細](http://localhost:3001/artworks/cm7a2x3l9000fs44rnvo2eyvy)
   * [作品一覧](http://localhost:3001/artworks)でいずれかの作品をクリックすることで同画面が閲覧できます。
5. [作品追加](http://localhost:3001/artworks/add)
   * 実際に作品を追加することもできます。操作方法は下記のとおりです。
      1. 作品名と説明文を入力
      2. 追加ボタンをクリック
6. [プロフィール](http://localhost:3001/profile/bob_bob_l)
   * [作品一覧](http://localhost:3001/artworks)でいずれかのアカウントのアイコンとユーザー名をクリックすることで同画面が閲覧できます。
   * 右上のアイコンをクリックし、プロフィールボタンをクリックすることで、自身のプロフィールが閲覧できます。

## その他のコマンド
### 停止したコンテナをもう一度起動
```
docker compose up -d
```
### コンテナの停止
```
# 全体
docker stop $(docker ps -q)

# qppコンテナ
docker stop $(docker ps -f "name=app" -q)

# dbコンテナ
docker stop $(docker ps -f "name=db" -q)
```
### コンテナの再起動
```
# 全体
docker restart $(docker ps -q)

# qppコンテナ
docker restart $(docker ps -f "name=app" -q)

# dbコンテナ
docker restart $(docker ps -f "name=db" -q)
```
### コンテナ/イメージ/ボリュームの削除
```
# [y/N]?の質問が来るため、削除したいときはy、そうでなければN
docker system prune -a

# [y/N]?の質問を省略して強制削除
docker system prune -af
```
### プロジェクトの削除
```
rm -rf .\polygonal-auxions\
```
※上記コマンドで削除できない場合は、お手数ですがマウス操作で削除をお願いいたします。
