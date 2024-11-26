let prevAns = 0

function myEval(expression) {
    let terms = splitString(expression)
    let postFix = bodmas(terms)
    let awnser = evaluateExpression(postFix)
    prevAns = awnser
    return awnser
}

function isnum(n) {
    nums = '0987654321';
    nums.forEach(element => {
        if (n == element)
            return true;
    });
    return false;
}


function splitString(equ) {
    const tokens = [];
    // Match operators, or numbers
    const regex = /[+\-*/^()×÷√]|sin|cos|tan|log|abs|ans|\d+(\.\d+)?/g;
    let match;
    let lastToken = null;

    while ((match = regex.exec(equ)) !== null) {
        let token = match[0];

        // If a minus is standing on its own, ignore some of these symbols
        if (token === "-" && (lastToken === null || /[+\-*/(×÷]/.test(lastToken))) {
            match = regex.exec(equ); // Get the next token
            if (match) {
                token = `-${match[0]}`;
            } else {
                throw new Error("Invalid syntax: Standalone '-'");
            }
        }
        if (lastToken && (/[)\dπ]/.test(lastToken) && /[\dπ(]|cos|sin|tan|log/.test(token))) {
            tokens.push("×");
        }
        tokens.push(token);
        lastToken = token;
    }
    console.log(tokens)
    return tokens;
}

// Give priority to some functions over others
function bodmas(terms) {
    const precedence = { '+': 1, '-': 1, '*': 2, '×': 2, '÷': 3, '/': 3, '^': 4, '√': 4, 'sin': 5, 'cos': 5, 'tan': 5, 'log': 5 };
    const stack = [];
    const values = [];


    terms.forEach(
        term => {
            console.log(term)
            if (!isNaN(term)) {
                values.push(term);
            } else if (term === '(') {
                stack.push(term);
            } else if (term === ')') {

                while (stack.length && stack[stack.length - 1] !== '(') {// process the subexpression untill the opening bracket is found again
                    values.push(stack.pop()); //add the operators
                }

                stack.pop();
            } else {

                while (stack.length && precedence[stack[stack.length - 1]] >= precedence[term]) {
                    values.push(stack.pop());// Add highest precedences
                }

                stack.push(term);// add items if they have a higher precedence
            }
        });

    while (stack.length) {// remainder of operators go here
        values.push(stack.pop());
    }
    return values;
}

function evaluateExpression(expression) {
    let calculations = []
    let n1 = ''
    let n2 = ''

    // Get 1 (or 2) number(s) in a and b, then perform operation on them
    expression.forEach(
        term => {
            console.log(term)
            if (term == 'sin' || term == 'cos' || term == 'tan' || term == "√" || term == "log") {
                n1 = calculations.pop()
                b = term === null;
            } else if (isNaN(term)) {
                b = calculations.pop()
                n1 = calculations.pop()
            } else {
                calculations.push(parseFloat(term))
            }
            switch (term) {
                case '+':
                    calculations.push(n1 + b)
                    break;
                case '-':
                    calculations.push(n1 - b)
                    break;
                case '×':
                    calculations.push(n1 * b)
                    break;
                case '÷':
                    calculations.push(n1 / b)
                    break;
                case '^':
                    calculations.push(Math.pow(n1, b))
                    break;
                case "√":
                    calculations.push(Math.sqrt(n1))
                    break;
                case 'sin':
                    calculations.push(Math.sin(n1 * (Math.PI / 180)))
                    break;
                case 'cos':
                    calculations.push(Math.cos(n1 * (Math.PI / 180)))
                    break;
                case 'tan':
                    calculations.push(Math.tan(n1 * (Math.PI / 180)))
                    break;
                case 'log':
                    calculations.push(Math.log10(n1))
                    break;
            }

        }

    )

    return calculations.pop()
}

// REMEMBER to pass only integer items into this function or you will break it and then I will break you.
function toRom(num) {
    if (num === 80085) {
        return "Hahaha boobs."
    }

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
    if (num >= 5) {
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

// Evaluate when enter has been pressed
display.addEventListener("keydown", (event) => {
    console.log("Event has occured with key " + event.key)
    if (event.key === "Enter") { // Checks if enter has been pressed
        try {
            display.value = myEval(display.value);
        } catch (error) {
            display.value = 'Error';
            console.log(error);
        }
    }
});

// Enforces that valid characters can be input
display.addEventListener("input", () => {
    const lastChar = display.value.charAt(display.value.length - 1);

    if (!("cosintablg0987654321()^-+.".includes(lastChar))) {
        // Prevent the invalid character from being added
        display.value = display.value.slice(0, -1);
    }
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'AC') {
            display.value = '';
        } else if (button.textContent === '=') {
            try {

                display.value = myEval(display.value);
            } catch (error) {
                display.value = 'Error';
                console.log(error);
            }
        } else if (button.textContent === 'DEL') {
            display.value = display.value.slice(0, display.value.length - 1)
        } else if (button.textContent === '√') {
            display.value += '√(';
        } else if (button.textContent === '^') {
            display.value += '^(';
        } else if (button.textContent === 'sin') {
            display.value += 'sin('
        } else if (button.textContent === 'cos') {
            display.value += 'cos('
        } else if (button.textContent === 'tan') {
            display.value += 'tan('
        } else if (button.textContent === 'log') {
            display.value += 'log('
        } else if (button.textContent === 'π') {
            display.value += '3.1415926'
        } else if (button.textContent === '×10') {
            display.value += '×10^('
        } else if (button.textContent === 'Ans') {
            display.value += '(' + prevAns + ')';
        } else if (button.textContent === 'Ⅵ') {
            display.value = toRom(parseInt(display.value))
        } else {
            display.value += button.textContent;
        }
    });
});
