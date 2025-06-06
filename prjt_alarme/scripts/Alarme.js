const Bnt_Aud_Upload = document.querySelector("#Aud_Upload")
const Nome_do_Arquivo = document.querySelector("#File_Name")
const Bnt_Definir_Alarme = document.querySelector("#Bnt_Definir_Alarme")
let Array_Objtos = JSON.parse(localStorage.getItem('arrayObjetos')) || []

//formatar o botao de enviar arquivo
const Enviar_Arquivo = () => {
    let S_Arquivo = Bnt_Aud_Upload.files.length > 0 ? Bnt_Aud_Upload.files[0].name : "Nenhum arquivo selecionado"
    Nome_do_Arquivo.innerHTML = S_Arquivo
}
Bnt_Aud_Upload.addEventListener("change", (evt) => {
    Enviar_Arquivo()
})

//formatar o calendario
const timepicker = flatpickr("#time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",  // Formato de hora (24h)
    time_24hr: true
});

const Construir_Alarme = () => {
    let tipo_som = ""
    const Hora_Alarme = document.querySelector("#time").value
    const Calendario = document.querySelector("#Calendario").value
    const Todos_os_Radios = [...document.querySelectorAll('input[type="radio"]')]

    if (Todos_os_Radios[0].checked) {
        tipo_som = "padrao"
    } else if (Todos_os_Radios[1].checked) {
        tipo_som = "ninar"
    }
    const Alarme_Data = {
        hora: Hora_Alarme,
        calendario: Calendario,
        tipoSom: tipo_som,

        getHora: function () {
            return this.hora
        },
        getTipo_Som: function () {
            return this.tipoSom
        },
        getCalendario: function () {
            return this.calendario
        },
        Objetos_Info: function () {
            return [
                this.getHora(),
                this.getCalendario(),
                this.getTipo_Som()
            ]
        }
    };
    let Info_Alarme = Alarme_Data.Objetos_Info()

    const Limite_Maximo = 3

    if (Array_Objtos.length >= Limite_Maximo) {
        Array_Objtos.shift()
    }

    Array_Objtos.push(Info_Alarme)

    localStorage.setItem("arrayObjetos", JSON.stringify(Array_Objtos))

    localStorage.setItem("alarme", JSON.stringify(Info_Alarme))
    console.log(Array_Objtos)
    console.log(localStorage.getItem("arrayObjetos"))
}


Bnt_Definir_Alarme.addEventListener("click", () => {
    Construir_Alarme()
    console.log("clck")
})
