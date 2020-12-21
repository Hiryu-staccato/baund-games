var startDivided = document.getElementById("start");
var ExplainDivided = document.getElementById("explain");
var resultDivided = document.getElementById("GAMEOVER");
var tweetDivided = document.getElementById('tweet-area');

//バーのマウス位置を設定
var rectx;
var recty;
//ゲーム結果の表示位置
var resultx = 130;
var resulty = 300;
//スコアカウンターの表示位置
var pointx = 365;
var pointy = 35;
//表示用カウンターの表示位置
var timex = 135;
var timey = 35;
//カウントするための初期数値と制限時間
var framcount = 0;
var framtime = 1800;
//球の初期位置の変数設定
var placeX;
var placeY;
//球の速度
var speedX = 5;
var speedY = 6;
//お邪魔バーの初期位置の変数設定
var TargetplaceX;
var TargetplaceY;
//お邪魔バーの速度
var TargetspeedX = 4;
//スコアの初期値を設定
var count = 0;
//時間設定（秒）
var framtimes = 30;
//球の初期の出現方向のためのランダム
var ball_direction= Math.floor(Math.random() * 100);



function setup() {
  //キャンバスの作成
  createCanvas(500, 700);
  //球の毎秒表示するフレーム数を指定（更新設定）
  frameRate(60);
  //球の位置を設定
  placeX = random(25, width - 75);
  placeY = 150;
  //球の初期出現方向の具体的な設定
  if(ball_direction>50){
    speedX = speedX*-1
  }
  //お邪魔バーの初期位置を設定（0~(幅-的の長さ)の内、ランダムで移動開始）
  TargetplaceX = random(50, width - 275);
  TargetplaceY = 100;
}


function mouseDragged() {
  //マウスの位置を指定
  rectx = mouseX - 45;
  recty = height - 150;
  //マウスの可動範囲を指定
  if (rectx < 25) {
    rectx = 25;
  } else if (rectx > width - 115) {
    rectx = width - 115;
  }
}


//ボタンを押したときのリロード機能
startDivided.onclick = function () {
  location.reload();
}



//約1秒ごとに残り時間を引いていく（タイムカウンター）
setInterval(timecount, 999)


function draw() {
  //球とバーの軌跡を消す
  background(255);

  //キャンバスの枠
  stroke(47, 138, 168);
  strokeWeight(40);
  fill(255);
  rect(0, 20, 500, 680);

  //球とバーの色を塗る
  fill(100);
  noStroke();

  //球を描画
  ellipse(placeX, placeY, 50, 50);
  //球の座標を更新
  placeX = placeX + speedX;
  placeY = placeY + speedY;
  //円が画面の左・右端に到達した場合
  if (placeX < 40 || placeX > width - 40) {
    //X軸の速度を反転
    speedX = speedX * -1;
  }
  //円が画面の上に到達した場合
  if (placeY < 60) {
    speedY = speedY * -1;
    Score();
  }
  //円が画面の下に到達した場合
  if (placeY > height - 40) {
    speedY = speedY * -1;
  }


  //バーを表示
  rect(rectx, recty, 90, 20);
  //バーの当たり判定
  if (placeX <= rectx + 90 && placeX >= rectx && placeY <= recty + 20 && placeY >= recty) {
    speedY = speedY * -1;
  }
//ボタンが押されている間にバーに球が当たった場合、来た方向に帰っていく
if(keyIsPressed === true){
  if (placeX <= rectx + 90 && placeX >= rectx && placeY <= recty + 20 && placeY >= recty) {
    speedX = speedX * -1 ;
    console.log("OK!");
  }
}




  //お邪魔バーの座標を更新
  TargetplaceX = TargetplaceX + TargetspeedX;
  TargetplaceY = TargetplaceY;
  fill(50);
  //お邪魔バーの描画
  rect(TargetplaceX, TargetplaceY, 100, 5);
  //お邪魔バーが壁にぶつかったら、反対に進む
  if (TargetplaceX < 20 || TargetplaceX > width - 120) {
    TargetspeedX = TargetspeedX * -1;
  }
  //お邪魔バーの当たり判定（当たったら、draw()の動きを止め、"GEME OVER"を出す）
  if (placeX + 20 <= TargetplaceX + 100 && placeX + 20 >= TargetplaceX && placeY + 20 <= TargetplaceY + 5 && placeY + 20 >= TargetplaceY || placeX <= TargetplaceX + 100 && placeX >= TargetplaceX && placeY <= TargetplaceY + 5 && placeY >= TargetplaceY) {
    noLoop();
    Lose();
  }


  //フレームレートの数で時間制限を作るー"YOUR WIN"を表示
  framcount++;
  if (framcount >= framtime) {
    noLoop();
    var ctx = document.getElementById('defaultCanvas0').getContext('2d');
    ctx.font = "40px serif";
    ctx.fillText("YOUR WIN", resultx, resulty);
  }

  //表示用タイマーとポイントカウンターの色
  fill(255);
  //残り時間の表示
  var Point = document.getElementById('defaultCanvas0').getContext('2d');
  Point.font = "40px serif";
  Point.fillText("残り　"+ framtimes + "秒", timex, timey);
  //ポイントカウンターの関数
  fill(200,234,255);
  Pointcounter();
}




//時間を計算する
function timecount() {
  framtimes = framtimes - 1;
}


//"GAME OVER"を出現させる
function Lose() {
  var ctx = document.getElementById('defaultCanvas0').getContext('2d');
  ctx.font = "40px serif";
  ctx.fillText("GAME OVER", resultx, resulty);
}

//スコアのカウント機能
function Score() {
  count++;
}

//スコアポイントカウンター
function Pointcounter() {
  var Point = document.getElementById('defaultCanvas0').getContext('2d');
  Point.font = "27px serif";
  Point.fillText(count + "ポイント", pointx, pointy);
}



//３：ランキング機能の設置
//４：デザインで遊ぶ
//リバース中、なんらかのマーク（仕組みも説明）

//canvasをdivに貼り付ける（名前をつける）→canvasを作る
//githubにディレクトリごとassessmentみたく
//https://あなたのユーザー名.github.io/〜〜.htmlでgitに上げていればアクセスできる
//branch mainでは編集する大元であって、ghpagesを作る