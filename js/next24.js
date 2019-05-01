console.log($);

const reservationsUrl = '/api/reservations/read.php';
const reservationsUrl24 = '/api/reservations/read24.php';
const reservationsUrlSingle = '/api/reservations/read_single.php?id=';
const deleteReservationUrl = '/api/reservations/delete.php';
const tableHeaders = ['nombre', 'apellidos', 'teléfono', 'fecha', 'comensales', 'comentarios'];


$('document').ready(() => getReservations());

function getReservations() {
	$.ajax(
		reservationsUrl24,
		{
		    success: function (res, status) {
				let table_body = '<table class="table">';
				res.data.forEach((reservation, index) => {
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
				$('#reservationsTableContainer > div').html(table_body);
			}
		}
	);
}

function addTableCell(text) {
	return '<td>' + text + '</td>';
}

function addButtonsCell(id) {
	let buttons = '<div class="buttons-actions-container"><button class="btn btn-primary" onclick="navigateToDetail(' + id + ')">Detalle</button>';
	buttons += '<button class="btn btn-warning" onclick="clickConnected()">Modificar</button>';
	buttons += '<button class="btn btn-danger" onclick="deleteReservation(' + id + ')">Eliminar</button></div>';
	return buttons
}

function navigateToDetail(id) {
	location.href = location.origin + '/detail.html?id=' + id;
}

function deleteReservation(id) {
	console.log({ "id": id });
	$.post(
		deleteReservationUrl,
		{ "id": id }, 
		function(returnedData) {
			if (returnedData['message'] === 'reservation deleted') {
				$('#row_' + id).remove();
			};
		}
	);
}