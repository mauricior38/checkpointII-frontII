function baseUrl() {
  return "http://todo-api.ctd.academy:3000/v1";
}

function validaEmail(email) {

  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      inputEmail.classList.remove("inputError");
      return true
    }
      inputEmail.classList.add("inputError");
      inputEmail.setAttribute("enable", "false")
      return false
  }
}




