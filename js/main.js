function submit() {
    var name_el = document.querySelector('#stacked-name');
    var house_el = document.querySelector('#stacked-house');
    var avatar_el = document.querySelector('#input-file');
    var preview_el = document.querySelector('#avatar-img');
    var name = name_el.value;
    var house = house_el.value;
    if (name == "" || house == "请选择书院/身份") {
        alert("信息填写不完整");
        return
    } else {
        localStorage.setItem("name", name);
        localStorage.setItem("house", house);
        console.log(preview_el.src.length)
        // alert(preview_el.src.length)
        if (preview_el.src != "" && preview_el.src != location.href) {

            localStorage.avatar = preview_el.src;
            window.open('./print.html', '_self')
            // var avatar = avatar_el.files[0];
            // var reader = new FileReader();
            // reader.onload = function (e) {
            //     localStorage.avatar=e.target.result;
            //     window.open('./print.html', '_self')
            //     // preview_el.src = e.target.result;
            // }
            reader.readAsDataURL(avatar);
        } else {
            localStorage.setItem("avatar", "");
            window.open('./print.html', '_self')
        }
        // window.location = "./print.html";
    }
}

var cutting_tool;
var ctx;
let changeCount = 0
let currentWaitTimeout = 0

function preview(c) {
    // console.log(c);
    clearTimeout(currentWaitTimeout)
    currentWaitTimeout = setTimeout(() => {
        document.querySelector('#cut_confirm').innerHTML = '确认'
        var e = document.querySelector('#target');
        var be_cut_img = new Image()
        be_cut_img.src = document.querySelector('#avatar-img').src;
        var rh = be_cut_img.height;
        var rw = be_cut_img.width;
        var w = parseInt(e.style.width.split("px")[0])
        var h = parseInt(e.style.height.split("px")[0])
        cutting_tool.height = c.h / h * rh;
        cutting_tool.width = c.w / w * rw;
        ctx.drawImage(be_cut_img, -(c.x / h * rh), -(c.y / w * rw));
        var b64 = cutting_tool.toDataURL('image/png');
        document.querySelector('#preview').src = b64;
    }, 100)
}


var jcrop_api;
document.querySelector('#input-file').onchange = () => {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.querySelector('#avatar-img').src = e.target.result
        document.querySelector('#avatar-img').removeAttribute('hidden')
        if (jcrop_api) {
            jcrop_api.destroy();
        }
        document.querySelector('#target').src = e.target.result;
        document.querySelector('#preview').src = e.target.result;
        if (e.target.result.length >= 4750000) {
            alert('图片过大，可能无法正确生成！')
        }
        cutting_tool = document.querySelector('#tool');
        ctx = cutting_tool.getContext("2d");
        document.querySelector('.preview-area').removeAttribute('hidden');
        document.querySelector('.shadow').removeAttribute('hidden');
        document.querySelector('#target').onload = () => {
            jcrop_api = $.Jcrop('#target', {
                onChange: preview,
                onSelect: preview,
                aspectRatio: 1 / 1
            });
        }
        // document.querySelector('#filename-indicator').innerHTML = document.querySelector('#input-file').files[0].name
        // localStorage.setItem('avatar', e.target.result);

    }
    reader.readAsDataURL(document.querySelector('#input-file').files[0]);
}

function cut_confirm() {
    jcrop_api.destroy();
    document.querySelector('#target').style = "";
    document.querySelector('#input-file').value = "";
    document.querySelector('#avatar-img').src = document.querySelector('#preview').src;
    document.querySelector('.shadow').setAttribute('hidden', '');
    document.querySelector('.preview-area').setAttribute('hidden', '');
}

function cut_cancel() {
    jcrop_api.destroy();
    document.querySelector('#target').style = "";
    document.querySelector('#input-file').value = "";
    document.querySelector('#avatar-img').setAttribute('hidden', '');
    document.querySelector('#avatar-img').src = "#";
    document.querySelector('.shadow').setAttribute('hidden', '');
    document.querySelector('.preview-area').setAttribute('hidden', '');
}

function rot_right() {
    jcrop_api.destroy();
    cutting_tool = document.querySelector('#tool');
    var original_img = new Image()
    original_img.src = document.querySelector('#avatar-img').src;
    var original_img_height = original_img.height;
    var original_img_width = original_img.width;

    cutting_tool.height = original_img_width;
    cutting_tool.width = original_img_height;

    var angle = 90;

    ctx = cutting_tool.getContext("2d");
    var rad = (Math.PI / 180) * angle;
    ctx.rotate(rad);
    var rotate_img = new Image();
    rotate_img.src = document.querySelector('#avatar-img').src;

    ctx.drawImage(rotate_img, 0, 0 - original_img_height);
    var rotate_img_b64 = cutting_tool.toDataURL('image/png');
    document.querySelector('#avatar-img').src = rotate_img_b64;
    //
    if (jcrop_api) {
        jcrop_api.destroy();
    }
    document.querySelector('#target').style = "";
    document.querySelector('#target').src = rotate_img_b64;
    document.querySelector('#preview').src = rotate_img_b64;
    cutting_tool = document.querySelector('#tool');
    ctx = cutting_tool.getContext("2d");
    document.querySelector('.preview-area').removeAttribute('hidden');
    document.querySelector('.shadow').removeAttribute('hidden');
    document.querySelector('#target').onload = () => {
        jcrop_api = $.Jcrop('#target', {
            onChange: preview,
            onSelect: preview,
            aspectRatio: 1 / 1
        });
    }
}