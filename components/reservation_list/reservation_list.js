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
