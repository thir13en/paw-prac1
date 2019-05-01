const goBack = () => {
	location.href = location.origin;
}

const navigateToForm = () => {
	location.href = location.origin + '/views/form.php';
}

const navigateToDetail = (id) => {
	location.href = location.origin + '/views/detail.php?id=' + id;
}