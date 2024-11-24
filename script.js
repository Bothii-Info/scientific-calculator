
function myEval(input){

}

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'AC') {
            display.value = '';
        } else if (button.textContent === '=') {
            try {
                display.value = eval(display.value);
            } catch (error) {
                display.value = 'Error';
            }
        } else if (button.textContent === '√') {
            display.value = Math.sqrt(display.value);
        } else if (button.textContent === '^') {
            display.value += '^';
        } else if (button.textContent === 'sin') {
            display.value = Math.sin(display.value * Math.PI / 180);
        } else if (button.textContent === 'cos') {
            display.value = Math.cos(display.value * Math.PI / 180);
        } else if (button.textContent === 'tan') {
            display.value = Math.tan(display.value * Math.PI / 180);
        } else if (button.textContent === 'abs') {
            display.value = Math.abs(display.value);
        } else {
            display.value += button.textContent;
        }
    });
});