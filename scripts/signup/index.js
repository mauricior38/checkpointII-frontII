window.onload = function(){
    validaCriaConta();
}

const formCriaConta = document.getElementById("formCriaConta")
const inputNome = document.getElementById("nome")
const inputSobrenome = document.getElementById("sobrenome")
const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const inputRepetePassword = document.getElementById("repetepassword")
inputRepetePassword.disabled = true;

const btnCriaConta = document.getElementById("btnCriaConta")
btnCriaConta.innerText = "Preencha todos os campos"

function validaCriaConta(){
    inputNome.onkeyup = function (){
        validaNome(inputNome.value)
    }

    inputSobrenome.onkeyup = function (){
        validaSobreNome(inputSobrenome.value)
    }
    
    inputEmail.onkeyup = function () {
        const validaInputEmail = validaEmail(inputEmail.value);
    
        if (validaInputEmail) {
          inputEmail.setAttribute("enable", "true");
          validaBtnCriaConta()
        } else {
          inputEmail.setAttribute("enable", "false");
          validaBtnCriaConta()         
        }
      };

     inputPassword.onkeyup = function () {
        validaPassword(inputPassword.value);
    };

    inputRepetePassword.onkeyup = function(){
        validaRepetePassword(inputRepetePassword.value)
    }
} 

function validaNome(nome){

    if(nome.length >= 3){
        inputNome.classList.remove("inputError");
        inputNome.setAttribute("enable", "true")
        validaBtnCriaConta()
      return true;
    }else{
        inputNome.classList.add("inputError");
        inputNome.setAttribute("enable", "false")
        validaBtnCriaConta()
      return false;
    }
}

    function validaSobreNome(SobreNome){
    
        if(SobreNome.length >= 3){
            inputSobrenome.classList.remove("inputError");
            inputSobrenome.setAttribute("enable", "true")
            validaBtnCriaConta()
          return true;
        }else{
            inputSobrenome.classList.add("inputError");
            inputSobrenome.setAttribute("enable", "false")
            validaBtnCriaConta()
          return false;
        }    
}


function validaPassword(passowrd){
    
    if(passowrd.length >= 6 ){
      inputPassword.classList.remove("inputError");
      inputRepetePassword.classList.remove("inputDisabled")
      inputRepetePassword.disabled = false;
      validaBtnCriaConta()
      return true;
    }else{
      inputPassword.classList.add("inputError");
      inputRepetePassword.classList.add("inputDisabled")
      inputRepetePassword.disabled = true;
      validaBtnCriaConta()
      return false;
    }
  }

  function validaRepetePassword(){
    if(inputPassword.value != inputRepetePassword.value){
        inputRepetePassword.classList.add("inputError");
        validaBtnCriaConta()
        return false;
      }else{
        inputRepetePassword.classList.remove("inputError");
        inputRepetePassword.setAttribute("enable", "true")
        validaBtnCriaConta()  
        return true;
      }
  }


  function validaBtnCriaConta(){
    const validaInputNome = inputNome.getAttribute("enable")
    const validaInputSobreNome = inputSobrenome.getAttribute("enable")
    const validaInputEmail = inputEmail.getAttribute("enable")
    const validaInputResetPassword = inputRepetePassword.getAttribute("enable")
    
    if(validaInputNome === 'true' && validaInputSobreNome === 'true' && validaInputEmail === 'true' && validaInputResetPassword === 'true'){
        btnCriaConta.innerText = 'Criar conta'
        btnCriaConta.classList.remove('blocked')
        btnCriaConta.disabled = false;
      }    
  
  }

  function loader(user) {
    btnCriaConta.innerHTML = `
      <span class="loader"></span>
      `;
    setTimeout(function () {
        createUser(user);
    }, 1500);
  }



formCriaConta.addEventListener("submit", function(){
    event.preventDefault();

    let user = {
        firstName: nome.value,
        lastName: sobrenome.value,
        email: email.value,
        password: repetepassword.value
    }

    let userJSON = JSON.stringify(user)
    
    loader(userJSON)
})

async function createUser(userData) {
    let requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userData,
    };
  
    try {
      let login = await fetch(`${baseUrl()}/users`, requestInit);
  
      if (login.status == 201) {
        let loginResponse = await login.json();

        alert("Cadastro realizado com sucesso")
  
        window.location.href = "./index.html";
      } else {
        throw login;
      }
    } catch (error) {
      if (error.status === 400) {
        alert("Email de usuário já cadastrado.");
        btnCriaConta.innerText = "Complete os dados";
        btnCriaConta.classList.add("blocked");
        btnCriaConta.disabled = true;
      }
    }
  }