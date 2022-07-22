const CLASSE_X = 'x'
const CLASSE_CIRCULO = 'circulo' 
const COMBINACOES_VITORIA = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    
]
const elementosCelula = document.querySelectorAll('[data-celula]')
const tabuleiro = document.getElementById('tabuleiro')
const elementoVitoria = document.getElementById('vitoria')
const botaoReiniciar = document.getElementById('botaoReiniciar')
const elementoTextoVitoria = document.querySelector('[data-texto-vitoria]')
let vezCirculo

iniciarJogo()

botaoReiniciar.addEventListener('click', iniciarJogo)

function iniciarJogo() {
    vezCirculo = false
    elementosCelula.forEach(celula => {
        celula.classList.remove(CLASSE_X)
        celula.classList.remove(CLASSE_CIRCULO)
        celula.removeEventListener('click', handleClick)
        celula.addEventListener('click', handleClick, {once: true })
    })
    tabuleiroHoverClass()
    elementoVitoria.classList.remove('mostrar')
}

function handleClick(e) {
    const celula = e.target
    const classeAtual = vezCirculo ? CLASSE_CIRCULO : CLASSE_X
    colocarForma(celula, classeAtual)
    if (checarVitoria(classeAtual)){
        console.log('Vitoria')
        fimJogo(false)
    } else if (empatou()) {
        fimJogo(true)
    } else {
        trocarVez()
        tabuleiroHoverClass()
    }
 
}

function fimJogo(empate){
    if (empate){
        elementoTextoVitoria.innerText = 'Empatou!'
    } else {
        elementoTextoVitoria.innerText = `${vezCirculo ? "O" : "X"} Venceu!`
    }
    elementoVitoria.classList.add('mostrar')
}

function empatou() {
    return [...elementosCelula].every(celula =>{ 
        return celula.classList.contains(CLASSE_X) ||
        celula.classList.contains(CLASSE_CIRCULO)
    })
}

function colocarForma(celula, classeAtual) {
    celula.classList.add(classeAtual)
}

function trocarVez(){
    vezCirculo = !vezCirculo
}

function tabuleiroHoverClass(){
tabuleiro.classList.remove(CLASSE_X)
tabuleiro.classList.remove(CLASSE_CIRCULO)
if (vezCirculo){
    tabuleiro.classList.add(CLASSE_CIRCULO)
} else {
    tabuleiro.classList.add(CLASSE_X)
}
} 

function checarVitoria(classeAtual) {
    return COMBINACOES_VITORIA.some(combinacao => {
        return combinacao.every(index => {
            return elementosCelula[index].classList.contains(classeAtual)

        })
    })
}