let pictures = new Array("https://lisanavi.github.io/archive/img/1F_Ar1.png","https://lisanavi.github.io/archive/img/2F_Ar1.png","https://lisanavi.github.io/archive/img/3F_Ar1.png","https://lisanavi.github.io/archive/img/4F_Ar1.png");
let img_height = 1350;
let img_width = 1651;
let zoomlevel = 1;
let img = document.getElementById("image");
let room = "";
let dayroom = "";
let floornum = 1;
let container = document.getElementById("container");
let h1 = document.getElementById("highlight");
let h2 = document.getElementById("cls-highlight");
let getTime = 0;

h1.onanimationend = function () {
    h1.classList.remove("show");
}
h2.onanimationend = function () {
    h2.classList.remove("show");
}

// Search room by input roomnumber
function showup(rn)
{
    room = rn;
    afloor=data[room]["floor"][0];
    img.src = pictures[afloor];

}

// Change floor
function flchange(num)
{
  floornum=num;
    img.src=pictures[floornum];
}
function clschange(num)
{
    dayroom = num;
    if (dayroom != "" && dayroom[0] == floornum+1 && h2.style.visibility == "hidden")
    {
        // 大きさを計算して座標配置
        h2.style.width = ( data[dayroom][2] - data[dayroom][0] ) + "px";
        h2.style.height = ( data[dayroom][3] - data[dayroom][1] ) + "px";
        h2.style.left = data[dayroom][0] + "px";
        h2.style.top = data[dayroom][1] + "px";
        h2.style.visibility = "visible";
        h2.classList.add("show");
        h2.style.zIndex = 1;
    }
}

function btn_set(){
    for (let i = 101;i<=431;i++){
        if(i == 154){
            i = 201;
        }
        else if (i == 240){
            i = 301;
        }
        else if(i == 340){
            i = 401;
        }
        var btn_setX = document.getElementById("setX");
        var btn_setY = document.getElementById("setY");
        btn_setX = (data[i][2] + data[i][0]) / 2;
        btn_setY = (data[i][3] + data[i][1]) / 2;
        document.getElementById(setting_button);

        var btn_sizeX = document.getElementById("sizeX");
        var btn_sizeY = document.getElementById("sizeY");
        btn_sizeX = data[i][2] - data[i][0];
        btn_sizeY = data[i][3] - data[i][1];
    }

}

function zoomin() {
    if (zoomlevel < 2) {
        zoomlevel += 0.05;
        container.style.scale = zoomlevel;
    }
}

function zoomout() {
    if (zoomlevel > 0.5) {
        zoomlevel -= 0.05;
        container.style.scale = zoomlevel;
    }
}

window.onload = function(){
    // 画像プリロード
    getImages();
    
}

// 画像プリロード用関数
function getImages(){
    for (i = 0; i < pictures.length; i++){
        var img = document.createElement('img');
        img.src = pictures[i];
    }
}

//ピンチ機能
const touchContainer = document.getElementById('display');
const image = document.getElementById('container');
let touchScale = 1;
let initialDistance = 0;
let initialScale = 1;

touchContainer.addEventListener('touchstart', function (event) {
    if (event.touches.length === 2) {
        initialDistance = getDistance(event.touches[0], event.touches[1]);
        initialScale = touchScale;
        event.preventDefault();
    }
});

touchContainer.addEventListener('touchmove', function (event) {
    if (event.touches.length === 2) {
    const distance = getDistance(event.touches[0], event.touches[1]);
    const scaleChange = distance / initialDistance;

    if (initialScale * scaleChange >= 0.2 && initialScale * scaleChange <= 5.0) { // 拡大縮小制限
        touchScale = initialScale * scaleChange;
        // image.style.transform = `scale(${touchScale})`;
        image.style.scale = touchScale;

        event.preventDefault();
        }
    }
});

function getDistance(touch1, touch2) {
    const x = touch1.pageX - touch2.pageX;
    const y = touch1.pageY - touch2.pageY;

    return Math.sqrt(x * x + y * y);
}

function getSecond(getTime){
    var oldTime = getTime;
    var newTime = Date.now();
    getTime = newTime - oldTime;

    return getTime
}
