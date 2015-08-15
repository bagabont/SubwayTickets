var WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function init() {
	var container = document.querySelector('#calendar');
	var table = container.querySelector('table');
	var date = new Date();

// BEGIN DEBUG
	var custom = document.querySelector('#debug #custom-date');
	custom.value = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '-' + date.getMilliseconds();
	custom.addEventListener('keypress', function(e) {
		if(e.which !== 13) return;
		var nums = this.value.split(/[,.\: -\/\\]/);
		var date = new Date(document.querySelector('#selected-date').innerHTML);
		date.setHours(nums[0]);
		date.setMinutes(nums[1]);
		date.setSeconds(nums[2]);
		date.setMilliseconds(nums[3]);
		document.querySelector('#result-codes').innerHTML = (nums[0]<10?'0':'') + nums[0] + ' : ' + (nums[1]<10?'0':'') + nums[1] + ' - ' + genCode(date);
	});
// END DEBUG

	showBarcodes(date);

	container.querySelector('#btn-prev')
		.addEventListener('click', function() {
		date.setMonth(date.getMonth()-2);
		fill_table(date, table);
	})
	container.querySelector('#btn-next')
		.addEventListener('click', function() {
		date.setMonth(date.getMonth());
		fill_table(date, table);
	});

	fill_table(date, table);
	table.addEventListener('click', function(ev) {
		if(ev.target.className === 'curr-month')
			showBarcodes(ev.target.id);
	});
}

function fill_table(date, table) {
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

function showBarcodes(date) {
	date = new Date(date + '');
	document.querySelector('#selected-date').innerHTML = date.getDate() + ' ' + MONTHS[date.getMonth()] + ' ' + date.getFullYear();
	var results = document.querySelector('#result-codes');
	results.innerHTML = '';

	// be cool, use random
	date.setMilliseconds((Math.random() + '').substr(2, 3));
	for(var h=0; h<24; ++h)
	{
		date.setHours(h);
		date.setMinutes(0);
		results.innerHTML += (h<10?'0':'') + h + ' : 00 - ' + genCode(date) + '<br>';
		date.setMinutes(30);
		results.innerHTML += (h<10?'0':'') + h + ' : 30 - ' + genCode(date) + '<br>';
	}
}

function genCode(date) {
	var origin = new Date(2014, 2, 6); // 6 March 2014 for some reason
	origin.setHours(date.getHours());
	var days = Math.round((date-origin)/86400000) + '';

	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var seconds = (h*60 + m)*60 + s + '';
	while(seconds.length < 5) seconds = '0' + seconds;

	var millis = date.getMilliseconds() + '';
	// may be milliseconds, may be a random id, may be someting else, not sure
	while(millis.length < 3) millis = '0' + millis;

	var code = days + seconds + millis;
	var checksum = 0;
	for(var i in code)
		if((code.length-i)%2)
			checksum += (code[i]|0)*3;
		else checksum += code[i]|0;
	code += checksum*9%10;
	return code;
}
