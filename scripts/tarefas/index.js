window.onload = function () {
  isLogged();
};

let btnSair = document.getElementById("closeApp");
let tarefasPendentes = document.getElementById("tarefas-pendentes");
let tarefasCompletas = document.getElementById("tarefas-completas");

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

    respostaTasksJs.forEach((e) => {

      if (e.completed == false) {
        let liTarefas = document.createElement("li");
        liTarefas.classList.add("tarefa");
        liTarefas.innerHTML = `
        <div class="not-done" id="btnStatus" onclick="statusTarefa(${e.id}, ${e.completed})" ></div>
            <div class="descricao">
                <p class="nome">ID:${e.id} </p>
                <p class="nome">${e.description}</p>
                <p class="timestamp">Criada em: ${e.createdAt}</p>
                
        </div>`;

        tarefasPendentes.appendChild(liTarefas);
      } else {
        let liTarefas = document.createElement("li");
        liTarefas.classList.add("tarefa");
        liTarefas.innerHTML = `
        <div class="not-done" id="btnStatus" onclick="statusTarefa(${e.id}, ${e.completed})"></div>
        <div class="descricao">
        <p class="nome">ID:${e.id} </p>
        <p class="nome">${e.description}</p>
        <p class="timestamp">Criada em: ${e.createdAt}</p>
        <button class="btnExcluir" onclick="deletaTarefa(${e.id})" >Excluir</button>
        </div>`;

        tarefasCompletas.appendChild(liTarefas);
      }
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

const tarefaForm = document.getElementById("tarefaForm");
const inputNovaTarefa = document.getElementById("novaTarefa");

tarefaForm.addEventListener("submit", function () {
  event.preventDefault();

  let desc = {
    description: inputNovaTarefa.value,
    completed: false,
  };

  let descJSON = JSON.stringify(desc);

  novaTarefa(descJSON);
});

async function novaTarefa(desc) {
  let requestTask = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("todoToken"),
    },
    body: desc,
  };

  if (inputNovaTarefa.value === "") {
    alert("Preencha alguma tarefa");
    return;
  }

  try {
    let resposta = await fetch(`${baseUrl()}/tasks`, requestTask);
    let respostaTask = await resposta.json();

    if (resposta.status == 201) {
      console.log("Criado com sucesso");
      window.location.reload();
    } else {
      throw resposta;
    }
  } catch (error) {
    console.log(error);
  }
}

async function statusTarefa(id, status) {
  
  if (status) {
    let requestTask = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("todoToken"),
      },

      body: JSON.stringify({
        completed: false,
      }),
    };

    try {
      let resposta = await fetch(`${baseUrl()}/tasks/${id}`, requestTask);

      if (resposta.status == 200) {
        console.log("Tarefa Pendente");
        window.location.reload();
      } else {
        throw resposta;
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    let requestTask = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("todoToken"),
      },

      body: JSON.stringify({
        completed: true,
      }),
    };

    try {
      let resposta = await fetch(`${baseUrl()}/tasks/${id}`, requestTask);
      let respostaTask = await resposta.json();

      if (resposta.status == 200) {
        console.log("Tarefa Concluida");
        window.location.reload();
      } else {
        throw resposta;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function deletaTarefa(id) {
  let requestDelete = {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("todoToken"),
    },
  };

  if (id) {
    try {
      let resposta = await fetch(`${baseUrl()}/tasks/${id}`, requestDelete);
      let respostaTask = await resposta.json();

      if (resposta.status == 200) {
        console.log("Tarefa Concluida");
        window.location.reload();
      } else {
        throw resposta;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

