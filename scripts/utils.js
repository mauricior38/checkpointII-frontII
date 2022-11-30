function baseUrl(){
    return 'https://ctd-fe2-todo-v2.herokuapp.com/v1'
}

function verificaLogin(){
    let isLogged = localStorage.getItem('todoToken')

    {isLogged ? window.location.href = "./tarefas.html" : window.location.href = "./index.html"}
}