$('document').ready(() => getSingleReservation(location.search.split('=')[1]));

const getSingleReservation = (id) => {
	$('h1').text($('h1').text() + id)
	$.ajax(
		API_URLS.reservationsUrlSingle + id,
		{
		    success: function (res, status) {
				$('.field_reservation.name').html(res.name);
				$('.field_reservation.surnames').html(res.surnames)
				$('.field_reservation.phone').html(res.phone);
				$('.field_reservation.date').html(dayjs(res.date_reservation).format('DD/MM/YYYY HH:MM'));
				$('.field_reservation.guests').html(res.guests);
			}
		}
	);
}
