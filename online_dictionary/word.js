const express = require('express')
const { dbconnection } = require('./config')
const router = express.Router()



router.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/dict.html")

})


router.post("/search", (req, resp) => {

    dbconnection.query(`select * from entries where word="${req.body.query}"`, function (error, results, fields) {
        if (error) {
            console.log(error)
        }
        resp.json({ data: results })

    });



})
module.exports.router = router