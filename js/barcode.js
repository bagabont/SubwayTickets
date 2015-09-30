var drawBarcode = function() {
	var DIGITS = [
		[3, 2, 1, 1], [2, 2, 2, 1], [2, 1, 2, 2], [1, 4, 1, 1], [1, 1, 3, 2],
		[1, 2, 3, 1], [1, 1, 1, 4], [1, 3, 1, 2], [1, 2, 1, 3], [3, 1, 1, 2],
	];

	var drawBarcode = function(code, x, y, mwidth, height) {
		var digits = [1, 1, 1];
		for(var i=0; i<6; ++i)
			digits = digits.concat(DIGITS[+code[i]]);
		digits = digits.concat([1, 1, 1, 1, 1]);
		for(var i=6; i<12; ++i)
			digits = digits.concat(DIGITS[+code[i]]);
		digits = digits.concat([1, 1, 1]);

		var black = true;
		digits.forEach(function(w) {
			if(black)
				ctx.fillRect(x, y, w*mwidth, height);
			black = !black;
			x += w*mwidth;
		});
	};

	return drawBarcode;
}();
