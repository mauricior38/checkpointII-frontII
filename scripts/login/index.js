const btn = document.getElementById("btnsb");

function isLogged(){
    let isLogged = localStorage.getItem("todoToken");
    
    if(isLogged){
        window.location.href = './tarefas.html'
    }
}

btn.addEventListener("click", function () {
  let inputEmail = document.getElementById("inputEmail");
  let inputPassword = document.getElementById("inputPassword");

  let user = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  let userJSON = JSON.stringify(user)

  loginApi(userJSON);
});


async function loginApi(userData) {

let requestInit = {
    method: "POST",
    headers: {
        "Content-Type" : "application/json"
    },
    body: userData
}

try {
    let login = await fetch(`${baseUrl()}/users/login`, requestInit);
    
    if (login.status == 201) {
        let loginResponse = await login.json();
        localStorage.setItem("todoToken",  loginResponse.jwt)

        window.location.href = "./tarefas.html"
    } else {
        throw login;
    }
    
} catch (error) {
    if(error.status === 404 || error.status === 400){
        alert("Email ou senha inválidos.")
    }

    }
}