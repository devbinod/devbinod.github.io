$(document).ready(function() {

    let isGameStarted = false
    let count = 0;



    $('#start').on('click',() => gameStart())
    $('#end').on('click',() => gameEnd())

    const gameStart = () => {
        $('.boundary').removeClass('youlose');
        count = 0;
        isGameStarted = true;
        $('#status').text(`Game started...`)
		$("div:not(#start, #end)", "div#maze").mouseover(isWin)
		$("#maze").mouseleave(isWin)
    }



    const gameEnd = () => {


        if (isGameStarted && count === 0) {
			$("#status").text("You Win!");
		    isGameStarted = false;
            count=0;
            $("div:not(#start, #end)", "#maze").removeClass("youlose");

		}

    }



    const isWin = () => {

        if(isGameStarted) {
            $("div:not(#start, #end)", "#maze").addClass("youlose");
            $("#status").text("Sorry, You Lose!");
            count++;
        }
    }

    
})