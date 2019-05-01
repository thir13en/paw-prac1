const goBack = () => {
	location.href = location.origin;
}

const navigateToForm = () => {
	location.href = location.origin + '/views/form.php';
}

const navigateToModify = (id) => {
	location.href = location.origin + '/views/form.php?id=' + id;
}

const navigateTo24hList = () => {
	location.href = location.origin + '/views/next24.php';
}

const navigateToDetail = (id) => {
	location.href = location.origin + '/views/detail.php?id=' + id;
}