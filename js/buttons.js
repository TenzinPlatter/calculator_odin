// constants for how each operator will be stored
const ADD = -1;
const SUBTRACT = -2;
const MULTIPLY = -3;
const DIVIDE = -4;
const EQUALS = -5;

let currentOperator = 0;
let recentOperation = false;
let hasDecimal = false;

// operantor functions
let add = (a, b) => parseFloat(a) + parseFloat(b);
let subtract = (a, b) => parseFloat(a) - parseFloat(b);
let multiply = (a, b) => parseFloat(a) * parseFloat(b);
// division by 0 check to be done by caller
let divide = (a, b) => parseFloat(a) / parseFloat(b);

function buildOperation(left, right, operator) {
	return {
		left,
		right,
		operator,
	};
}

function calculate(operation){
	switch (operation.operator) {
		case ADD:
			return parseFloat(
				add(operation.left, operation.right)
				.toFixed(3)
			);	

		case SUBTRACT:
			return parseFloat(
				subtract(operation.left, operation.right)
				.toFixed(3)
			);	

		case MULTIPLY:
			return parseFloat(
				multiply(operation.left, operation.right)
				.toFixed(3)
			);	

		case DIVIDE:
			if (operation.right == 0) {
				return "Cannot divide by 0";
			}

			return parseFloat(
				divide(operation.left, operation.right)
				.toFixed(3)
			);	
	}
}


// function to add to display when button is pressed
let updateDisplay = (button, display) => {
	if (recentOperation) {
		display.textContent = "";
		recentOperation = false;
	}
	
	if (!currentOperator && display.textContent) {
		switch (button) {
			case ADD:
				display.textContent += " + ";	
				break;
			case SUBTRACT:
				display.textContent += " - ";	
				break;
			case MULTIPLY:
				display.textContent += " x ";	
				break;
			case DIVIDE:
				display.textContent += " ÷ ";	
				break;
		}

		if (button >= -4 && button < 0) {
			currentOperator = button;
			hasDecimal = false;
		}
	}

	switch (button) {
		case EQUALS:
			// will create operation obj and calculate it
			break;
		case 0:
			display.textContent += "0";	
			break;
		case 1:
			display.textContent += "1";	
			break;
		case 2:
			display.textContent += "2";	
			break;
		case 3:
			display.textContent += "3";	
			break;
		case 4:
			display.textContent += "4";	
			break;
		case 5:
			display.textContent += "5";	
			break;
		case 6:
			display.textContent += "6";	
			break;
		case 7:
			display.textContent += "7";	
			break;
		case 8:
			display.textContent += "8";	
			break;
		case 9:
			display.textContent += "9";	
			break;
		case 10:
			if (!hasDecimal) {
				display.textContent += ".";	
				hasDecimal = true;
			}
			break;
	}
}

function getOperatorStr(n) {
	switch (n) {
		case -1:
			return "+";
		case -2:
			return "-";
		case -3:
			return "x";
		case -4:
			return "÷";
	}
}

function setButtons(display) {
	// numbers + decimal point
	for (let i = 0; i <= 10; i++) {
		document.querySelector(`#b${i}`).addEventListener("click", 
		() => updateDisplay(i, display)
		)
	}

	// operators
	for (let i = -4; i < 0; i++) {
		document.querySelector(`#b${i}`).addEventListener("click", 
		() => {
			updateDisplay(i, display);
			currentOperator = i;
		})
	}

	document.querySelector("#clear").addEventListener("click",
	() => {
		display.textContent = "";
		hasDecimal = false;
		recentOperation = false;
		currentOperator = 0;
	})

	// equals
	document.querySelector("#b-5").addEventListener("click", 
	() => {
		const display = document.querySelector(".display");
		let [left, right] = display
			.textContent
			.split(getOperatorStr(currentOperator));

		const operation = buildOperation(left, right, currentOperator);
		
		//NOTE: toFixed returns a string
		const result = calculate(operation);

		display.textContent = result;
		recentOperation = true;
		currentOperator = 0;
	})

	document.querySelector("#delete").addEventListener("click",
	() => {
		if (display.textContent == "") {
			return;
		}
		
		const content = display.textContent;
		const removed = content[content.length - 1];
		// all but last character
		display.textContent = display.textContent.slice(0, -1);

		if (removed == ".") {
			hasDecimal = false;
		} 

		// means it is the space after an operator
		if (removed == " ") {
			currentOperator = 0;
			display.textContent = display.textContent.slice(0, -2);
		}

	})
}
