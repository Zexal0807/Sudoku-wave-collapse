const Matrix = require("./Matrix")

let m = [
	[5, 3,  ,  , 7,  ,  ,  ,  ],
	[6,  ,  , 1, 9, 5,  ,  ,  ],
	[ , 9, 8,  ,  ,  ,  , 6,  ],
	[8,  ,  ,  , 6,  ,  ,  , 3],
	[4,  ,  , 8,  , 3,  ,  , 1],
	[7,  ,  ,  , 2,  ,  ,  , 6],
	[ , 6,  ,  ,  ,  , 2, 8,  ],
	[ ,  ,  , 4, 1, 9,  ,  , 5],
	[ ,  ,  ,  , 8,  ,  , 7, 9]
];

let mm = new Matrix();
mm.print();
mm.init(m);

const fs = require("fs");
fs.writeFileSync("./output.txt", "END INIT \n", {flag:"a"} );
mm.tryToCollapse();
fs.writeFileSync("./output.txt", "END COLLAPSE \n", {flag:"a"} );