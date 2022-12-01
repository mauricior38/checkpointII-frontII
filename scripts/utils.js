function baseUrl() {
  return "https://ctd-fe2-todo-v2.herokuapp.com/v1";
}

function verificaLogin() {
  let isLogged = localStorage.getItem("todoToken");

  let body = document.querySelector("body")

  if(isLogged){
    
  }else{
    console.log("false")
  }

//   {isLogged ? window.location.href = ("./tarefas.html") : window.location.href = ("./index.html")}  
  

}
