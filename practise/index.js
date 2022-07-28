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


function a() {
    return {
    a: 1
    }
    }
    function b()
    { //OTBS – ok, but not good practice according to some (Crockford, …)
    return //semicolon gets inserted here
    {
    a: 1 ;
    }
    }
    console.log(a()); //object
    console.log(b()); //undefined