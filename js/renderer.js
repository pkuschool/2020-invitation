var avator_w;
var avator_h;
var avator = new Image();
var avator_b64 = localStorage.getItem('avator');
if (avator_b64 != "" && avator_b64 != null) {
    avator.src = avator_b64;
    avator.onload = () => {
        avator_h = avator.height;
        avator_w = avator.width;
    }
}
console.log(avator.src.length)
window.onload = () => {
    // console.log(avator_b64)
    var hint_el = document.querySelector('#info');
    setTimeout(() => {
        // console.log("get");
        hint_el.style["margin-top"] = "10px";
    }, 500);
    drawImage()
    setTimeout(() => {
        // console.log("get");
        hint_el.style["margin-top"] = "-50px";
    }, 5000);
}


function circleImg(ctx, img, x, y, r) {
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
}

function drawImage() {
    var smooth = 3;
    // console.log(avator)
    var height = (window.innerHeight - 20) / 1920;
    var width = (window.innerWidth - 20) / 1081;
    var e = Math.min(height, width) * smooth;
    height = e * 1920;
    width = e * 1081;

    var inv_el = document.querySelector('#invitation');
    var output_el = document.querySelector('#output');
    inv_el.height = height;
    inv_el.width = width;

    inv_el.style.height = height / smooth + "px";
    inv_el.style.width = width / smooth + "px";
    output_el.style.height = height / smooth + "px";
    output_el.style.width = width / smooth + "px";

    //
    var ctx = inv_el.getContext("2d");
    let img = new Image();
    img.src = './img/background.jpg';
    ctx.drawImage(img, 0, 0, width, height);

    var name = localStorage.getItem('name');
    var house = localStorage.getItem('house');
    if (name === null || house === null) {
        window.location = "./"
    }

    var gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop("1.0", "white");
    ctx.fillStyle = gradient;
    ctx.font = e * 150 + "px 'regular-font'";
    ctx.fillText("" + name, 100 * e, 735 * e);
    ctx.font = e * 70 + "px 'regular-font'";
    ctx.fillText("" + house + '书院', 100 * e, 860 * e);

    if (avator_b64 != "" && avator_b64 != null) {
        avator.src = avator_b64;
        var angle = -20;
        var x = -350;
        var y = 928;
        var final_avator_width = 350;
        var rad = (Math.PI / 180) * angle;
        ctx.rotate(rad);
        circleImg(ctx, avator, x * e, y * e, (final_avator_width * e / 2));
        // ctx.drawImage(avator, x * e, (y - final_avator_width / avator_w * avator_h) * e, final_avator_width * e, final_avator_width / avator_w * avator_h * e);
        ctx.rotate(-rad);
    }

    var left_dis = 700;
    var top_dis = 1700;
    var font_size = 50;
    ctx.font = e * font_size + "px 'undef'";
    var b64 = inv_el.toDataURL('image/png');
    output_el.src = b64;
    // ctx.fillText("时间: 不清楚", left_dis * e, top_dis * e);
    // ctx.fillText("方式: 不知道", left_dis * e, (top_dis + font_size+10) * e);
}

window.onresize = () => {
    setTimeout(() => {
        drawImage()
    }, 300)
}