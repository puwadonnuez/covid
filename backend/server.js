const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sgnController = require('./controller/sgn')
    app.use(cors());
    app.use(bodyParser.json());
    app.post('/get_infected', sgnController.getDetailInfectedPerson);
    app.listen('4000',() => {
    console.log('start port 4000');
    })

