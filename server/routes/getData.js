const express = require('express')
const router = express.Router()

// star wars API
const swapi = require('swapi-node')

router.route('/get/eachdata').get((req, res) => {
    console.log('요청 확인 : ', req.query)

    let { category, name } = req.query

    swapi.get(`https://swapi.co/api/${category}/?format=json`)
    .then((result) => {
        //console.log('요청 결과 확인 : ', result.results);
        let dataToSend = result.results.filter(element => {
            return element.name || element.title === name
        })
        console.log('걸러진 데이터 : ', dataToSend)
        res.status(200).send(dataToSend)
    })
    .catch(err => {
        console.log(err)
        res.status(404).send(err)
    })    
})

module.exports = router
