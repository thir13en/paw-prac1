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
	buttons += '<button class="btn btn-warning" onclick="navigateToModify(' + id + ')">Modificar</button>';
	buttons += '<button class="btn btn-danger" onclick="deleteReservation(' + id + ')">Eliminar</button></div>';
	return buttons
}