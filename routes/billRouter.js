const express = require('express');
const bodyParser = require('body-parser');
const Bills = require('../models/Bills');

const BillRouter = express.Router();
BillRouter.use(bodyParser.json());


BillRouter.route('/')
//retrieve the list of all the Bills
.get((req,res,next) => {
    Bills.find({})
    .populate('guest')
    .then((Bills) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Bills);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//creating /adding a Bill
.post((req, res, next) => {
        Bills.create(req.body)
        .then((Bill) => {
            console.log('Bill added ', Bill);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Bill);
        }, (err) => next(err))
        .catch((err) => next(err));
})

//updation not allowed 
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Bills');
})

//delete all Bills
.delete((req, res, next) => {
    Bills.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});




BillRouter.route('/:BillId')
//retrieving the detials of a specific Bill with id= BillId
.get((req,res,next) => {
    Bills.findById(req.params.BillId)
    .populate('guest')
    .then((Bill) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Bill);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//creation not allowed
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Bill/'+ req.params.BillId);
})

//updating details of a specific Bill
.put((req, res, next) => {
    Bills.findByIdAndUpdate(req.params.BillId, {
        $set: req.body
    }, { new: true })
    .then((Bill) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Bill);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//deleting a specific Bill
.delete((req, res, next) => {

    Bills.findByIdAndRemove(req.params.BillId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = BillRouter;