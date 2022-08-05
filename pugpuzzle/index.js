const expresss = require('express')
const bodyParser = require("body-parser")
const { getQuestionList ,getCorrectAnswer} = require('./question');
const path = require('path')

const app = expresss();
app.use(expresss.static(path.join(__dirname,"views")));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))

let score = 0;
let count = 0;

app.get("/",(req,resp) => {
    if(count < 5) {
        resp.render('index', 
        { title: getQuestionList()[count], score: score});
    }else
    resp.render('score', {score:score})
  
})



app.post("/add",(req,resp) => {
        const answer = parseInt(req.body.answer)
        const sequenceAnswer = parseInt(getCorrectAnswer()[count])   
        if(answer === sequenceAnswer){
            score++;

        }
        count++;
        resp.redirect('/')

})


app.listen(3000,() => {
    console.log(`your application is running on 3000 port`)
})