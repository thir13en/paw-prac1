const tableHeaders = ['nombre', 'apellidos', 'teléfono', 'fecha', 'comensales', 'comentarios'];


$('document').ready(() => getReservations24());

function getReservations24() {
	$.ajax(
		API_URLS.reservationsUrl24,
		{
		    success: (res) => {
				$('#reservationsTableContainer > div').html(fillTable(res.data));
			}
		}
	);
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