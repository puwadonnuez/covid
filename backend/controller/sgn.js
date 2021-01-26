const { response } = require('express');
const getInfectedPerson = require('../service/get_infected_person');
exports.getDetailInfectedPerson = async(req, res) => {
    // console.log(req.body.day)
    const response = await getInfectedPerson.getCases();
    return res.send(response);
}