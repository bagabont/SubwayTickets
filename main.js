var WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var selectedDate;
var canvas, ctx;

var requestAnimationFrame = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) { setTimeout (callback, 1000/30); };

function init() {
	var datepick = document.querySelector('#datepick');
	var table = datepick.querySelector('table');
	var date = new Date();
	setDate(date);

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

	canvas = document.querySelector('#canvas');
	canvas.width = 600;
	canvas.height = canvas.width*Math.sqrt(2);
	ctx = canvas.getContext('2d');
	draw();
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

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
	ctx.fillStyle = '#000000';

	requestAnimationFrame(draw);
}
