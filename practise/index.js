// let callbacks = []
// for (let i = 0; i < 5; i++) {
// callbacks[i] = function() {
// return i * 2
// }
// }

// console.log("=====ddd")
// alert(callbacks[3]());

// let enrollment = 99;
// let medianGrade = 2.8;
// let credits = 5 + 4 + (2 * 3);

// console.log(`========================`+enrollment)
// console.log(`========================`+medianGrade)
// console.log(`========================`+credits)

// console.log(42 === 42.0)
// console.log(typeof 42.00)
// console.log(typeof "5.0")
// console.log("5.0" === 5)

// const s = "Connie Client";

// console.log("----",s.indexOf(" "))
// let fName = s.substring(0, s.indexOf(" ")); //
// console.log("===ddd",fName)
// console.log(fName.toLocaleUpperCase())


// let text = "HELLO WORLD";
// let code = text.charCodeAt(0);
// console.log(`====`+code)

// let char = String.fromCharCode(72);
// console.log('=====',"2" * 3 )
// const x=5;
// console.log(typeof (!x));
// console.log(x);
// console.log(!!x);

// const s1 = "hello";
// let s2 = "";
// for (let i = 0; i < s1.length; i++) {
//     console.log(s1[i])

//     console.log(s1.charAt(i))
//     // s2 += s1[i] + s1[i];
// } 


// let a = ["Stef", "Jason"];
// console.log(a)
// a.push("Brian"); 
// console.log(a)
// a.unshift("Kelly"); 
// console.log(a)
// a.pop();
// console.log(a)
// a.shift();
// console.log(a)
// a.sort();
// console.log(a)

// const square = function(number) { return number *
//     number };
//     let x = square(4) 

//     console.log(x)


// function a() {
//     return {
//     a: 1
//     }
//     }
//     function b()
//     { //OTBS – ok, but not good practice according to some (Crockford, …)
//     return //semicolon gets inserted here
//     {
//     a: 1 ;
//     }
//     }
//     console.log(a()); //object
//     console.log(b()); //undefined


// function findMax() {
//     console.log(arguments)
//     let i;
//     var max = -Infinity;
//     for (i = 0; i < arguments.length; i++){
//     if (arguments[i] > max) {
//     max = arguments[i];
//     }
//     }
//     return max;
//     } 

// let x = findMax(1, 123, 500, 115, 44, 88); // 500
// var y = findMax(5, 32, 24)


// console.log(x)
// console.log(y)



// function log(x=10, y=5){
//     console.log( x + ", " + y);
//     console.log(arguments)
//     }
//     log(); // 10, 5
//     log(5); // 5, 5
//     log(5, 10); // 5, 10



// function sum(x,y, ...more){
//     console.log(more)
//     console.log(x)
//     console.log(y)
//     console.log(arguments)
//     var total = x + y;
//     if(more.length > 0){
//     for (let i=0; i<more.length; i++) {
//     total += more[i];
//     }
//     }
//     console.log(total);
//     }

//     sum(4,4); // 8
// sum(4,4,4); // 12

// https://www.w3schools.com/jquery/jquery_dom_get.asp
// https://www.w3schools.com/css/css_border.asp