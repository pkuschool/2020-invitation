var avator_w;
var avator_h;
var avator = new Image();
var avator_b64 = localStorage.getItem('avator');
if (avator_b64 != "") {
    avator.src = avator_b64;
    avator.onload = () => {
        avator_h = avator.height;
        avator_w = avator.width;
    }
}

setInterval(() => {
    var smooth = 3;

    var height = (document.body.clientHeight - 20) / 1920;
    var width = (document.body.clientWidth - 20) / 1081;
    var e = Math.min(height, width) * smooth;
    height = e * 1920;
    width = e * 1081;

    var inv_el = document.querySelector('#invitation');
    inv_el.height = height;
    inv_el.width = width;

    inv_el.style.height = height / smooth + "px";
    inv_el.style.width = width / smooth + "px";
    //
    var ctx = inv_el.getContext("2d");
    var img = new Image();
    img.src = './img/background.jpg';
    ctx.drawImage(img, 0, 0, width, height);

    var name = localStorage.getItem('name');
    var house = localStorage.getItem('house');
    if(name===null||house===null)
    {
        window.location="/"
    }

    var gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop("1.0", "white");
    ctx.fillStyle = gradient;
    ctx.font = e * 70 + "px 微软雅黑";
    ctx.fillText("姓名: " + name, 110 * e, 700 * e);
    ctx.fillText("书院: " + house, 110 * e, 800 * e);

    if (avator_b64 != "") {
        var angle = -20;
        var x = -340;
        var y = 1250;
        var final_avator_width = 300;
        var rad = (Math.PI / 180) * angle;
        ctx.rotate(rad);
        ctx.drawImage(avator, x * e, (y - final_avator_width / avator_w * avator_h) * e, final_avator_width * e, final_avator_width / avator_w * avator_h * e);
        ctx.rotate(-rad);
    }

    var left_dis = 700;
    var top_dis = 1700;
    var font_size=50;
    ctx.font = e * font_size + "px 微软雅黑";
    ctx.fillText("时间: 不清楚", left_dis * e, top_dis * e);
    ctx.fillText("方式: 不知道", left_dis * e, (top_dis + font_size+10) * e);

}, 300)