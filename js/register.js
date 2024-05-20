     document.addEventListener("DOMContentLoaded", function(){




     /* CAMBIO DE IDIOMA */
     var check = document.querySelector(".check");
     check.addEventListener('click',idioma);
     function idioma(){
         let id = check.checked;
         if(id == true){
             location.href = "../register.html";
         }else{
             location.href = "en/registerEN.html";
         }
     }



     })
     
     
     
     
     

 