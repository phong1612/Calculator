let runningTotal = 0.0;
let buffer = "0";
let prevOperator;
let pressed = false;
const screen = document.querySelector(".screen");

function checkOperator(val) {
    if(val === "C" || val === "+" || val === "−" || val === "×" || val === "÷" || val === "←" || val === "=") {
        return true;
    }
    return false;
}
function buttonClick(value) {
    if(checkOperator(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}
function handleNumber(valueString) {
    if(pressed) {
        buffer = "0";
        pressed = false;
    }
    if(buffer === "0") {
        buffer = valueString;
    }
    else 
    {
        buffer += valueString;
    }

}
function handleSymbol(symbol) {
    switch(symbol) 
    {
        case "C":
            buffer = "0";
            prevOperator = null;
            runningTotal = 0.0;
            break;
        case '=':
            if(prevOperator === null) 
            {
                return;
            }
            flushOperation(parseFloat(buffer));
            prevOperator = null;
            buffer = runningTotal;
            pressed = true;
            break;
        case '←':
            if(buffer.length === 1) 
            {
                buffer = "0";
            } else 
            {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "−":
        case '×':
        case '÷':
            prevOperator = symbol;
            handleMath(symbol);
            break;
    }
}
function handleMath(symbol) {
    if(buffer === '0') 
    {
        return;
    }
    if(buffer.charAt(buffer.length - 1) == '.') 
    {
        buffer = "Error. Press C";
        return;
    }
    const floatBuffer = parseFloat(buffer);
    buffer = "0";
    if(runningTotal === 0)
    {
        runningTotal = floatBuffer;
    }
    else
    {
        flushOperation(floatBuffer);
    }
    prevOperator = symbol;
    buffer = '0';
}

function flushOperation(floatBuffer) {

    if(prevOperator === "+")
    {
        runningTotal += floatBuffer;
    }
    else if(prevOperator === "−")
    {
        runningTotal -= floatBuffer;
    }
    else if(prevOperator === "×") {
        runningTotal *= floatBuffer;
    }
    else if(prevOperator === "÷") {
        runningTotal /= floatBuffer;
    }
}


function init() {
    const butt = document.querySelectorAll(".calc-button");
    butt.forEach(x => {
        x.addEventListener('click', () => {
            buttonClick(x.innerText);
        })
    })
} 
window.onload = init();