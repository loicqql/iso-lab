import sinus from './sinus.js'
import particles from './particles.js'

window.addEventListener('DOMContentLoaded', () => {

    const onEvent = (selectorCss, event, functionCallback) => {document.querySelectorAll(selectorCss).forEach(el => {el.addEventListener(event, function() {functionCallback(this)})})};

    let clear = () => {document.querySelector('main').innerHTML = ''}

    onEvent('.sinus', 'click', () => {
        clear();
        sinus();
    });

    onEvent('.particles', 'click', () => {
        clear();
        particles();
    });

    
});

