const btnSair = document.getElementById("closeApp");

function isLogged(){
    let isLogged = localStorage.getItem("todoToken");
    
    if(isLogged === null){
        window.location.href = './index.html'
    }
}

btnSair.addEventListener("click", function () {    
    localStorage.removeItem('todoToken')
    isLogged();
})