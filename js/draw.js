var draw = function() {
	var canvas, context;
	var TicketWidth = util.mm(38);
	var TicketHeight = util.mm(30); // 80mm originally
	var ticket = document.createElement('img');
	ticket.src = 'ticket.png';

	var init = function() {
		canvas = document.getElementById('canvas');
		canvas.width = util.mm(210); // A4 paper
		canvas.height = Math.round(canvas.width * Math.sqrt(2));
		context = canvas.getContext('2d');
	};

	var redraw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.globalAlpha = 1;
		context.fillStyle = '#000000';

//		var seconds = +document.getElementById('time_seconds').value;
//		var id = +document.getElementById('ticket_id').value;
//		var from = document.getElementById('time_from').value.split(':').map(Number);
//		from = (from[0]*60 + from[1])*60 + seconds;
//		var to = document.getElementById('time_to').value.split(':').map(Number);
//		to = (to[0]*60 + to[1])*60 + seconds;
//		var step = (+document.getElementById('time_interval').value)*60;
//		var station = document.getElementById('station').value;

		var date = settings.date;
		var from = (settings.fromHours*60 + settings.fromMinutes)*60 + settings.seconds;
		var to = (settings.fromHours*60 + settings.fromMinutes)*60 + settings.seconds;
		var step = settings.interval;
		var station = settings.station;
		var entrance = settings.entrance;

		var offsetX = 10, offsetY = 10;
		while(from <= to) {
			var code = barcode.generate(date, from, station, entrance);
			var textDate = util.leadWithZeroes(date.getDate(), 2) + '.'
				+ util.leadWithZeroes(date.getMonth()+1, 2) + '.'
				+ util.leadWithZeroes(date.getFullYear());
			var textTime = util.leadWithZeroes(from/3600|0, 2) + ':'
				+ util.leadWithZeroes((from/60|0)%60, 2) + ':'
				+ util.leadWithZeroes(from%60, 2);
			var textStation = 'Station ' + station + ' Entrance ' + entrance;

			context.drawImage(ticket, offsetX, offsetY, TicketWidth, TicketHeight);
			context.fillText(textDate, offsetX+util.mm(7), offsetY+util.mm(18));
			context.fillText(textTime, offsetX+util.mm(7), offsetY+util.mm(21));
			context.fillText(textStation, offsetX+util.mm(7), offsetY+util.mm(24));
			barcode.draw(context, code, offsetX+util.mm(7), offsetY+util.mm(2), 1, util.mm(13.5));

			from += step;
			offsetX += TicketWidth + 10;
			if(offsetX > canvas.width - TicketWidth - 10) {
				offsetX = 10;
				offsetY += TicketHeight + 10;
				if(offsetY > canvas.height - TicketHeight - 10)
					break;
			}
		}

		document.getElementById('download').href = canvas.toDataURL('images/png');
	};

	return {
		init: init,
		redraw: redraw,
	};
}();
