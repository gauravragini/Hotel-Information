const express = require('express');
const bodyParser = require('body-parser');
const Rooms = require('../models/rooms');

const RoomRouter = express.Router();
RoomRouter.use(bodyParser.json());

RoomRouter.route('/')

//retrieve the list of all the Rooms
.get((req,res,next) => {
    Rooms.find({})
    .then((Rooms) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Rooms);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//creating /adding a Room
.post((req, res, next) => {
    Rooms.create(req.body)
    .then((Room) => {
        console.log('Room added ', Room);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Room);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//updation not allowed 
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Rooms');
})

//delete all Rooms
.delete((req, res, next) => {
    Rooms.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});




RoomRouter.route('/:RoomId')
//retrieving the detials of a specific Room with id= RoomId
.get((req,res,next) => {
    Rooms.findById(req.params.RoomId)
    .then((Room) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Room);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//creation not allowed
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /room/'+ req.params.RoomId);
})

//updating details of a specific Room
.put((req, res, next) => {
    Rooms.findByIdAndUpdate(req.params.RoomId, {
        $set: req.body
    }, { new: true })
    .then((Room) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Room);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//deleting a specific Room
.delete((req, res, next) => {
    Rooms.findByIdAndRemove(req.params.RoomId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = RoomRouter;