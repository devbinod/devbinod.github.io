$(document).ready(function () {

    $('#btn-lookup').click(function () {


        $.ajax({
            url: `/search`,
            data: {
                query: $('#search-word').val()
            },
            method: "post",
            success: function (res) {

                const data = res.data

                let resData

                if (data.length > 0) {
                    resData = data.map((it, index) => {

                        return `${index + 1} (${it.wordtype}) :: ${it.definition}<br>`


                    })
                } else {
                    resData = "Data not found"
                }
                $('#data-result').html(resData)
            },
            error: function (err) {
                alert("Oops something went wrong")
            }


        })

    })


})