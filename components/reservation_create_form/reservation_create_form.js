const id = location.search.split('=').length ? location.search.split('=')[1] : undefined;
const getReservationData = (id) => {
	$.ajax(
		API_URLS.reservationsUrlSingle + id,
		{
		    success: function (res, status) {
		    	const date = dayjs(res.date_reservation);
				$('#name').val(res.name);
				$('#surnames').val(res.surnames)
				$('#phone').val(res.phone);
				$('#date').val(date.format('YYYY-MM-DD'));
				$('#hours').val(parseInt(date.format('HH')));
				$('#minutes').val(parseInt(date.format('mm')));
				$('#guests').val(res.guests);
			}
		}
	);
}

$('h1').html((id ? 'Modificar' : 'Solicitar') + ' reserva');
$('#saveForm').val(id ? 'Modificar' : 'Crear');

// allow only numeric
$('#phone').on('input', (event) => { 
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});

if (id) {
	getReservationData(id);
}

// on submit actions
$( '#create' ).submit((event) => {
	event.preventDefault();
	// hide error if shown
	$('.error').hide();
	removeOutline();
	// get the date
	let date = dayjs($('#date').val());
	// set the time
	date = date.hour($('#hours').val());
	date = date.minute($('#minutes').val());

	if ($('#guests').val() > 10) {
		$('#guests').css('outline', '1px solid red');
		$('.error').show();
  		$('#errMessage').text('Tienes más de 10 comensales');
  	} else if (date.isBefore(dayjs())) {
		$('.error').show();
		$('#date').css('outline', '1px solid red');
		$('#hours').css('outline', '1px solid red');
		$('#minutes').css('outline', '1px solid red');
  		$('#errMessage').text('La fecha es anterior a la fecha actual');	
	} else if (date.isBefore(dayjs().add(24, 'hour'))) {
		$('#date').css('outline', '1px solid red');
		$('#hours').css('outline', '1px solid red');
		$('#minutes').css('outline', '1px solid red');
		$('.error').show();
  		$('#errMessage').text('La reserva no se puede hacer con menos de un dia de antelación');
	} else {
		const data = {
			'name': $('#name').val(),
			'surnames': $('#surnames').val(),
			'phone': $('#phone').val(),
			'date': date.format('YYYY-MM-DD HH:mm:ss'),
			'guests': $('#guests').val()
		};
		$.post(
			id ? (API_URLS.updateReservation + id) : API_URLS.addNewReservation,
			data, 
			(returnedData) => {
				if (returnedData && returnedData[0] === 'OK') {
					goBack();
				} else {
					cleanForm();
					$('#errMessage').text('La reserva ha fallado, contacte con el estudiante');
				}
			}
		);
	}
});

const cleanForm = () => {
	$('#name').val(undefined);
	$('#surnames').val(undefined)
	$('#phone').val(undefined)
	$('#date').val(undefined)
	$('#hours').val(undefined)
	$('#minutes').val(undefined)
	$('#guests').val(undefined)
}

const removeOutline = () => {
	$('#date').css('outline', 'none');
	$('#hours').css('outline', 'none');
	$('#minutes').css('outline', 'none');
}
