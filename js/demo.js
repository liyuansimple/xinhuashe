
const $body = $("body");
// 定义相机、场景、渲染器
let camera, scene, renderer;
// swiper
let certifySwiper;
// 每次翻转角度
let yaxis = 0;

// 控制器
let objects = [];
let targets = {table: [], sphere: [], helix: [], grid: []};

// fov — 摄像机视锥体垂直视野角度
// aspect — 摄像机视锥体长宽比
// near — 摄像机视锥体近端面
// far — 摄像机视锥体远端面
let cameraFov = 45;
let cameraAspect = window.innerWidth / (window.innerHeight * 0.6);
let cameraNear = 1;
let cameraFar = 10000;

// renderSW - 场景宽
// renderSH - 场景高
let renderSW = window.innerWidth, renderSH = window.innerHeight * 0.6;

// dom
let eleDom = [1,1,2,2,2,2,3,3,3,4,4,4,4,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,6,6,6,6,4,4,4,4,5,5,5,6,6,6,6,7,9,9,6,6,6];

let eleDom2 = [
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '250px', height: '120px'}, // 22
    {width: '400px', height: '250px'},
    {width: '250px', height: '120px'}, //
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '500px', height: '350px'}, // 30
    {width: '500px', height: '350px'},
    {width: '500px', height: '350px'},
    {width: '500px', height: '350px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '250px', height: '150px'}, // 38
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},
    {width: '400px', height: '250px'},

];
// location
let pos = [
            [-2.40798833966255,1.52170333333333,-0.137058090418576],
            [-1.56462407112121,1.83836977183818,0.0448803901672367],
            [-2.31023931503295,1.82965514063835,-0.500449195504188],
            [-1.8349099999999998,1.937106666666,-0.206455089151858], //3
            [-1.34983897209167,2.03832358121871,-0.0958105493336911],
            [1.9593966666666665,1.9754766666666668,0.10599609464407],
            [-1.92601077258586,0.82216739654541,0.211208499968052],
            [-2.25729498267173,0.168560206890106,-0.0679101794958114],
            [-2.00267666666666,0.359638072550296,0.132231444120407],
            [-2.08415055274963,-0.45967561006546,-0.491992205381393],
            [-2.46873000000000,0.6429699999999999,-0.031281739473343], // 8
            [-1.695625141263,-0.884929850697517,-0.477458506822586],
            [-1.4964502453804,-0.456384003162384,0.162302261218428],
            [-0.894731491804122,-0.78337100893259,0.310004895552992],
            [-1.7297833333333332,-0.0463833333333,-0.38955813087523], //12
            [2.27238299325108,1.86716927886009,-0.385800793766975],
            [1.9544728398323,1.16687080264091,0.0847412198781969],
            [2.407988473773,1.25746285170316,-0.431001007556915],
            [1.87509760260581,-0.377654135227203,-0.253149420022964],
            [2.08495110869407,0.614320707321166,0.197983413934707], // 19
            [2.06079584360122,-0.0178848356008529,-0.154606938362121],
            [0.9136296,1.6354413333333333,0.0465747416019443],
            [-1.09947766666666,2.30039333333333,-0.13666666666666], // 22
            [-0.76706866666666,1.60803666666666,0.197573333333333],
            [1.806962933333333,2.28774666666666,0.0465747416019443], //
            [-0.99018,1.1446266666666667,0.400043979287147], // 25
            [1.696144333333333,1.16706,0.4424666666666667],
            [1.610593333333333,1.920236666666666,0.420566666666666], // 27
            [1.331455135345459,1.460897839069366,0.421240273863077],
            [0.978105530142784,0.997280892916023,0.375271033495664],
            [0.65448,-0.275210893154144,0.500449235551059], // 30 bottom right
            [-1.0878133333333333,0.9309866666666666,0.500449235551059], // 31 // top left
            [-1.0878133333333333,-0.275210893154144,0.500449235551059], // 32 bottom left
            [0.65448,0.9309866666666666,0.500449235551059], // 33  top right
            [-0.529409226030111,0.460615247488021,0.050746666666666],
            [-0.32379884943366,-0.100115031003952,0.300449235551059],
            [-0.711079090833663,-1.43642696738243,0.072714805603027],
            [-0.0723486468195915,-2.03959016501903,-0.0985888801515107],
            [0,-2.84108306169509,-0.364443391561508], // 38
            [-0.711079090833663,-1.43642696738243,0.072714805603027],
            [0.372255831956863,-1.80680816993117,-0.143198259174824],
            [-0.2023486468195915,-2.03959016501903,-0.0985888801515107], // 41
            [0.76503911614418,-1.42408013343811,-0.112155735492706],
            [-0.207832038402557,-1.1634587906301,0.347370639443397],
            [0.409809581935405,-1.04789178073406,0.302617214620113],
            [1.12056150473654,-1.24467080831527,-0.39477782510221],
            [0.702016562223434,-1.06706488132476,0.1921191457659],
            [1.42142578959465,-0.665999203920364,-0.0291332993656398],
            [0.702016562223434,-1.06706488132476,0.1921191457659],
            [1.616763333333333,-0.25723999999999,0.249821761623024], // 49
            [1.42142578959465,-0.665999203920364,-0.0291332993656398],
            [2.39784657955169,0.549146130681038,-0.329694807529449],
            [-0.0897120237350463,-0.451770022511482,0.494736343622207],
            [1.54278314113616,0.357058718800544,0.265285655856132],
            [1.11916511133313,1.72302258014678,0.134899914264679],
            [1.0774854235351,2.14108352363109,-0.240776367485522],
            [0.450371146202087,1.8003437668085,-0.062062986195087],
            [1.11916511133313,1.72302258014678,0.134899914264679],
            [1.72095227241516,2.10404190421104,-0.369282215833663],
            [1.0774854235351,2.14108352363109,-0.240776367485522],
        ];



// 定义当前正在使用的图片场景
let activeScene = 0;
// 图片对象
let imgArrCount = [
  [
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner4.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner5.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner6.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner7.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner8.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner8.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner7.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner6.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner5.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner4.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner8.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner8.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner7.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner6.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner5.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner4.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner3.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner1.jpg"},
      {text:"病毒无情,人间有爱;勇毅笃定,战无不胜",src:"images/banner2.jpg"},
  ],
  [
    {text:"疫情终会过去,静候春暖花开",src:"images/banner3.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner3.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner4.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner5.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner6.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner7.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner8.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner3.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner3.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner3.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner3.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner3.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner3.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner1.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner2.jpg"},
    {text:"疫情终会过去,静候春暖花开",src:"images/banner3.jpg"},
  ],
  [
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner3.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner1.jpg"},
    {text:"病毒无情,人间有情",src:"images/banner2.jpg"},
  ]
];

/**
 * @Description: 初始化相机
 * @author li yuan
 * @date 2020/6/10
 */
function initCamera() {
	// 定义透视相机
	camera = new THREE.PerspectiveCamera(cameraFov, cameraAspect, cameraNear, cameraFar);
	// 定义相机z轴
	camera.position.z = 3000;
}

/**
 * @Description: 初始化场景
 * @author li yuan
 * @date 2020/6/10
 */
function initScene() {
	// 初始化场景
	scene = new THREE.Scene();
}

/**
 * @Description: 初始化渲染对象
 * @author li yuan
 * @date 2020/6/10
 */
function initRender() {
  // body...
  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(renderSW, renderSH);
  renderer.domElement.style.position = 'absolute';
  document.getElementById('container').appendChild(renderer.domElement);
}

/**
 * @Description: 创建对象
 * @author li yuan
 * @date 2020/6/9
 */
function createObject() {
 	// body...
 	for (let i = 0; i < eleDom2.length; i ++) {
    // 父级
    let element = document.createElement('div');
    element.className = 'element';
    element.style.cssText = `width:${eleDom2[i].width};height:${eleDom2[i].height}`;
    // element.style.backgroundColor = 'rgba(127,127,127,' + (Math.random() * 0.5 + 0.25) + ')';

    // 子级
    let symbol = document.createElement('div');
    symbol.className = 'symbol';

    let text = document.createElement('span');
    text.className = 'hidden';
    text.innerText = i.toString();
    // img
    let img = document.createElement('img');
    img.className = "heart";
    img.src = imgArrCount[activeScene][i].src;
    img.style.cssText = `width:${eleDom2[i].width};height:${eleDom2[i].height}`;

    //
    symbol.appendChild(text);
    symbol.appendChild(img);
    element.appendChild(symbol);
    // 转化为3D对象
    let object = new THREE.CSS3DObject(element);
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add(object);
    objects.push(object);
  }
    // 
  let vector = new THREE.Vector3();
  for (let i = 0, l = objects.length; i < l; i++) {
    let object = new THREE.Object3D();
    object.position.x = 300 * pos[i][0];
    object.position.y = 300 * pos[i][1];
    object.position.z = 300 * pos[i][2];
    vector.copy(object.position).multiplyScalar(2);
    object.lookAt(vector);
    targets.sphere.push(object);
  }
}

/**
 * @Description: n个图片合成一个心形的效果
 * @author li yuan
 * @date 2020/6/10
 * @param {Array} targets 最终运动的3D轨迹对象
 * @param {Number} duration 动画的过渡时间
 */
function transform(targets, duration) {
	// body...
	TWEEN.removeAll();
	// 
	for (let i = 0; i < objects.length; i++) {
    let object = objects[i];
    let target = targets[i];
    new TWEEN.Tween(object.position)
      .to({
          x: target.position.x,
          y: target.position.y,
          z: target.position.z
      }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}

/**
 * @Description: 动画翻转并改变图片
 * @author li yuan
 * @date 2020/6/10
 * @param {Array} targets 最终运动的3D轨迹对象
 * @param {Number} duration 动画的过渡时间
 * @param {Array} imgArr 翻转后的图片
 * @param {Number} yaxis 翻转角度
 */
function transformZ(targets, duration, imgArr = imgArrCount[activeScene], yaxis = 3) {
  // body...
  TWEEN.removeAll();
  // 
  for (let i = 0; i < objects.length; i++) {
    let object = objects[i];

    let t = new TWEEN.Tween( object.rotation )
      .to( { x: 0, y: yaxis, z: 0 }, 1000 )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();

    t.onUpdate(function (c) {
      if (c > 0.5) {
        $(object.element).find('img').attr('src',imgArr[i].src);
      }
    });
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}

/**
 * @Description: 动画
 * @author li yuan
 * @date 2020/6/10
 * @param {类型} 参数名 描述
 * @return {类型} 描述
 */
function animate() {
	// body...
	requestAnimationFrame(animate);
  TWEEN.update();
}

/**
 * @Description: 屏幕缩放
 * @author li yuan
 * @date 2020/6/10
 */
function onWindowResize() {
  camera.aspect = cameraAspect;
  camera.updateProjectionMatrix();
  renderer.setSize(renderSW, renderSH);
  render();
}

/**
 * @Description: 渲染
 * @author li yuan
 * @date 2020/6/10
 */
function render() {
  renderer.render(scene, camera);
}

/**
 * @Description: three 初始化
 * @author li yuan
 * @date 2020/6/10
 * @param {function} resolve 成功回调
 */
function init(resolve) {
	// 初始化相机
	initCamera();
	// 初始化场景
	initScene();
	// 创建3d对象
	createObject();
  // 初始化渲染器
	initRender();
  // render();
	transform(targets.sphere, 2000);
	// 动画
	animate();
  // 2秒后执行回调
  setTimeout(function () {
    resolve();
  },2000);
	// 监听屏幕缩放
	window.addEventListener('resize', onWindowResize, false);
}

/**
 * @Description: 进度条控制
 * @author li yuan
 * @date 2020/6/10
 * @param {function} resolve 成功后回调
 */
function progresSpeed(resolve) {
  // body...
  let progressArr = [5,10,40,60,75,100];
  //
  let i = 0;
  //
  let t = setInterval(function () {
    // body...
    $('#progress-bar').css({width:progressArr[i]+'%'});
    i++;
    if (i > progressArr.length) {
      clearInterval(t);
      resolve();
    }
  },500);
}

/**
 * @Description: 初始化swiper对象
 * @author li yuan
 * @date 2020/6/10
 */
function initSwiper() {
    if (certifySwiper) {
        certifySwiper.destroy();
    }
  certifySwiper = new Swiper('#persons .swiper-container', {
      watchSlidesProgress: true,
      slidesPerView: 3,
      spaceBetween : -70,
    centeredSlides: true,
    loop: true,
    loopedSlides: 5,
    // observer:true,//修改swiper自己或子元素时，自动初始化swiper
    // observeParents:true,//修改swiper的父元素时，自动初始化swiper
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
      onClick: function(swiper){
          //some code
          console.log(swiper.clickedIndex);
          //  索引
          let index = swiper.clickedIndex-5;
          // 点击对象
          let imgObject = imgArrCount[activeScene][index];
          // 点击效果
          setEffect($(".element").eq(index));
          // 打开详情
          openDetail(imgObject);
      },
    // pagination: {
    //   el: '.swiper-pagination',
    //   //clickable :true,
    // },
      onProgress: function(swiper) {
          setTimeout(function () {
              $(swiper.container).find('.swiper-slide').css({'zIndex':9});
              let prev = $(swiper.container).find('.swiper-slide-prev:not(".swiper-slide-active")').prev();
              if (prev.length == 0) {
                  $(swiper.container).find('.swiper-slide:last').css({'zIndex':11});
              } else {
                  prev.css({'zIndex':11});
              }
          },10);
      },
    on: {
      progress: function() {
        for (let i = 0; i < this.slides.length; i++) {
          let slide = this.slides.eq(i);
          let slideProgress = this.slides[i].progress;
          let modify = 1;
          if (Math.abs(slideProgress) > 1) {
            modify = (Math.abs(slideProgress) - 1) * 0.4 + 1;
          }
          let translate = slideProgress * modify * 150 + 'px';
          let scale = 1 - Math.abs(slideProgress) / 8;
          let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
          slide.transform('translateX(' + translate + ') scale(' + scale + ')');
          slide.css('zIndex', zIndex);
          slide.css('opacity', 1);
          if (Math.abs(slideProgress) > 3) {
            slide.css('opacity', 0);
          }
        }
      },
      setTransition: function(transition) {
        for (let i = 0; i < this.slides.length; i++) {
          let slide = this.slides.eq(i);
          slide.transition(transition);
        }
      }
    }
  });
}

/**
 * 动态生成swiper slide 对象
 */
/**
 * @Description: 动态生成swiper slide 对象
 * @author li yuan
 * @date 2020/6/10
 * @param {Array} imgArr 当前显示的图片对象
 */
function createSlide(imgArr = imgArrCount[activeScene]) {
  // body...
  let slideEle = "";
  // 
  for (let item of imgArr) {
    slideEle += 
      `<div class="swiper-slide">
        <img src="${item.src}" alt="" />
      </div>`;
  }
  // 
  $("#swiper-wrapper").html(slideEle);
}

/**
 * @Description: 打开详情页
 * @author li yuan
 * @date 2020/6/12
 * @param {类型} containerObject 详情页显示的内容和文字对象
 */
function openDetail(containerObject) {
	// body...
  $body.find('.detail-layer').fadeIn(300);
  $body.find('.detail-layer').find('.detail-text').text(containerObject.text);
  $body.find('.detail-layer').find('.detail-img img').attr('src',containerObject.src);
}

/**
 * 设置心形点击效果
 */
function setEffect(ele) {
  // body...
  $(".element").removeClass("element-active");
  ele.addClass("element-active");
}

// 流程控制
// 1、加载页进度条显示
let stag = new Promise(progresSpeed)
// 2、加载页隐藏、动画页显示 并初始化 swiper切换
.then(function () {
    // body...
    return new Promise(function (resolve, reject) {
        // body...
        $("#loadPage").fadeOut(200);
        $('#animatePage').fadeIn(200);
        // 
        setTimeout(function () {
            // body...
            createSlide(imgArrCount[activeScene]);
            initSwiper();
            resolve();
        },200);
    });
})
// 3、初始化心形动画
.then(function (argument) {
    // body...
    return new Promise(init);
});


/**
 * 点击心形图片对象 
 * 1、显示点击效果
 * 2、打开详情页
 */
$body.on('click','.element',function (argument) {
    // 索引
    let index = $(this).index();
    // 点击对象
    let imgObject = imgArrCount[activeScene][index];
    // 点击效果
    setEffect($(this));
    // 打开详情
	openDetail(imgObject);
    // 切换swiper
    certifySwiper.slideTo(index+5,1000, false);
});

/**
 * 点击swiper图片对象 
 * 1、打开详情页
 */
// $body.on("click",".swiper-slide",function(){
//     //  索引
//     let index = $(this).attr("data-swiper-slide-index");
//     // 点击对象
//     let imgObject = imgArrCount[activeScene][index];
//     // 点击效果
//     setEffect($(".element").eq(index));
//     // 打开详情
//     openDetail(imgObject);
// });

/**
 * 关闭详情
 */
$body.on('click','.detail-box',function (argument) {
    // body...
  let text = $(this).closest('.detail-layer').fadeOut(300);
});







const app = document.querySelector('#container');
const hammertime = new Hammer(app);
hammertime.on('swipeleft', function(ev) {
    toggleHeart('left');
});
hammertime.on('swiperight', function(ev) {
    toggleHeart('right');
});

/**
 * @Description: 切换心形
 * @author li yuan
 * @date 2020/6/12
 * @param {string} direction 方向 left / right
 */
function toggleHeart(direction) {
    // body...
    if (direction == 'left') {
        activeScene = activeScene >= imgArrCount.length-1 ? 0 : ++activeScene;
    } else if (direction == 'right') {
        activeScene = activeScene <= 0 ? imgArrCount.length-1 : --activeScene;
    } else {
        return false;
    }
    let activeImg = imgArrCount[activeScene];
    // 重新创建dom
    createSlide(activeImg);
    //
    initSwiper();
    // 翻转心形
    transformZ(targets.sphere,1000,activeImg, 6.2*activeScene);
    animate();
}