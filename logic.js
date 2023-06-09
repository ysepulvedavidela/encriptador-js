const d = document

// **** Al cargar la pagina se formatea lo que hay el el input **** //
d.addEventListener('DOMContentLoaded',e=>{
    $input.value = '';
})


// **** elementos del DOM **** //
const $input = d.getElementById('texto'),
    $btnEnc = d.getElementById('encriptar'),
    $btnDes = d.getElementById('desencriptar'),
    $copyBtn = d.getElementById('copy'),
    $output = d.getElementById('outText'),
    $fullSec = d.getElementById('full-section'),
    $vacioSec = d.getElementById('vacio-section')


// **** Variables necesarias **** //
let text = '';
const patron = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
}


// ***** Verificación de input y cuestiones de estilo *****
$input.addEventListener('keyup',e=>{
    text = e.target.value
    text = text.toLowerCase()
    e.target.value = text
    if(/^[a-z\s]+$/.test(text.trim())){
        $btnEnc.disabled = false;
        $btnDes.disabled = false;
        d.getElementById('details').classList.remove('error')
    }else{
        $btnEnc.disabled = true;
        $btnDes.disabled = true;
        d.getElementById('details').classList.add('error')
    }
    if(!text){
        d.getElementById('details').classList.remove('error')
        apareceText(false)
    }

    // **** Encriptar con boton ENTER **** //
    if(e.key == 'Enter'){
        $btnEnc.click()
    }
})


// **** Proceso de encriptación **** //
function encriptar(text){
    let textFinal = '';
    for(let i=0; i<text.length; i++){
        let char = text[i]
        if(char in patron){
            textFinal += patron[char]
        }else{
            textFinal += char
        }
    }
    return textFinal
}

// **** Proceso de desencriptación **** //
function desencriptar(text){
    Object.values(patron).forEach(el=>{
        while(text.includes(el)){
            let i = Object.values(patron).indexOf(el)
            text = text.replace(el, Object.keys(patron)[i])
        }
    })
    return text;
}

// **** Cuando se apretan los botones de encriptación o desencriptación cambia el frontend **** //
function apareceText(bool){
    if(bool){
        $vacioSec.classList.add('none')
        $fullSec.classList.remove('hidden-up')
    }else{
        $vacioSec.classList.remove('none')
        $fullSec.classList.add('hidden-up')
    }
    
}

// **** Asignacion de eventos a los btns **** //
d.addEventListener('click',e=>{
    if(e.target == $btnEnc){
        if(text){
            apareceText(true)
            $output.textContent = encriptar(text)
        }
    }
    if(e.target == $btnDes){
        apareceText(true)
        $output.textContent = desencriptar(text)
    }
    if(e.target == $copyBtn){
        
        text = $output.textContent;
        navigator.clipboard.writeText(text)
        $input.value = text;
        $btnDes.disabled = false;

        $copyBtn.classList.add('btn-copied')
        $copyBtn.textContent = 'Copiado'
        setTimeout(() => {
            $copyBtn.classList.remove('btn-copied')
            $copyBtn.textContent = 'Copiar'
        }, 1500);
    }

    // **** Boton del inicio **** //
    if(e.target.matches('.nav-btn') || e.target.matches('.nav-btn > span')){
        d.getElementById('nav-btn').classList.toggle('active')
    }else{
        d.getElementById('nav-btn').classList.remove('active')
        
    }

    if(e.target.matches('.btn')){
        let x = e.x - e.target.offsetLeft
        let y = e.y - e.target.offsetTop
        let span = d.createElement('span')
        span.style.top = `${y}px`
        span.style.left = `${x}px`
        e.target.appendChild(span)

        setTimeout(() => {
            span.remove()
        }, 500);
    }
})