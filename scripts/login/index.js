window.onload = function () {
  isLogged();
  validaLogin();
};

function isLogged() {
  let isLogged = localStorage.getItem("todoToken");

  if (isLogged) {
    window.location.href = "./tarefas.html";
  }
}

const form = document.getElementById("form");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const btnLogin = document.getElementById("btn");
btnLogin.disabled = true;
btnLogin.innerText = "Complete os dados";

function validaLogin() {
  inputEmail.onkeyup = function () {
    const validaInputEmail = validaEmail(inputEmail.value);

    if (validaInputEmail) {
      inputEmail.setAttribute("enable", "true");
      validaBtnLogin();
    } else {
      inputEmail.setAttribute("enable", "false");
      validaBtnLogin();
    }
  };

  inputPassword.onkeyup = function () {
    const validaInputPassword = validaPassword(inputPassword.value);

    if (validaInputPassword) {
      inputPassword.setAttribute("enable", "true");
      validaBtnLogin();
    } else {
      inputPassword.setAttribute("enable", "false");
      validaBtnLogin();
    }
  };

  inputPassword.onkeyup = function () {
    const validaInputPassword = validaPassword(inputPassword.value);

    if (validaInputPassword) {
      inputPassword.setAttribute("enable", "true");
      validaBtnLogin();
    } else {
      inputPassword.setAttribute("enable", "false");
      validaBtnLogin();
    }
  };
}

function loader(user) {
  btnLogin.innerHTML = `
    <span class="loader"></span>
    `;
  setTimeout(function () {
    loginApi(user);
  }, 1500);
}

function validaPassword(passowrd){
    
  if(passowrd.length >= 6 ){
    inputPassword.classList.remove("inputError");
    return true;
  }else{
    inputPassword.classList.add("inputError");
    return false;
  }
}

function validaBtnLogin(){
  const validaInputEmail = inputEmail.getAttribute("enable")
  const validaInputPassowrd = inputPassword.getAttribute("enable")

  if(validaInputEmail === 'true' && validaInputPassowrd === 'true'){
    btnLogin.innerText = 'Acessar'
    btnLogin.classList.remove('blocked')
    btnLogin.disabled = false;
  }
}

form.addEventListener("submit", function () {
  event.preventDefault();

  let user = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  let userJSON = JSON.stringify(user);

  loader(userJSON);
});

async function loginApi(userData) {
  let requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userData,
  };

  try {
    let login = await fetch(`${baseUrl()}/users/login`, requestInit);

    if (login.status == 201) {
      let loginResponse = await login.json();
      localStorage.setItem("todoToken", loginResponse.jwt);

      window.location.href = "./tarefas.html";
    } else {
      throw login;
    }
    
    if(login.status == 404){
      alert("Error")
    }

  } catch (error) {
    if (error.status === 404 || error.status === 400) {
      alert("Email ou senha inválidos.");
      btnLogin.innerText = "Complete os dados";
      btnLogin.classList.add("blocked");
      btnLogin.disabled = true;
    }
  }
}
