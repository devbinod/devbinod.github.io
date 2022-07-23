function calcTip() {
	var totalElem = document.getElementById('total');
	var subtotal = document.getElementById('subtotal').value;
    if(isNaN(subtotal)) {
            alert('Please enter number')
            return
    }
    var tip = document.getElementById('tip').value;
    if(isNaN(tip)) {
        alert('Please enter number')
        return
}
	var total = eval(subtotal) + eval(subtotal*tip/100);
	totalElem.innerHTML = '$' + total;
}