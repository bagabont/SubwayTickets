var MM = 96/25.4; // this should be 1mm when printed
function mm(x) {return Math.round(x*MM);} // round it to be pretty
var TicketWidth = mm(38);
var TicketHeight = mm(30); // 80mm originally

var selectedDate;

function init() {
	draw.init();
	calendar.init();
}

function leadWithZeroes(x, z) {
	x = x + '';
	while(x.length < z)
		x = '0' + x;
	return x;
};
