
//  ミュートされていたら true
var nowMute = true;

//------------------------------------------------------------------------------
//  照度を色の256段階に変換
//------------------------------------------------------------------------------
lx2Rgb = function( lx ) {
    if(lx > 1120) {
        return 0;
    }
    else {
	rgbValue = 255 - (lx/1120)*255;
	return Math.round(rgbValue);
    }
};


//------------------------------------------------------------------------------
//  照度センサーの値が変わると呼ばれる関数
//
//  lx 明るさ (単位ルクス)
//------------------------------------------------------------------------------
changeScreen = function( lx ) {

    //  文字の色を変化させて、数字を変化させる
    txRGB = lx2Rgb(lx);
    document.getElementById("print_lx").style.color = 'rgb(' + txRGB + ',' + txRGB + ', '+ txRGB + ')';
    document.getElementById("print_lx").innerHTML = lx + '[lx]';

    //  背景を変化させる
    bgRGB = 255-txRGB;
    document.body.style.backgroundColor = 'rgb(' + bgRGB + ',' + bgRGB + ', '+ bgRGB + ')';
};


//------------------------------------------------------------------------------
//  ミュートボタンが押された
//------------------------------------------------------------------------------
onMuteButton = function() {

    // 　ミュートしてなかったらミュートする
    if( nowMute ) {
        setMute( false );
	nowMute = false;;
        document.getElementById("imgButton").src = "rsrc/unmute.png";
    }

    //  ミュート状態だったらミュートにする
    else {
	setMute( true );
	nowMute = true;
        document.getElementById("imgButton").src = "rsrc/mute.png";
    }
};

//------------------------------------------------------------------------------
//  キーを並べる
//------------------------------------------------------------------------------
var onclickPos = [0, 0];
var baseWidth;
updateWindow = function(){
    var wd = window.innerWidth;
    var ht = window.innerHeight - 80;
    (wd<ht) ? (baseWidth=wd) : (baseWidth=ht);
    console.log(baseWidth);
    keys();
};

//  ボタンを4つずつ配置する
keys = function(){
    var nKeys = Math.ceil( key.length/4 );
    var keyWidth = baseWidth/4;

    var cnv = document.getElementById("keys");
    cnv.setAttribute( "width", baseWidth );
    cnv.setAttribute( "height", baseWidth*(nKeys/4) );
    var ctx=cnv.getContext("2d");
    ctx.textAlign = "center";

    for(i=0; i<nKeys; i++){
        for(j=0; j<4; j++){
            ctx.beginPath();
            var x = keyWidth*0.5 + keyWidth*j;
            var y = keyWidth*0.5 + keyWidth*i;
            ctx.arc(x, y, keyWidth*0.45, 0, Math.PI*2, true);
            if(onclickPos[0]==i && onclickPos[1]==j){
                grad = ctx.createRadialGradient(x, y, keyWidth*0.38, x, y, keyWidth*0.44);
                grad.addColorStop(0, "#f7f7f7");
                grad.addColorStop(0.5, "#e0e0e0");
                grad.addColorStop(0.75, "#a0a0a0");
                grad.addColorStop(1, "rgba(128, 128, 128, 0)");
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.fillStyle = "#c0c0c0";
            }
            else{
                grad = ctx.createRadialGradient(x, y, keyWidth*0.38, x, y, keyWidth*0.44);
                grad.addColorStop(0, "#c7c7c7");
                grad.addColorStop(0.5, "#b0b0b0");
                grad.addColorStop(0.75, "#707070");
                grad.addColorStop(1, "rgba(128, 128, 128, 0)");
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.fillStyle = "#909090";
            }
            ctx.fillText(key[4*i+j], x, y+3);
        }
    }

//  ここからクリックしたときの処理
    cnv.onclick = ( function(e){
        var rect = e.target.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        //console.log(mouseX, mouseY);

        for(i=0; i<nKeys; i++){
            for(j=0; j<4; j++){
                if(j*keyWidth<=mouseX && mouseX<(j+1)*keyWidth){
                    if(i*keyWidth<=mouseY && mouseY<(i+1)*keyWidth){
                        changeKey( 4*i+j );
                        onclickPos = [i, j];
                        updateWindow();
                    }
                }
            }
        }
    } );
};

//  起動時と画面幅が変わったら再描画する
onload = updateWindow;
window.onresize = updateWindow;

