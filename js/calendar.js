var calendar = function() {
	var WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var fillTable = function(date, table) {
		document.querySelector('#current-month').innerHTML = MONTHS[date.getMonth()] + ' ' + date.getFullYear();
		var month = date.getMonth();
		date.setDate(0);
		while(date.getDay() !== 1)
			date.setDate(date.getDate()-1);

		table.innerHTML = '<tr><th>' + WEEKDAYS.join('</th><th>') + '</th></tr>';

		var i, j, row, cell;
		for(i=0; i<6; ++i)
		{
			row = document.createElement('tr');
			for(j=0; j<7; ++j)
			{
				cell = document.createElement('td');
				cell.innerHTML = date.getDate();
				if(date.getMonth() === month)
					cell.className = 'curr-month';
				else cell.className = 'other-month';
				cell.id = date;

				row.appendChild(cell);
				date.setDate(date.getDate()+1);
			}
			table.appendChild(row);
		}
	}

	var setDate = function(date) {
		selectedDate = new Date(date + '');
		document.querySelector('#selected-date').innerHTML =
			selectedDate.getDate() + ' ' +
			MONTHS[selectedDate.getMonth()] + ' ' +
			selectedDate.getFullYear();
		draw();
	}

	var init = function() {
		var datepick = document.querySelector('#datepick');
		var table = datepick.querySelector('table');
		var date = new Date();
		date.setHours(0);
		setDate(date);

		document.querySelector('#time_seconds').addEventListener('keyup', draw);
		document.querySelector('#ticket_id').addEventListener('keyup', draw);
		document.querySelector('#time_from').addEventListener('keyup', draw);
		document.querySelector('#time_to').addEventListener('keyup', draw);
		document.querySelector('#time_interval').addEventListener('keyup', draw);
		document.querySelector('#station').addEventListener('change', draw);

		datepick.querySelector('#btn-prev')
			.addEventListener('click', function() {
			date.setMonth(date.getMonth()-2);
			fillTable(date, table);
		})
		datepick.querySelector('#btn-next')
			.addEventListener('click', function() {
			date.setMonth(date.getMonth());
			fillTable(date, table);
		});

		fillTable(date, table);
		table.addEventListener('click', function(ev) {
			if(ev.target.className === 'curr-month')
				setDate(ev.target.id);
		});
	};

	return {
		init: init,
	};
}();
