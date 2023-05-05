const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider_section");
let sliderSectionLast = sliderSection[sliderSection.length -1];

slider.insertAdjacentElement('afterbegin', sliderSectionLast); //pone el ultimo elemento del slider al incio, esto para tener metodo de animación moviendose a la izquierda si es necesario

function Next(){
    let sliderSectionFirst = document.querySelectorAll(".slider_section")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";

    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend', sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    },500);

}

function size(slides){
    let sliderSize = slides + "00%";

    slider.style.width = sliderSize;

    for(let i = slides; i<5; i++){
        let idSlide = "slide_" + (i+1);
        document.getElementById(idSlide).remove();
    }
}

/// aca la url del servicio
var url = "https://eyecatcheditor.oohrd.com/rc/654";

function fetchData() {  
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    
        let randomRecordar= Math.floor(Math.random() * data.length);
    
        var main_data = data[randomRecordar]
    
        var title = main_data.title;
        var image = main_data.field_teaser_media.split('"');
        var src_1 = "https://eyecatcheditor.oohrd.com/" + image[1];
    
        document.getElementById("title").innerHTML  = title;
        document.getElementById("img-1").src = src_1;
    
        for(let i = 2; i<=5; i++){
    
            let mediaField = 'field_teaser_media_'+ i
            let image_data = main_data[mediaField].split('"');
            let src = "https://eyecatcheditor.oohrd.com/" + image_data[1];
    
            let img_id = "img-"+i;
    
            document.getElementById(img_id).src = src;
    
        }
    
        Next();
    
    })
    .catch(function() {
        // aca el manejo de errores
    });
}

fetchData();

setInterval(fetchData, 5000);
