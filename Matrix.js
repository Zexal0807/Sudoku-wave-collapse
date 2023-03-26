const Cell = require("./Cell");
const fs = require("fs");


module.exports = class Matrix {

	cells = [];

	init(m) {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (m[i][j] != undefined) {
					this.cells[i][j].collapseTo(m[i][j]);
					this.print()
				}
			}
		}
	}

	constructor() {
		// Load matrix
		for (let i = 0; i < 9; i++) {
			this.cells[i] = [];
			for (let j = 0; j < 9; j++) {
				this.cells[i][j] = new Cell();
			}
		}
		// Set siblings
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				// Set row siblings
				for (let k = 0; k < 9; k++) {
					if (j != k) {
						this.cells[i][j].addRowSibling(this.cells[i][k])
					}
				}
				// Set row siblings
				for (let k = 0; k < 9; k++) {
					if (i != k) {
						this.cells[i][j].addColumnSiblings(this.cells[k][j])
					}
				}

				// Set square siblings
				let x = Math.floor(i / 3);
				let y = Math.floor(j / 3);
				for (let k = 0; k < 3; k++) {
					for (let l = 0; l < 3; l++) {
						if (x + k != i || y + l != j) {
							this.cells[i][j].addSquareSiblings(this.cells[3*x + k][3*y + l])
						}
					}
				}
			}
		}
	}

	tryToCollapse(){
		let changed = false;
		do{
			changed = false;
			for(let i = 0; i < 9; i++){
				for(let j = 0; j < 9; j++){
					let cell = this.cells[i][j];
					if(!cell.collapsed && cell.possibleValues.length == 1){
						changed = true;
						cell.collapseTo(cell.possibleValues[0]);
						this.print();
					}
				}
			}
		}while(changed);
	}

	print() {
		const FILE = "./output.txt";

		for (let i = 0; i < 9; i++) {

			// fs.writeFileSync(FILE, " | ", {flag:"a"} )

			let s = ["", "", ""];

			for (let j = 0; j < 9; j++) {
				let cell = this.cells[i][j];

				if (cell.collapsed) {
					s[0] += "         ";
					s[1] += `     ${cell.value}   `;
					s[2] += "         ";
				} else {
					let s1 = cell.possibleValues[0] || " ";
					let s2 = cell.possibleValues[1] || " ";
					let s3 = cell.possibleValues[2] || " ";
					let s4 = cell.possibleValues[3] || " ";
					let s5 = cell.possibleValues[4] || " ";
					let s6 = cell.possibleValues[5] || " ";
					let s7 = cell.possibleValues[6] || " ";
					let s8 = cell.possibleValues[7] || " ";
					let s9 = cell.possibleValues[8] || " ";

					s[0] += ` ${s1}, ${s2}, ${s3} `;
					s[1] += ` ${s4}, ${s5}, ${s6} `;
					s[2] += ` ${s7}, ${s8}, ${s9} `;

					// if (j != 8) {
					// 	s[0] += "|";
					// 	s[1] += "|";
					// 	s[2] += "|";
					// }
				}
				if (j % 3 == 2 && j != 8) {
					s[0] += "|X|";
					s[1] += "|X|";
					s[2] += "|X|";
				}else if (j != 8) {
					s[0] += "|";
					s[1] += "|";
					s[2] += "|";
				}
			}
			fs.writeFileSync(FILE, s.join("\n") + "\n", { flag: "a" });

			if(i == 2 || i == 5)
				fs.writeFileSync(FILE, " xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \n", { flag: "a" });
			else if (i != 8)
				fs.writeFileSync(FILE, " ------------------------------------------------------------------------------------------ \n", { flag: "a" })
		}
		fs.writeFileSync(FILE, "\n\n", { flag: "a" })
	}


}