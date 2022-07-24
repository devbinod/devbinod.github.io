// 1. What is the difference between the following 2 statements?
setTimeout(booyah, 2000);
setTimeout(booyah(), 2000);





function booyah() {
    console.log(`calling method`)
    return 5;
}



var myfunc = function(a, x) {
    return a * x;
   };
 

   setTimeout(booyah1, 2000);
setTimeout(booyah2(), 2000);



function booyah1() {
    alert('“BOOYAH')
}


function booyah2() {

    return function () {
        alert("“BOOYAH")
    }
}