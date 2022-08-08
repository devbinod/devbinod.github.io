const express = require('express');
const { syncDataConfig, Dictionary } = require('../config/config');

const router = express.Router();



router.get("/", (req, resp) => {
    syncDataConfig.sync().then(data => {
        Dictionary.create({
            word: "Binod"
        })

        console.log('res', data)
    }).catch(err => console.log(err))
    resp.render('index')

})

router.post("/search", (req, resp) => {
    console.log("called..")
    resp.send("sdfsdsdfsdfsd")
})


router.get("/addWord", (req, resp) => {
    sequelize.AsyncQueueError()
    resp.render('addword')
})

module.exports = router;
