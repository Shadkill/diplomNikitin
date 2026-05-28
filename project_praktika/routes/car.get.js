const express = require('express');
const Car = require('../models/catalog_car.models');
const router = express.Router();

router.get('/:_id', async(req, res) => {
   
    try {
         const {_id} = req.params;
        const car = await Car.findById(_id);
        if(!car){
            return res.status(404).json({message: 'Страница не найдена'})
        }
        res.json(car);
    } catch (error) {
        console.error(error);
    }
});
module.exports = router;
