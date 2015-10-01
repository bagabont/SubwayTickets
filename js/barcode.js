var barcode = function() {
	var UPCA_DIGITS = [
		[3, 2, 1, 1], [2, 2, 2, 1], [2, 1, 2, 2], [1, 4, 1, 1], [1, 1, 3, 2],
		[1, 2, 3, 1], [1, 1, 1, 4], [1, 3, 1, 2], [1, 2, 1, 3], [3, 1, 1, 2],
	];

	var generate = function(date, seconds, station, entrance) {
		var origin = new Date(2014, 2, 6); // Who chose this date!? :D
		var days = Math.round((date-origin)/(24*60*60*1000));

		var code = leadWithZeroes(days, 3)
			+ leadWithZeroes(seconds, 5)
			+ leadWithZeroes(station, 2)
			+ leadWithZeroes(entrance, 1);

		var checksum = 0;
		for(var i in code) {
			if((code.length-i)%2)
				checksum += 3*(+code[i]);
			else checksum += (+code[i]);
		}
		code += checksum*9%10;
		return code;
	}

	var draw = function(context, code, x, y, mwidth, height) {
		var digits = [1, 1, 1];
		for(var i=0; i<6; ++i)
			digits = digits.concat(UPCA_DIGITS[+code[i]]);
		digits = digits.concat([1, 1, 1, 1, 1]);
		for(var i=6; i<12; ++i)
			digits = digits.concat(UPCA_DIGITS[+code[i]]);
		digits = digits.concat([1, 1, 1]);

		var black = true;
		digits.forEach(function(w) {
			if(black)
				context.fillRect(x, y, w*mwidth, height);
			black = !black;
			x += w*mwidth;
		});
	};

	return {
		draw: draw,
		generate: generate,
	};
}();
