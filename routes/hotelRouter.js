const express = require('express');
const bodyParser = require('body-parser');
const Hotel = require('../models/hotel');

const HotelRouter = express.Router();
HotelRouter.use(bodyParser.json());

HotelRouter.route('/')

//retrieve the details of the hotel
.get((req,res,next) => {
    Hotel.find({})
    .then((hotel) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hotel);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//creating a hotel
.post((req, res, next) => {
    Hotel.create(req.body)
    .then((hotel) => {
        console.log('Hotel Created ', hotel);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hotel);
    }, (err) => next(err))
    .catch((err) => next(err));
})


//deleting the hotel
.delete((req, res, next) => {
    Hotel.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});




HotelRouter.route('/:hotelId')
//retrieving the detials of the hotel with hotelId
.get((req,res,next) => {
    Hotel.findById(req.params.hotelId)
    .then((hotel) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hotel);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//updating details of the hotel using hotelId
.put((req, res, next) => {
    Hotel.findByIdAndUpdate(req.params.hotelId, {
        $set: req.body
    }, { new: true })
    .then((hotel) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hotel);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//deleting the hotel using hotelid
.delete((req, res, next) => {
    Hotel.findByIdAndRemove(req.params.hotelId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = HotelRouter;


