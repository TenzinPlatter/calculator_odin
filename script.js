const ADD = 0;
const SUBTRACT = 1;
const MULTIPLY = 2;
const DIVIDE = 3;


let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

function buildOperation(left, right, operator) {
	return {
		left,
		right,
		operator,
	};
}

function operate(operation){
	switch (operation.operator) {
		case ADD:
			return add(left, right);	

		case SUBTRACT:
			return subtract(left, right);

		case MULTIPLY:
			return multiply(left, right);

		case DIVIDE:
			return divide(left, right);
	}
}
