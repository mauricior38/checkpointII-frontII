const btn = document.getElementById("btnsb");

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

function loginApi(userData) {

let requestInit = {
    method: "POST",
    headers: {
        "Content-Type" : "application/json"
    },

    body: userData
}

fetch(`${baseUrl()}/users/login`, requestInit)
.then(
    resposta => resposta.json()
).then(
    resposta => {
        if(resposta === 'El usuario no existe' || resposta === 'Contraseña incorrecta'){
            alert('Usuário ou senha incorreto')
        }else{
            localStorage.setItem('todoToken', resposta.jwt)
            verificaLogin()
        }
    }
    
).catch((err) => {
    // console.log(err);
});

}