$(document).ready(function () {

    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;
    $('#date').val(maxDate)

    $('#date').attr('max', maxDate)
    displayImages()
    $('#viewImages').click(function () {
        displayImages()
    })


})


function displayImages() {
    let date = $("#date").val();

    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=0AJH3YGVbm8W6Ay9sNegG4sedHNzr6zBkoOh53WA`)
        .then(data => data.json())
        .then(data => {
            $("#displayImage").attr("src", data.url);
            $("#photoTitle").text(data.title);
            $("#explanation").html(data.explanation)
        }).catch(err => alert(err))




}