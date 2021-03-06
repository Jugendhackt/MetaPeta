function al(e) {
    console.log("Hello");

    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var url = window.URL || window.webkitURL;
    var objURL = url.createObjectURL || false;

    var deleteButton = document.querySelector('.btn-delete');
    deleteButton.style.visibility = "visible";

    var resetButton = document.querySelector('.btn-reset');
    resetButton.style.visibility = "visible";

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
    var dlname = name.replace(/\.([^\.]+)$/, '-bereinigt.jpg');


    // button delete raussuchen
    var deleteButton = document.querySelector('.btn-delete');
    // href von link mit bildurl versehen
    deleteButton.href = c.toDataURL('image/jpeg', 0.9);
    deleteButton.download = dlname;

    EXIF.getData(img, function () {

        var make = EXIF.getTag(this, "Make");
        var model = EXIF.getTag(this, "DateTimeOriginal");
        var smartphone = EXIF.getTag(this, "Model");
        var imagewidth = EXIF.getTag(this, "PixelXDimension");
        var imageheight = EXIF.getTag(this, "PixelYDimension");
        var allMetaDataSpan = document.getElementById("allMetaDataSpan");
        // allMetaDataSpan.innerHTML = `${make} ${model} ${imagewidth} ${imageheight}`;
       // allMetaDataSpan.innerHTML = "Kameramodell : " + make + "\n" + "Aufnahmedatum: " + model + "\n" + "Breite: " + imagewidth + "\n" + "Höhe: " + imageheight;


        var table = document.getElementById("table");
        var row1 = table.insertRow(0);
        var cell1 = row1.insertCell(0);
        var cell11 = row1.insertCell(1);

        cell1.innerHTML = "Kameramodell:";
        cell11.innerHTML = make;

        var row2 = table.insertRow(1);
        var cell2 = row2.insertCell(0);
        var cell22 = row2.insertCell(1);

        cell2.innerHTML = "Aufnahmedatum:";
        cell22.innerHTML = model;

        var row3 = table.insertRow(2);
        var cell3 = row3.insertCell(0);
        var cell33 = row3.insertCell(1);

        cell3.innerHTML = "Breite:";
        cell33.innerHTML = imagewidth+" Pixel";

        var row4 = table.insertRow(3);
        var cell4 = row4.insertCell(0);
        var cell44 = row4.insertCell(1);

        cell4.innerHTML = "Höhe:";
        cell44.innerHTML = imageheight+" Pixel";

        var row5 = table.insertRow(4);
        var cell5 = row5.insertCell(0);
        var cell55 = row5.insertCell(1);

        cell5.innerHTML = "Handymodell:";
        cell55.innerHTML = smartphone;


    });

    /*   EXIF.getData(deleteButton.href, function () {

           var make = EXIF.getTag(this, "Make");
           var model = EXIF.getTag(this, "DateTimeOriginal");
           var allMetaDataSpan = document.getElementById("allMetaDataSpan");
           allMetaDataSpan.innerHTML = `${make} ${model}`;

       });*/

}

// wenn file änderungen soll al() gemacht werden

var fileinput = document.querySelector('#getfile');
fileinput.addEventListener('change', al, false);
var c = document.querySelector('canvas');
var cx = c.getContext('2d');











