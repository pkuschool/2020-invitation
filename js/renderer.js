var avatar_w;
var avatar_h;
var avatar = new Image();
var avatar_b64 = localStorage.avatar;
window.onload = () => {
    if (isWeiXin()) {
        var height = (window.innerHeight - 20) / 1920;
        var width = (window.innerWidth - 20) / 1080;
        var e = Math.min(height, width);
        height = e * 1920;
        width = e * 1080;
        document.querySelector('#cover_black').height = height;
        document.querySelector('#cover_black').width = width;
        document.querySelector('#cover_flash').height = height;
        document.querySelector('#cover_flash').width = width;
    }
    if (avatar_b64 != "" && avatar_b64 != null) {
        avatar.src = avatar_b64;
        avatar.onload = () => {
            avatar_h = avatar.height;
            avatar_w = avatar.width;
            console.log('1')
            drawImage()
        }
    } else {
        drawImage()
    }
    if (!isWeiXin()) {
        // document.querySelector('#tool_button').setAttribute('hidden','');
        setPreVideoSize();
    } else {
        document.querySelector('#wait_hint').setAttribute('hidden', '');
        document.querySelector('#tool_button').removeAttribute('hidden');
        // return ;
    }
    console.log(avatar.src.length)
    // console.log(avatar_b64)

    window.onresize = () => {
        drawImage()
    }
}

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
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

function DrawTextVertical_back(ctx, str, x, y, sz, e, btn) {
    ctx.font = e * sz + "px 'regular-font'";
    let l = str.length;
    for (var i = l - 1; i >= 0; i--) {
        ctx.fillText(str[l - i - 1], x, y - (sz * e + btn * e) * i);
    }
}

function DrawTextVertical(ctx, str, x, y, sz, e, btn) {
    ctx.font = e * sz + "px 'regular-font'";
    let l = str.length;
    for (var i = 0; i < l; i++) {
        ctx.fillText(str[i], x, y + (sz * e + btn * e) * i);
    }
}

function DrawEnglishStrVertical(ctx, str, x, y, sz, e) {
    ctx.font = e * sz + "px 'Arial'";
    var rad = (Math.PI / 180) * 90;
    ctx.rotate(rad);
    ctx.fillText(str, y, -x);
    ctx.rotate(-rad);
}

function getEnglishWidth(ctx, str, sz, e) {
    ctx.font = e * sz + "px 'Arial'";
    return ctx.measureText(str).width;
}

function drawImage() {
    var smooth = 3;
    // console.log(avatar)
    var height = (window.innerHeight - 20) / 1920;
    var width = (window.innerWidth - 20) / 1080;
    var e = Math.min(height, width) * smooth;
    height = e * 1920;
    width = e * 1080;

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

    img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);

        var name = localStorage.getItem('name');
        var house = localStorage.getItem('house');
        if (name === null || house === null) {
            window.location = "./"
        }

        var gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop("1.0", "white");
        ctx.fillStyle = gradient;
        // ctx.font = e * 150 + "px 'regular-font'";
        // ctx.fillText("" + name, 280 * e, 435 * e);
        // ctx.font = e * 70 + "px 'regular-font'";
        // ctx.fillText("" + house + (["预科部", "教师", "家长"].indexOf(house) != -1 ? '' : '书院'), 280 * e, 560 * e);
        console.log("name length:", name.length);
        if (!isEng(name)) {
            DrawTextVertical_back(ctx, "" + name, 830 * e, 1320 * e, 110, e, 15);
            if (!isEng(house)) {
                DrawTextVertical(ctx, "" + house + (["预科部", "教师", "家长"].indexOf(house) != -1 ? '' : '书院'), 750 * e, (1395 - name.length * (110 + 15)) * e, 50, e, 10);
            } else {
                DrawEnglishStrVertical(ctx, house, 770 * e, (1395 - name.length * (110 + 15)) * e, 50, e);
            }
        } else {

            DrawEnglishStrVertical(ctx, name, 870 * e, (1340 * e) - getEnglishWidth(ctx, name, 110, e), 110, e);
            if (!isEng(house)) {
                DrawTextVertical(ctx, "" + house + (["预科部", "教师", "家长"].indexOf(house) != -1 ? '' : '书院'), 790 * e, (1390 * e)-getEnglishWidth(ctx, name, 110, e), 50, e, 10);
            } else {
                DrawEnglishStrVertical(ctx, house, 800 * e, (1350 * e)-getEnglishWidth(ctx, name, 110, e), 50, e);
            }

        }

        if (avatar_b64 != "" && avatar_b64 != null) {
            // avatar.src = avatar_b64;
            var angle = -20;
            var x = -360;
            var y = 928;
            var final_avatar_width = 350;
            var rad = (Math.PI / 180) * angle;
            ctx.rotate(rad);
            circleImg(ctx, avatar, x * e, y * e, (final_avatar_width * e / 2));
            // ctx.drawImage(avatar, x * e, (y - final_avatar_width / avatar_w * avatar_h) * e, final_avatar_width * e, final_avatar_width / avatar_w * avatar_h * e);
            ctx.rotate(-rad);
        }

        var left_dis = 700;
        var top_dis = 1700;
        var font_size = 50;
        ctx.font = e * font_size + "px 'undef'";
        var b64 = inv_el.toDataURL('image/png');
        output_el.src = b64;

        var hint_el = document.querySelector('#info');
        // ctx.fillText("时间: 不清楚", left_dis * e, top_dis * e);
        // ctx.fillText("方式: 不知道", left_dis * e, (top_dis + font_size+10) * e);
    }
    img.src = './img/background.png';
}

function isEng(str) {
    var re = /^[a-z\sA-Z 0-9]+$/;
    if (!re.test(str)) {
        return false;
    }
    return true;
}

function setPreVideoSize() {
    if (isWeiXin()) {
        document.querySelector('#cover_black').removeAttribute('hidden');
    }
    var height = (window.innerHeight - 20) / 1920;
    var width = (window.innerWidth - 20) / 1080;
    var e = Math.min(height, width);
    height = e * 1920;
    width = e * 1081;
    var preVideo_el = document.querySelector('#preVideo');
    preVideo_el.height = height;
    preVideo_el.width = width;
    preVideo_el.style.height = height;
    preVideo_el.style.width = width;
    if (!isWeiXin()) {
        preVideo_el.removeAttribute('hidden');
    }
    var outputImg_el = document.querySelector('#output');
    outputImg_el.setAttribute('hidden', '');
    // alert("get");
    document.querySelector('#preVideo').playbackRate = 1.5;
    document.querySelector('#preVideo').play();
    if (isWeiXin()) {
        setTimeout(function () {
            document.querySelector('#cover_black').setAttribute('hidden', '');
            preVideo_el.removeAttribute('hidden');
        }, 800);
        // setTimeout(function () {
        //     preVideo_el.setAttribute('hidden', '');
        //     document.querySelector('#cover_flash').removeAttribute('hidden');
        // }, 6000)
        // setTimeout(function () {
        //     document.querySelector('#cover_flash').setAttribute('hidden', '');
        //     outputImg_el.removeAttribute('hidden');
        // }, 7800);
    }
    // preVideo_el.setAttribute('hidden', '');
    // outputImg_el.removeAttribute('hidden');


    preVideo_el.addEventListener("ended", function () {
        outputImg_el.removeAttribute('hidden');
        preVideo_el.setAttribute('hidden', '');
        var hint_el = document.querySelector('#info');
        setTimeout(() => {
            // console.log("get");
            hint_el.style["margin-top"] = "10px";
        }, 100);

        setTimeout(() => {
            // console.log("get");
            hint_el.style["margin-top"] = "-50px";
        }, 10000);
    })

}

function playVideo() {
    setPreVideoSize();
    document.querySelector('#tool_button').setAttribute('hidden', '');
}