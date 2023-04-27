const router = require('express').Router();
const { rider } = require('../controllers');

// GET localhost:3000/motogp/rider => Ambil data semua rider
router.get('/motogp/rider', rider.getAllRider);

// GET localhost:3000/motogp/rider/2 => Ambil data semua rider berdasarkan id = 2
router.get('/motogp/rider/:id', rider.getRiderByID);

// GET localhost:3000/motogp/rider/italia => Ambil data semua rider berdasarkan negara = italia
router.get('/motogp/rider/negara/:negara', rider.getRiderByCountry);

// GET localhost:3000/motogp/rider/ducati => Ambil data semua rider berdasarkan tim = ducati
router.get('/motogp/rider/tim/:tim', rider.getRiderByTeam);

// POST localhost:3000/motogp/rider/add => Tambah data rider ke database
router.post('/motogp/rider/add', rider.addRider);

// POST localhost:3000/motogp/rider/edit => Edit data rider
router.put('/motogp/rider/edit/:id', rider.editRider);

// POST localhost:3000/motogp/rider/delete => Delete data rider
router.delete('/motogp/rider/delete/:id', rider.deleteRider);

module.exports = router;