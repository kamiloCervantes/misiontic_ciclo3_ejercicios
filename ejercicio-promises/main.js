
var promesas = {};

promesas.promesa1 =  function() {
    return new Promise(function(resolver, cancelar) {
        console.log("añadir azul");
         setTimeout(function() {
            console.log("añadiendo azul");
            if(promesas.addBox('blue')){
                resolver();
            }
            else{
                cancelar();
            }           
         }, 1000);
    });
}
promesas.promesa2 = function() {
    return new Promise(function(resolver, cancelar) {
       console.log("añadir rojo");
       setTimeout(function() { 
            console.log("añadiendo rojo");           
            if(promesas.addBox('red')){
                resolver();
            }
            else{
                cancelar();
            }
            
        }, 1000);
     })
}

promesas.addBox = function(color){
    var boxes = [...document.querySelectorAll('.box')];
    var new_box = boxes[0].cloneNode();
    new_box.innerHTML = boxes.length+1;
    new_box.classList.add(color);
    boxes[0].parentElement.appendChild(new_box);
    new_box.addEventListener('click', promesas.removeBox, false);
    return boxes.length > 1;
}

promesas.removeBox = function(){
    console.log("click");
    this.remove();
}

promesas.start = function(){   
    setInterval(
        function(){
            promesas.promesa1().then(promesas.promesa2).then(function() {
                console.log("termino");
            });
        }, 2000
    );

    var boxes = [...document.querySelectorAll('.box')];
    for(var i = 0; i < boxes.length; i++){
        boxes[i].addEventListener('click', promesas.removeBox, false);
    }
    
}


promesas.start();

