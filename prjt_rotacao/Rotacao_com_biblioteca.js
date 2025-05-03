const Olhos = [...document.querySelectorAll(".Olhos")]
let posicao_Y = 0
let posicao_X = 0

const Rotacionar_Olhos=(X,Y)=>{
    const C_Radianos = Math.atan2(Y,X)
    const C_Graus = C_Radianos * 180/ Math.PI
    Olhos.map((ol)=>{
        ol.style.transform= "rotate("+C_Graus+"deg)"
    })
}
window.addEventListener("mousemove", (evt)=>{
    posicao_X = evt.clientX
    posicao_Y = evt.clientY
    Rotacionar_Olhos(posicao_X,posicao_Y)
    
})
