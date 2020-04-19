const express = require('express');
const bodyParser = require('body-parser');
const Guests = require('../models/guests');
const Rooms = require('../models/rooms');


const GuestRouter = express.Router();
GuestRouter.use(bodyParser.json());

GuestRouter.route('/')

//retrieve the list of all the Guests
.get((req,res,next) => {
    Guests.find({})
    .populate('room')
    .then((Guests) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Guests);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//creating or adding a Guest
.post((req, res, next) => {

    Rooms.findById(req.body.room)       
    .then((room)=>{
        if(room.available){         //checking if room is aavilable or not
            Guests.create(req.body)
            .then((Guest) => {

                //room given to the created guest so its available feild is set to false
                Rooms.findByIdAndUpdate(req.body.room, {
                    $set: {"available":false}
                }, { new: true })
                .then((Room) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(Room);
                }, (err) => next(err))
                .catch((err) => next(err));


                console.log('Guest added ', Guest);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Guest);
            }, (err) => next(err))
            .catch((err) => next(err));
    
           
        }
        else
        {
            const error = new Error('Room is Occupied');
            error.status = 403;
            return next(error);
        }

    }, (err) => next(err))
    .catch((err) => next(err));
})

//updation not allowed 
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Guests');
})

//delete all Guests
.delete((req, res, next) => {
    Guests.remove({})
    .then((resp) => {

        //when all guests are removed all the rooms are set to available
        Rooms.updateMany(
            { "available": false },
            { $set: { "available": true } }
          )
          .then((Room) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Room);
        }, (err) => next(err))
        .catch((err) => next(err));
    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 


});




GuestRouter.route('/:GuestId')
//retrieving the detials of a specific Guest with id= GuestId
.get((req,res,next) => {
    Guests.findById(req.params.GuestId)
    .populate('room')
    .then((Guest) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Guest);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//creation not allowed
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Guest/'+ req.params.GuestId);
})

//updating details of a specific Guest
.put((req, res, next) => {
    Guests.findByIdAndUpdate(req.params.GuestId, {
        $set: req.body
    }, { new: true })
    .then((Guest) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Guest);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//deleting a specific Guest
.delete((req, res, next) => {

    Guests.findByIdAndRemove(req.params.GuestId)
    .then((resp) => {

        //the room occupied by specific guest is made available by setting available to true
        Rooms.findByIdAndUpdate(req.body.room, {
            $set: {"available":true}
        }, { new: true })
        .then((Room) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Room);
        }, (err) => next(err))
        .catch((err) => next(err));


        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);

        
        
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = GuestRouter;