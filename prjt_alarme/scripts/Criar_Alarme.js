const Div_Area_Alarmes = document.querySelector("#Area_Alarmes")
const Bnt_Ativar_Alarme = document.querySelector("#Btn_Ativar")
const Bnt_Parar_Alarmes = document.querySelector("#Bnt_Parar")
let Alarme_Ativado = false
let Alarme_Tocando = false
let Array_divs_DOM = []
let Som_do_Alarme = null
let Array_Alarmes = JSON.parse(localStorage.getItem("arrayAlarmes")) || []

const Som_Padrao = new Audio("sons/padrao.mp3")
Som_Padrao.loop = -1
const Som_ninar = new Audio("sons/ninar.mp3")
Som_ninar.loop = -1

const Criar_Elementos_HTML = (Objt, index) => {

    let id = `ID-${index}`

    if (Div_Area_Alarmes.querySelector(`#${id}`)) {
        console.warn(`A div com o ID=${id} já existe!! portanto não possivel crialo`)
        return;

    }

    if (Div_Area_Alarmes.children.length >= 3) {
        console.warn("limete de alarmes excedido")
        return;
    }

    let img = document.createElement("img")
    img.setAttribute("class", "icon_lixeira")
    img.setAttribute("id", id)
    img.setAttribute("src", "../img/lixeira.svg")
    img.setAttribute("data-index", index)
    let div = document.createElement("div")
    div.setAttribute("class", "Alarme")
    div.setAttribute("id", `${id}`)

    let p = document.createElement("p")
    let Formatacao_objeto = `Alarme "${index}"<br> Hora: ${Objt[0]} <br> Data: ${Objt[1]} <br> Toque: ${Objt[2]}`
    p.innerHTML = Formatacao_objeto
    div.append(p)
    div.appendChild(img)
    Div_Area_Alarmes.appendChild(div)

    img.addEventListener("click", (evt) => {

        const pai = evt.target.parentNode
        const array = JSON.parse(localStorage.getItem("arrayObjetos")) || []
        const idx = parseInt(evt.target.getAttribute("data-index"))

        array.splice(idx, 1)
        localStorage.setItem("arrayObjetos", JSON.stringify(array))
        pai.remove()
        Atualizar_Indices()

    })
}

const Atualizar_Indices = () => {
    const Botoes = document.querySelectorAll(".icon_lixeira")
    Botoes.forEach((btn, ind) => {
        btn.setAttribute("data-index", ind)
    })
}

const Carregar_Alarmes = () => {
    const array = JSON.parse(localStorage.getItem("arrayObjetos")) || []

    array.forEach((al, idx) => {
        const div = Criar_Elementos_HTML(al, idx)
    })
}

const Obter_Alarme_a_Tocar = () => {

    const array = JSON.parse(localStorage.getItem("arrayObjetos")) || []
    let Ts_Atual = Date.now()

    const Alarme_com_Timestamp = array.map(([horaAlarme, dataAlarme, tipoSom]) => {
        const Ts_Alarme = new Date(`${dataAlarme}T${horaAlarme}:00`).getTime()
        return { horaAlarme, dataAlarme, tipoSom, Ts_Alarme }
    })
        .filter(alarme => Ts_Atual >= alarme.Ts_Alarme && Ts_Atual <= alarme.Ts_Alarme + 2000)

    Alarme_com_Timestamp.sort((a, b) => a.Ts_Alarme - b.Ts_Alarme)

    const Alarme_a_Disparar = Alarme_com_Timestamp[0]

    if (Alarme_a_Disparar) {
        return Alarme_a_Disparar
    } else {
        console.log("Nenhum alarme")
        return null
    }
}

const Play_Alarme = () => {
    const Alarme = Obter_Alarme_a_Tocar()

    if (Alarme) {

        if (Alarme_Ativado && !Alarme_Tocando) {

            Alarme_Tocando = true

            if (Alarme.tipoSom === "padrao") {
                Som_Padrao.play()
                console.log("Toncando som normal")
            } else if (Alarme.tipoSom === "ninar") {
                Som_ninar.play()
                console.log("Tocando som ninar")
            }
        }
    } else {
        console.log("nenhum alarme")
    }
}
const Parar_Alarme = () => {
    Alarme_Ativado = false
    Alarme_Tocando = false
    Som_Padrao.pause()
    Som_ninar.pause()
}

window.addEventListener("DOMContentLoaded", () => {
    Carregar_Alarmes()
})
Bnt_Ativar_Alarme.addEventListener("click", (evt) => {
    Alarme_Ativado = true
    Play_Alarme()
    setInterval(Play_Alarme, 1000)
    window.alert("Alarmes ativados!!!")
})
Bnt_Parar_Alarmes.addEventListener("click",(evt)=>{
    Parar_Alarme()
    window.alert("Alarmes desativados!!!")
})
