const keys = document.querySelectorAll('.key');
const titleContainer = document.querySelector('header')
const text = document.querySelector('h1');
const p = document.querySelector('p')
const walk = 100;

function transitionFinished(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('pressed')
}
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('pressed')
}
function shadow(e) {
    const width = titleContainer.offsetWidth;
    const height = titleContainer.offsetHeight;
    let x = e.offsetX;
    let y = e.offsetY;
    if (this !== e.target) { //Si el hover es sobre un nodo hijo, me indicara la posicion EN el nodo
        x = x + e.target.offsetLeft; //Lo soluciono sumandole el Left y el Top del hijo
        y = y + e.target.offsetTop;
    }
    const xWalk = Math.round((x / width * walk) - (walk / 2)); // Voy de 50 a - 50
    const yWalk = Math.round((y / height * walk) - (walk / 2));
    text.style.textShadow = `${xWalk}px ${yWalk}px 2px #B09E3E`
}
function handleMousemove(e) {
    if (e.target !== titleContainer && e.target !== text && e.target !== p) {
        text.style.textShadow = 'none'
    }
}
window.addEventListener('mousemove', handleMousemove)

window.addEventListener('keydown', playSound)

keys.forEach(key => {
    key.addEventListener('transitionend', transitionFinished)
})
titleContainer.addEventListener('mousemove', shadow)