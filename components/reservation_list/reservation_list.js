const tableHeaders = ['nombre', 'apellidos', 'teléfono', 'fecha', 'comensales', 'comentarios'];

$('document').ready(() => getReservations());

const getReservations = () => {
	get24Polling();
	$.ajax(
		API_URLS.reservationsUrl,
		{
		    success: (res) => {
				$('#reservationsTableContainer > div').html(fillTable(res.data));
			}
		}
	);
}

const fillTable = (data) => {
	let table_body = '<table class="table">';
	data.forEach((reservation, index) => {
		if (index === 0) {
			table_body+='<thead>';
			table_body+='<tr scope="col">';
			tableHeaders.forEach(name => {
				table_body += '<th>';
				table_body += name;
				table_body += '</th>';	
			});
			table_body+='</tr>';
			table_body+='</thead>';
			table_body+='<tbody>';
		}
		table_body+='<tr id="row_' + reservation.id + '">';
		table_body += addTableCell(reservation.name);
		table_body += addTableCell(reservation.surnames);
		table_body += addTableCell(reservation.phone);
		table_body += addTableCell(dayjs(reservation.date_reservation).format('DD/MM/YYYY HH:MM'));
		table_body += addTableCell(reservation.guests);
		table_body += addTableCell(reservation.comments ? reservation.comments : '---');
		table_body += addTableCell(addButtonsCell(reservation.id));
		table_body+='</tr>';
	});
	table_body+='</tbody>';
	table_body+='</table>';

	return table_body;
}

const addTableCell = (text) => {
	return '<td>' + text + '</td>';
}

const addButtonsCell = (id) => {
	let buttons = '<div class="buttons-actions-container"><button class="btn btn-primary" onclick="navigateToDetail(' + id + ')">Detalle</button>';
	buttons += '<button class="btn btn-warning" onclick="clickConnected()">Modificar</button>';
	buttons += '<button class="btn btn-danger" onclick="deleteReservation(' + id + ')">Eliminar</button></div>';
	return buttons
}

const get24Polling = () => {
	resetvationsNext24HoursRequest();
	setTimeout(() => resetvationsNext24HoursRequest(), 60000);
}

const resetvationsNext24HoursRequest = () => {
	return $.ajax(
		API_URLS.reservationsUrl24,
		{
		    success: (res) => {
				if (res.data && res.data.length) {
					$('.hidden').show();
				} else {
					console.log(res['message']);
				}
			}
		}
	);
}

const deleteReservation = (id) => {
	$.post(
		API_URLS.deleteReservationUrl,
		{ "id": id },
		function(returnedData) {
			if (returnedData['message'] === 'reservation deleted') {
				$('#row_' + id).remove();
			};
		}
	);
}

const clickConnected = () => {
	console.log('click connected');
}
