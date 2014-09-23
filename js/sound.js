//------------------------------------------------------------------------------
//  音が鳴るように準備する
//------------------------------------------------------------------------------

//  音階を設定
var pitch = [
    220 * Math.pow( 1.06, 3 ),  //  ド
    220 * Math.pow( 1.06, 4 ),  //  ド#
    220 * Math.pow( 1.06, 5 ),  //  レ
    220 * Math.pow( 1.06, 6 ),  //  レ#
    220 * Math.pow( 1.06, 7 ),  //  ミ
    220 * Math.pow( 1.06, 8 ),  //  ファ
    220 * Math.pow( 1.06, 9 ),  //  ファ#
    220 * Math.pow( 1.06,10 ),  //  ソ
    220 * Math.pow( 1.06,11 ),  //  ソ#
    440,                        //  ラ
    440 * Math.pow( 1.06, 1 ),  //  ラ#
    440 * Math.pow( 1.06, 2 ),   //  シ
    440 * Math.pow( 1.06, 3 ),  //  ド
    440 * Math.pow( 1.06, 4 ),  //  ド#
    440 * Math.pow( 1.06, 5 ),  //  レ
    440 * Math.pow( 1.06, 6 ),  //  レ#
    440 * Math.pow( 1.06, 7 ),  //  ミ
    440 * Math.pow( 1.06, 8 ),  //  ファ
    440 * Math.pow( 1.06, 9 ),  //  ファ#
    440 * Math.pow( 1.06,10 ),  //  ソ
    440 * Math.pow( 1.06,11 ),  //  ソ#
    880,                        //  ラ
    880 * Math.pow( 1.06, 1 ),  //  ラ#
    880 * Math.pow( 1.06, 2 ),  //  シ
    880 * Math.pow( 1.06, 3 ),
    880 * Math.pow( 1.06, 4 ),  //  ド#
    880 * Math.pow( 1.06, 5 ),  //  レ
    880 * Math.pow( 1.06, 6 ),  //  レ#
    880 * Math.pow( 1.06, 7 ),  //  ミ
    880 * Math.pow( 1.06, 8 ),  //  ファ
    880 * Math.pow( 1.06, 9 ),  //  ファ#
    880 * Math.pow( 1.06,10 ),  //  ソ
    880 * Math.pow( 1.06,11 ),  //  ソ#
    1760,                        //  ラ
    1760 * Math.pow( 1.06, 1 ),  //  ラ#
    1760 * Math.pow( 1.06, 2 ),  //  シ
    1760 * Math.pow( 1.06, 3 )
];

var key = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

var diatonic = [
    0, 2, 4, 5, 7, 9, 11,
    12, 14, 16, 17, 19, 21, 23,
    24
];

var keyScale = 0;
var lx = 0;

var gAudioContext   = new AudioContext();
var gOscillatorNode = gAudioContext.createOscillator();
var gGainNode       = gAudioContext.createGain();

gOscillatorNode.connect( gGainNode );
gGainNode.connect( gAudioContext.destination );

gGainNode.gain.value = 0;

gOscillatorNode.type = 'sawtooth';
gOscillatorNode.frequency.value = 220;
gOscillatorNode.start(0);

changeInterval = function(){
            var freqs = keyScale + diatonic[Math.floor( clamp( lx ) / 67 )];
            console.log(freqs);
            gOscillatorNode.frequency.value = pitch[ freqs ];
};

//------------------------------------------------------------------------------
//  照度を 0 から 1000 の間におさめる
//------------------------------------------------------------------------------
clamp = function( lx ){
	if( lx > 1000 ) return 1000;
	else if( lx < 0 ) return 0;
	else return lx;
};

//------------------------------------------------------------------------------
//  照度センサーの値が変わると呼ばれる関数
//
//  lx 明るさ (単位ルクス)
//------------------------------------------------------------------------------
changeSound = function( luminous ) {
            lx = luminous;
            changeInterval();
};

//------------------------------------------------------------------------------
//  画面がクリックされたら呼ばれる
//------------------------------------------------------------------------------
changeKey = function( key ){
    //console.log(key);
    if(key<pitch.length){
        keyScale = key;
        changeInterval();
    }
};

//------------------------------------------------------------------------------
//  ミュートする
//
//  mute が true だったら音量を0にして false だったら音量を 1 にする
//------------------------------------------------------------------------------
setMute = function( mute ){
	if(mute == true) gGainNode.gain.value = 0;
	else gGainNode.gain.value = 0.2;
};
