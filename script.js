
function myEval(input){

}

function toRom(num) {
    let res = '';
    
    while (num >= 1000) {
        res += 'M'
        num -= 1000
    }
    while (num >= 500) {
        res += 'D'
        num -= 500
    }
    while (num >= 100) {
        res += 'C'
        num -= 100
    }
    while (num >= 50) {
        res += 'L'
        num -= 50
    }
    while (num >= 10) {
        res += 'X'
        num -= 10
    }
    if (num == 9) {
        res += 'IX';
        return res;
    }
    if (num == 4) {
        res += 'IV';
        return res;
    }
    if (num >=5) {
        res += 'V'
        num -= 5
    }
    while (num > 0) {
        num--;
        res += 'I';
    }
    return res;
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
        } else if (button.textContent === 'DEL') {
            display.value = display.value.slice(0, display.value.length-1)
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
        } else if (button.textContent === 'Ⅰ') {
            display.value = toRom(parseInt(display.value))
        } else {
            display.value += button.textContent;
        }
    });
});
