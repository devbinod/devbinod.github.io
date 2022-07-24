
window.onload = function() {
    document.getElementById("mytextArea").style.fontSize = "12pt";
}

function showAlertMessage() {
    alert('button clicking')
    changeFont()


}


function increaseFontSize() {
    var increaseFontSize = parseInt((document.getElementById("mytextArea").style.fontSize).replace('pt',''))+2

    document.getElementById("mytextArea").style.fontSize = `${increaseFontSize}pt`
}

function changeBehaviour() {
   
var checkBox = document.getElementById('blings')
if(checkBox.checked) {
    document.getElementById('mytextArea').style.fontWeight="bold";
    document.getElementById('mytextArea').style.color="green";
    document.getElementById('mytextArea').style.textDecoration="underline";
    document.querySelector('body').style.backgroundImage= "url('https://courses.cs.washington.edu/courses/cse190mCurrentQtr/labs/6/hundred-dollar-bill.jpg')"

    alert("function executed")
}else{
    document.getElementById('mytextArea').style.fontWeight="normal";

}

}


function changeFont() {
    setInterval(() => {
        increaseFontSize()
        
 
    },500)

}


function changeToPigLatin() {

    let textData = document.getElementById('mytextArea').value
    let wordData = textData.replace(/(\r\n|\n|\r)/gm, "").split(" ")
    wordData = wordData.filter(it => {
        it = it.replace(" ","")
        return it
    })

   wordData =  wordData.map(it => {
        var firstChar = it.charAt(0)
       if(firstChar.toLocaleLowerCase()=='a' ||
       firstChar.toLocaleLowerCase()=='e' ||
       firstChar.toLocaleLowerCase()=='i' ||
       firstChar.toLocaleLowerCase()=='0' ||
       firstChar.toLocaleLowerCase()=='u'
       
       
       ){

       return it.substring(1,it.length).concat(firstChar).concat("ay")
       
       }
       else{
       return it.concat("ay")
       }
    })
    document.getElementById("updatedData").innerHTML = wordData.join(" ")
}



function checkMalkovitch() {
    let textData = document.getElementById('mytextArea').value
    let wordData = textData.replace(/(\r\n|\n|\r)/gm, "").split(" ")
    wordData = wordData.filter(it => {
        it = it.replace(" ","")
        return it
    })

   wordData =  wordData.map(it => it?.length >=5 ? "Malkovich": it )
    document.getElementById("malkovitchData").innerHTML = wordData.join(" ")
}