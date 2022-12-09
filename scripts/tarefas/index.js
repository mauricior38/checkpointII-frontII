window.onload = function () {
  isLogged();
};

const btnSair = document.getElementById("closeApp");
let tarefasPendentes = document.getElementById("tarefas-pendentes");

async function isLogged() {
  let isLogged = localStorage.getItem("todoToken");

  if (isLogged) {
    let configReq = {
      headers: {
        Authorization: isLogged,
      },
    };

    let resposta = await fetch(`${baseUrl()}/users/getMe`, configReq);
    let respostaJS = await resposta.json();

    userGetMe(respostaJS);


    let respostaTasks = await fetch(`${baseUrl()}/tasks`, configReq);
    let respostaTasksJs = await respostaTasks.json();

    respostaTasksJs.forEach(e => {
        let liTarefas = document.createElement("li");
        liTarefas.classList.add("tarefa");
        liTarefas.innerHTML = `
        <div class="not-done" id="btnStatus" ></div>
            <div class="descricao">
                <p class="nome">ID:${e.id} </p>
                <p class="nome">${e.description}</p>
                <p class="timestamp">Criada em: ${e.createdAt}</p>
        </div>`;

         tarefasPendentes.appendChild(liTarefas);
    });
    
  } else if (isLogged === null) {
    window.location.href = "./index.html";
  }
}

function userGetMe(userData) {
  const userNameText = document.getElementById("userName");
  userNameText.innerText = `${userData.firstName} ${userData.lastName} `;
}

btnSair.addEventListener("click", function () {
  localStorage.removeItem("todoToken");
  isLogged();
});

const tarefaForm = document.getElementById("tarefaForm")
const inputNovaTarefa = document.getElementById("novaTarefa")


tarefaForm.addEventListener("submit", function(){
    event.preventDefault();

    let desc = {
        description: inputNovaTarefa.value,
        completed: false
    }

    let descJSON = JSON.stringify(desc)

    novaTarefa(descJSON)
})


async function novaTarefa(desc){
    let requestTask = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("todoToken")
        },
        body: desc,
      };

      if(inputNovaTarefa.value === ''){
        alert("Preencha alguma tarefa")
        return
      }

      try{
        let resposta = await fetch(`${baseUrl()}/tasks`, requestTask)
        let respostaTask = await resposta.json();


        if(resposta.status == 201){
            console.log("Criado com sucesso")
            window.location.reload();
        }else {
            throw resposta;
          }
      }
      catch(error){
         console.log(error)
      }



}

