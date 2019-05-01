// allow only numeric
$('#phone').on('input', (event) => { 
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});

// on submit actions
$( "#create" ).submit((event) => {
	event.preventDefault();
	// hide error if shown
	$('.error').hide();
	// get the date
	let date = dayjs($('#date').val());
	// set the time
	date = date.hour($('#hours').val());
	date = date.minute($('#minutes').val());

	if ($('#guests').val() > 10) {
		$('.error').show();
  		$('#errMessage').text('Tienes más de 10 comensales');
  	} else if (date.isBefore(dayjs())) {
		$('.error').show();
  		$('#errMessage').text('La fecha es anterior a la fecha actual');	
	} else if (date.isBefore(dayjs().add(24, 'hour'))) {
		$('.error').show();
  		$('#errMessage').text('La reserva no se puede hacer con menos de un dia de antelación');
	} else {
		$.post(
			API_URLS.addNewReservation,
			{
				"name": $('#name').val(),
				"surnames": $('#surnames').val(),
				"phone": $('#surnames').val(),
				"date": date.format('YYYY-MM-DD hh:mm:ss'),
				"guests": $('#surnames').val()
			}, 
			(returnedData) => {
				console.log(returnedData);
			}
		);
	}
});