const Res_Relogio = document.querySelector("#Res_Relogio")

const Formatar_Exibir_Relogio=()=>{
    const D_Hora = new Date()
    let hora = D_Hora.getHours()
    let minutos = D_Hora.getMinutes()
    let segundos = D_Hora.getSeconds()
    hora = (hora < 10 ? "0"+ hora:hora)
    minutos = (minutos < 10 ? "0" + minutos:minutos)
    segundos = (segundos < 10 ? "0" + segundos:segundos)
    const Hora_Formatada = `${hora}:${minutos}:${segundos}`
    Res_Relogio.innerHTML = Hora_Formatada
}
const Intervalo = setInterval(Formatar_Exibir_Relogio, 1000)
