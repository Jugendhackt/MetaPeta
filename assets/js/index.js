function al(e) {
    console.log("Hello");

    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var url = window.URL || window.webkitURL;
    var objURL = url.createObjectURL || false;



    if (objURL) {
        loadImage(url.createObjectURL(file), file.name);
    } else {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (ev) {
            loadImage(ev.target.result, file.name);
        };
    }

    e.preventDefault();


}

function loadImage(file, name) {
    var img = new Image();
    img.src = file;
    img.onload = function () {
        imagetocanvas(this, img.naturalWidth, img.naturalHeight, name);
    };
}

function imagetocanvas(img, w, h, name) {
    c.width = w;
    c.height = h;
    cx.drawImage(img, 0, 0, w, h);
    var dlname = name.replace(/\.([^\.]+)$/, '-cleaned.jpg');



    // button delete raussuchen
    var deleteButton = document.querySelector('.btn-delete');
    // href von link mit bildurl versehen
    deleteButton.href=c.toDataURL('image/jpeg', 0.9);
}

// wenn file änderungen soll al() gemacht werden

var fileinput = document.querySelector('#getfile');
fileinput.addEventListener('change', al, false);
var c = document.querySelector('canvas');
var cx = c.getContext('2d');