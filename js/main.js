
function submit() {
    var name_el = document.querySelector('#stacked-name');
    var house_el = document.querySelector('#stacked-house');
    var avatar_el = document.querySelector('#input-file');
    var preview_el = document.querySelector('#avatar-img');
    var name = name_el.value;
    var house = house_el.value;
    if (name == "" || house == "请选择书院") {
        alert("信息填写不完整");
        return
    }else{
        localStorage.setItem("name", name);
        localStorage.setItem("house", house);
        console.log(preview_el.src)
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
window.onload = () => {
    // document.body.querySelector("#form").style.height = window.innerHeight + "px";
}

document.querySelector('#input-file').onchange = () => {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.querySelector('#avatar-img').src = e.target.result
        document.querySelector('#avatar-img').removeAttribute('hidden')
        // document.querySelector('#filename-indicator').innerHTML = document.querySelector('#input-file').files[0].name
        // localStorage.setItem('avatar', e.target.result);

    }
    reader.readAsDataURL(document.querySelector('#input-file').files[0]);
}