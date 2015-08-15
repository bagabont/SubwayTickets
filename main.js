var WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var selectedDate;

function init() {
	var container = document.querySelector('#datepick');
	var table = container.querySelector('table');
	var date = new Date();

	setDate(date);

	container.querySelector('#btn-prev')
		.addEventListener('click', function() {
		date.setMonth(date.getMonth()-2);
		fillTable(date, table);
	})
	container.querySelector('#btn-next')
		.addEventListener('click', function() {
		date.setMonth(date.getMonth());
		fillTable(date, table);
	});

	fillTable(date, table);
	table.addEventListener('click', function(ev) {
		if(ev.target.className === 'curr-month')
			setDate(ev.target.id);
	});
}

function fillTable(date, table) {
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

function setDate(date) {
	selectedDate = new Date(date + '');
	document.querySelector('#selected-date').innerHTML =
		selectedDate.getDate() + ' ' +
		MONTHS[selectedDate.getMonth()] + ' ' +
		selectedDate.getFullYear();
}
