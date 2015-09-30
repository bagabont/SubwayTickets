var MM = 96/25.4; // this should be 1mm when printed
function mm(x) {return Math.round(x*MM);} // round it to be pretty
var TicketWidth = mm(38);
var TicketHeight = mm(30); // 80mm originally

var selectedDate;
var canvas, ctx;
var ticket = document.createElement('img');
ticket.src = 'ticket.png';

var requestAnimationFrame = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) { setTimeout (callback, 1000/30); };

function init() {
	canvas = document.querySelector('#canvas');
	canvas.width = mm(210); // A4 paper
	canvas.height = Math.round(canvas.width * Math.sqrt(2));
	ctx = canvas.getContext('2d');

	calendar.init();
}

function leadWithZeroes(x, z) {
	x = x + '';
	while(x.length < z)
		x = '0' + x;
	return x;
};

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
	ctx.fillStyle = '#000000';

	var seconds = +document.getElementById('time_seconds').value;
	var id = +document.getElementById('ticket_id').value;
	var from = document.getElementById('time_from').value.split(':').map(Number);
	from = (from[0]*60 + from[1])*60 + seconds;
	var to = document.getElementById('time_to').value.split(':').map(Number);
	to = (to[0]*60 + to[1])*60 + seconds;
	var step = (+document.getElementById('time_interval').value)*60;
	var station = document.getElementById('station').value;

	var offx = 10, offy = 10;
	while(from <= to) {
		var code = barcode.generate(selectedDate, from, station, id);
		var textDate = leadWithZeroes(selectedDate.getDate(), 2) + '.'
			+ leadWithZeroes(selectedDate.getMonth()+1, 2) + '.'
			+ leadWithZeroes(selectedDate.getFullYear());
		var textTime = leadWithZeroes(from/3600|0, 2) + ':'
			+ leadWithZeroes((from/60|0)%60, 2) + ':'
			+ leadWithZeroes(from%60, 2);
		var textStation = 'Station ' + station + ' ID ' + id;

		ctx.drawImage(ticket, offx, offy, TicketWidth, TicketHeight);
		ctx.fillText(textDate, offx+mm(7), offy+mm(18));
		ctx.fillText(textTime, offx+mm(7), offy+mm(21));
		ctx.fillText(textStation, offx+mm(7), offy+mm(24));
		barcode.draw(code, offx+mm(7), offy+mm(2), 1, mm(13.5));

		from += step;
		offx += TicketWidth + 10;
		if(offx > canvas.width - TicketWidth - 10) {
			offx = 10;
			offy += TicketHeight + 10;
			if(offy > canvas.height - TicketHeight - 10)
				break;
		}
	}

	document.querySelector('#download').href = canvas.toDataURL('images/png');
}
