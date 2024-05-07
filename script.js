const button = document.querySelector('.button-task')
const input = document.querySelector('.input-task')
const completList = document.querySelector('.list-task')

const audio = new Audio('alarm.mp3')

let minutes = 25;
let seconds = 0;
let timer;

function startTimer(){
    timer = setInterval(updateTimer, 1000);
}

function updateTimer(){
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            document.getElementById("alarm-sound").play();
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }
    document.getElementById("minutes").textContent = minutes <10 ?"0" + minutes : minutes;
    document.getElementById("seconds").textContent = seconds <10 ?"0" + seconds : seconds;
}

function stopTimer(){
    clearInterval(timer);
    audio
}




let minhaListaDeItens = []
function adicionarNovaTarefa() {
    if (input.value.trim()===''){
        alert("Por favor, insira uma tarefa antes de adicionar");
        return;
    }
    tarefa: InputEvent.value
    concluida: false
        
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {

    let novaLi = ''

    minhaListaDeItens.forEach((item, index) => {
        novaLi = novaLi + `
    <li class="task ${item.concluida && "done"}">
    <img src="/assets/square-check-solid.svg" alt="check-tarefa" onclick="taskCheck(${index})">
    <p>${item.tarefa}</p>
    <img src="/assets/trash-solid.svg" alt="lixeira" onclick="deletarItem(${index})">
    </li>
    `

    })
    completList.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}


function taskCheck(index) {
    minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida

    mostrarTarefas()
}



function deletarItem(index) {
    minhaListaDeItens.splice(index, 1)


    mostrarTarefas()
}

function reloadTasks() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

reloadTasks()
button.addEventListener('click', adicionarNovaTarefa)
