const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.route('/get/eachdata').get((req, res) => {
    console.log('요청 확인 : ', req.query)

    let { category, index } = req.query

    fetch(`https://swapi.co/api/${category}/${index}/?format=json`)
    .then(response => response.json())
    .then(json => {
        console.log('응답 확인 : ', json, '\n')
        res.status(200).send(json)
    })
    .catch(err => {
        console.log(err)
        res.status(404).send(err)
    })
})

module.exports = router
