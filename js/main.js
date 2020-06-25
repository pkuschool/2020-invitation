function submit() {
    var name_el = document.querySelector('#stacked-name');
    var hosue_el = document.querySelector('#stacked-house');
    var avator_el = document.querySelector('#input-file');
    var preview_el = document.querySelector('#preview');
    var avator = avator_el.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        preview_el.src = e.target.result;
        console.log(e.target.result)
    }
    reader.readAsDataURL(avator);
}