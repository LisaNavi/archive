let colors = new Array("#ff9900","#6699ff","#66cc33","#ff3300");
let map = document.getElementById("map");
let dis_number = document.getElementById("floorid"); 
let panel = document.getElementById("information");
let inputbox = document.getElementById("input");
let schedulebox = document.getElementById("cls-table");
let tutorial = document.getElementById("tutorial");
let n = 0

// クッキーから読み込み
let userdata = {};
if (Cookies.get("data") != undefined)
{
    userdata = JSON.parse(Cookies.get("data"));
}

var now = new Date();
var nowtime = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
var floornum = 0;
var classtime = 1;
var classday = new Date().getDay();


function tap(num){

}

function floor(num)
{
    floornum = num;
    dis_number.textContent = (floornum+1) + "F";
    dis_number.style.background=colors[floornum];
    map.contentWindow.flchange(floornum);
}

function search(num){
    if (Number.isInteger(num)){
        alert("部屋番号を入力してください。");
    }
    else if (!(num > 100 && num < 1000)) {
        alert("3桁である必要があります。");
    }
    else if (!(num[0] < 5 && num[0] > 0))
    {
        alert(num[0] + "階は存在しません。");
    }
    else {
        if (typeof data[num] == "undefined"){
            alert("指定された部屋番号は登録されていません。");
        }
        else {
            map.contentWindow.room = num;
            floornum = num[0] - 1;
            map.contentWindow.flchange(num-1);
            map.contentWindow.showup(num);
            dis_number.textContent = num[0] + "F";
            dis_number.style.background=colors[num[0] - 1];
            info(num)
            click(num)
            
            
        }
        
    }
}

function info(num) {
    var info_pane = document.getElementById("information");
    var desk = document.getElementById("desk");
    var desk_num = document.getElementById("desk-num");
    var html = document.getElementById("3djpg");
    info_pane.style.visibility = "visible";
    if (data[num][4] != undefined) {
        html.src=data[num][4];
    } else {
        desk.textContent = "この教室のインフォメーションはありません";
    }
}

function click(num){
    
    const hogeElement = document.getElementById('next');
    var info_pane = document.getElementById("information");
        var html = document.getElementById("3djpg");
        info_pane.style.visibility = "visible";
        n=n+1
        hogeElement.addEventListener('click', () => {
        


        if (data[num][4+n] != undefined) {
            html.src=data[num][4+n];
        }else{
            html.src=data[num][4];
alert("この教室の画像はこれだけです。");
n=0;
        }
        


    
})
}

function inf(){

    
        alert("部屋番号を入力してください。");
    

}


function cls_close() {
    if (typeof userdata["schedule"] == "undefined")
         userdata["schedule"] = {};
    for (var day=1;day<=5;day++) {
        for (var time=1;time<=6;time++) {
            temp = document.getElementById("cls" + day + "-" + time).value;
            if (typeof data[temp] != "undefined") { //教室データに存在する場合登録
                userdata["schedule"][day + "-" + time] = temp;
            }
            else if (temp == "" && typeof userdata["schedule"][day + "-" + time] != "undefined") {
                delete userdata["schedule"][day + "-" + time];
            }
        }
    delete day, time;
    }
    Cookies.set("data",JSON.stringify(userdata), {expires: 180});
    schedulebox.style.visibility = "hidden";
}

function cls_open() {
    schedulebox.style.visibility = "visible";
}

function info_close() {
    var html = document.getElementById("3djpg");
    var info_pane = document.getElementById("information");
    html.src=data[101][4];
    info_pane.style.visibility = "hidden";
   
}

function TimelineChange() {
    if (typeof userdata["schedule"][classday + "-" + classtime] != "undefined") //その時間に教室配置が登録されていれば
    {
        map.contentWindow.clschange(userdata["schedule"][classday + "-" + classtime]);
        // 週程ハイライトの教室番号を変更
        dis_number.textContent = (floornum+1) + "F  次の授業教室:" + userdata["schedule"][classday + "-" + classtime];
        dis_number.style.background=colors[floornum];
    }
    
}

function infopage(page){
    console.log("aaa");
    var html = document.getElementById('pages');
    html.src="html://lisanavi.github.io/archive/information/"+page+"/";
    console.log(page);
}

//tutorial
function cls_tutorialopen(){
    tutorial.style.visibility = "visible";
}

function cls_tutorialclose() {
    tutorial.style.visibility = "hidden";
}


function ResizeFrame() {
    // 画面幅にiframeの幅を合わせる
    let frame = document.getElementById("map");
    let sitewidth = document.documentElement.clientWidth;
    frame.style.width = sitewidth;
}

function ResizeFrame() {
    // 画面幅にiframeの幅を合わせる
    let frame = document.getElementById("3d");
    let sitewidth = document.documentElement.clientWidth;
    frame.style.width = sitewidth;
}


function Menu_Toggle() {
    let menu_panel = document.getElementById("menu");
    if (menu_panel.style.display == "none") {
        menu_panel.style.display = "flex";
    } else {
        menu_panel.style.display = "none";
    }
}

window.onload = function() {
    ResizeFrame();
}
window.onresize = function() {
    ResizeFrame();
}


panel.addEventListener("click", function() {panel.style.visibility = "hidden";});

