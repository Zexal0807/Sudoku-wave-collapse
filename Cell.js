module.exports = class Cell {

	collapsed;
	value;
	possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	rowSiblings = [];
	columnSiblings = [];
	squareSiblings = [];

	collapseTo(value) {
		this.collapsed = true;
		this.value = value;
		this.rowSiblings.forEach(cell => cell.removePossibleValue(value))
		this.columnSiblings.forEach(cell => cell.removePossibleValue(value))
		this.squareSiblings.forEach(cell => cell.removePossibleValue(value))
	}

	addRowSibling(cell) {
		this.rowSiblings.push(cell)
	}
	addColumnSiblings(cell) {
		this.columnSiblings.push(cell)
	}
	addSquareSiblings(cell) {
		this.squareSiblings.push(cell)
	}

	removePossibleValue(value) {
		this.possibleValues = this.possibleValues.filter(v => v != value);
	}

}