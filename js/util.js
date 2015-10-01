var util = function() {
	var MM = 96/25.4; // this should be 1mm in pixels when printed

	var mm = function(x) {
		return Math.round(x*MM); // round it to be pretty
	};

	var zeroes = function(x, z) {
		x = x + '';
		while(x.length < z)
			x = '0' + x;
		return x;
	};

	return {
		mm: mm,
		leadWithZeroes: zeroes,
	};
}();
