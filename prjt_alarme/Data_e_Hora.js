const Res_Relogio = document.querySelector("#res_relogio")
const Res_Calendario = document.querySelector("#res_calendario")
const Btn_Ativar = document.querySelector("#btn_ativar")
const Bnt_Parar = document.querySelector("#bnt_parar")
const Valor = document.querySelector("#tmp_alarme")
const Res_Alarme = document.querySelector("#hora_alarme")
const Container = document.querySelector("#Container")


const Som_Alarme = new Audio("som_alarme/alarm-301729.mp3")
Som_Alarme.loop = -1

let Ts_atual = null
let Ts_Alarme = null
let Alarme_Ativado = false
let Alarme_Tocando = false

const Alarme_Convertido_Ativado = () => {
    Ts_atual = Date.now()
    Ts_Alarme = Ts_atual + (Valor.value * 1000)
    Alarme_Ativado = true
    const Dt_Alarme = new Date(Ts_Alarme)
    let hora = Dt_Alarme.getHours()
    let minutos = Dt_Alarme.getMinutes()
    let segundos = Dt_Alarme.getSeconds()
    hora = (hora < 10 ? "0" + hora : hora)
    minutos = (minutos < 10 ? "0" + minutos : minutos)
    segundos = (segundos < 10 ? "0" + segundos : segundos)
    const Alarme_convertido = `Hora Alarme = ${hora}:${minutos}:${segundos}`
    return Res_Alarme.innerHTML = Alarme_convertido
}
const Parar_Alarme = () =>{
    Alarme_Ativado = false
    Alarme_Tocando = false
    Res_Alarme.innerHTML = "Hora Alarme:"
    Valor.value = ""
    Som_Alarme.pause()
    Som_Alarme.currentTime = 0
    Container.classList.remove("Alarme_Disparado")
}
const Formatar_Exibir_Relogio = () => {
    const Data = new Date()
    let hora = Data.getHours()
    let minutos = Data.getMinutes()
    let segundos = Data.getSeconds()
    hora = (hora < 10 ? "0" + hora : hora)
    minutos = (minutos < 10 ? "0" + minutos : minutos)
    segundos = (segundos < 10 ? "0" + segundos : segundos)
    const Horas_res = `${hora}:${minutos}:${segundos}`
    Res_Relogio.innerHTML = Horas_res
    if(Alarme_Ativado && !Alarme_Tocando){
        if(Data.getTime()>= Ts_Alarme){
            Alarme_Tocando = true
            Som_Alarme.play()
            Container.classList.add("Alarme_Disparado")
        }
    }
    focus(Valor)
}

Btn_Ativar.addEventListener("click", () => {
    Alarme_Convertido_Ativado()
})

Bnt_Parar.addEventListener("click", () => {
    Parar_Alarme()
})
const Intervalo = setInterval(Formatar_Exibir_Relogio, 1000)