const btnSair = document.getElementById("closeApp");

btnSair.addEventListener("click", function () {    
    localStorage.removeItem('todoToken')
    verificaLogin()
})