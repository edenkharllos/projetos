const Teclas_Num = [...document.querySelectorAll(".num")]
const Teclas_Op = [...document.querySelectorAll(".T_Op")]
const Display = document.querySelector("#Resultado_Display")
const Resultado = document.querySelector(".Tecla_Res")
const Bnt_Limpar = document.querySelector("#bnt_Limpar")
const Bnt_igual = document.querySelector("#bnt_Igual")
const Bnt_Copiar = document.querySelector("#Bnt_Copiar")

let sinal = false
let decimal = false
let parenteses = false

Teclas_Num.map((el) => {
    el.addEventListener("click", (evt) => {
        sinal = false
        if (evt.target.innerHTML === ",") {
            if (!decimal) {
                decimal = true
                if (Display.innerHTML === "0") {
                    Display.innerHTML = "0,"
                } else {
                    Display.innerHTML += evt.target.innerHTML
                }
            }
        } else {
            if (Display.innerHTML === "0") {
                Display.innerHTML = ""
            }
            Display.innerHTML += evt.target.innerHTML
        }
    })
})

Teclas_Op.map((el) => {
    el.addEventListener("click", (evt) => {
        if (!sinal) {
            sinal = true
            if (Display.innerHTML === "0") {
                Display.innerHTML = ""
            }
            if (evt.target.innerHTML === "x") {
                Display.innerHTML += "*"
            } else {
                Display.innerHTML += evt.target.innerHTML
            }
        }
    })
})

Bnt_Limpar.addEventListener("click", (evt) => {
    sinal = false
    decimal = false
    parenteses = false
    Display.innerHTML = "0"
})

Bnt_igual.addEventListener("click", (evt)=>{
    parenteses = false
    sinal = false 
    decimal = false
    let res = eval(Display.innerHTML)
    Display.innerHTML = res
})

Bnt_Copiar.addEventListener("click", (evt)=>{
    navigator.clipboard.writeText(Display.innerHTML)
    //para mobile quando precisar copiar inputs
    //input.select()
    //input.setSelectionRange(0,9999999)
    //navigator.clipboard.writeText(input.value)
})