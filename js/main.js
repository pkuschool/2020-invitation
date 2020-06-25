function submit() {
    var name_el = document.querySelector('#stacked-name');
    var hosue_el = document.querySelector('#stacked-house');
    var avator_el = document.querySelector('#input-file');
    var preview_el = document.querySelector('#preview');
    if (avator_el.value != "") {
        var avator = avator_el.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            // preview_el.src = e.target.result;
            localStorage.setItem('avator', e.target.result);
        }
        reader.readAsDataURL(avator);
    } else {

    }
    var name = name_el.value;
    var house = hosue_el.value;
    if (name == "" || house == "请选择书院") {
        alert("信息填写不完整");
        return
    }
    localStorage.setItem("name", name);
    localStorage.setItem("house", house);
    if (avator_el.value == "") {
        localStorage.setItem("avator", "");
    }
    window.location = "./print.html";
}
window.onload = () => {
    document.body.querySelector("#main").style.height = window.innerHeight + "px";
}

document.querySelector('#input-file').onchange = () => {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.querySelector('#avatar-img').src = e.target.result
        document.querySelector('#avatar-img').removeAttribute('hidden')
        document.querySelector('#filename-indicator').innerHTML = document.querySelector('#input-file').files[0].name
        // localStorage.setItem('avator', e.target.result);

    }
    reader.readAsDataURL(document.querySelector('#input-file').files[0]);
}