
var resultDivided = document.getElementById("GAMEOVER")

//四角のマウス位置を設定
var rectx ;
var recty ;
//ゲーム結果を表示する位置
var x = 130;
var y = 300;
//ゲーム時間の初期設定と時間設定
var framcount;
var framtime = 900;
//勝ちの表記と負けの表記が同時に出てこないようにする
var clearWin = 1;

//"GAME OVER"を出現させる
function Lose(){
 var ctx = document.getElementById('defaultCanvas0').getContext('2d');
  ctx.font = "40px serif";
  ctx.fillText("GAME OVER", x , y );
}

function setup() {
  //キャンバスの作成
  createCanvas(500, 700);
  //円の毎秒表示するフレーム数を指定（更新設定）
  frameRate(60);
  framcount=0;
    //円の初期位置を設定
    placeX = random(25,width-75);
    placeY = 150;
    //円の速度
    speedX = 4;
    speedY = 3;

    //的の初期位置を設定（0~(幅-的の長さ)の内、ランダムで移動開始）
    TargetplaceX = random(50,width-275);
    TargetplaceY = 100;
    //的の速度
    TargetspeedX = 4;
}

//マウス位置で四角を動かす
function mouseDragged() {
   rectx = mouseX-45;
   recty = height-150;
   //マウスを画面外に出なくする
   if(rectx < 25){
    rectx = 25;
  }else if(rectx > width-115){
    rectx = width-115;
  }
  }

//バーを生成する
function cblock(){
  rect(100,30,50,50);
}

//反射する円を設定
//円の中心位置
var placeX;
var placeY;
//円の速度
var speedX;
var speedY;

//的の中心位置
var TargetplaceX;
var TargetplaceY;
//的の速度
var TargetspeedX;

//追加スコアの初期値を設定
var count = 0;
function Count(){
  count++;
  console.log(count);
}

function draw(){
    //円と四角の最新部分を表示させる
    background(255);
    //キャンバスの枠
    stroke(47,138,168);
    strokeWeight(40);
    fill(255);
    rect(0,20,500,680);
    //円の座標を更新
    placeX = placeX + speedX;
    placeY = placeY + speedY;
    noStroke();
    //円も四角も塗りつぶし
    fill(100);
    ellipse(placeX,placeY,50,50);

    //円が画面の左・右端に到達した場合
    if(placeX < 40 || placeX > width-40){
        //X軸の速度を反転
        speedX = speedX * -1;
    }
    //円が画面の上に到達した場合
    if(placeY < 60 ){
        speedY = speedY * -1;
        Count();
    }
    //円が画面の下に到達した場合
    if(placeY > height-40){
      speedY = speedY * -1;
  }
  //四角を表示
   rect(rectx,recty,90,20);

   //バーの当たり判定
   if (placeX <= rectx+90 && placeX >= rectx   &&  placeY <= recty+20 && placeY >= recty){
    speedY = speedY * -1;
  }
　
  //移動する的の生成
  //的の座標を更新
  TargetplaceX = TargetplaceX + TargetspeedX;
  TargetplaceY =TargetplaceY;
  fill(50);
  //的を表示
  rect(TargetplaceX,TargetplaceY,100,5);
  //的が壁にぶつかったら、反対に進む
  if(TargetplaceX < 20 || TargetplaceX > width-120){
      TargetspeedX = TargetspeedX * -1;
  }
  //的の当たり判定（当たったら、draw()の動きを止め、"GEME OVER"を出す）
  if (placeX+20 <= TargetplaceX+100 && placeX+20 >= TargetplaceX   &&  placeY+20 <= TargetplaceY+5 && placeY+20 >= TargetplaceY  ||  placeX <= TargetplaceX+100 && placeX >= TargetplaceX   &&  placeY <= TargetplaceY+5 && placeY >= TargetplaceY){
    noLoop();
    Lose();
    clearWin-1;
  }
  //フレームレートの数で時間制限を作る
  framcount++;
  console.log(framcount);
  if(framcount>=framtime && clearWin==1){
    noLoop();
    var ctx = document.getElementById('defaultCanvas0').getContext('2d');
    ctx.font = "40px serif";
    ctx.fillText("YOUR WIN",x,y);
  }
}
