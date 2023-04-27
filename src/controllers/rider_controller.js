const config = require('../configs/database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua rider
    getAllRider(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM motogp_rider;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    status: 200,
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data rider berdasarkan ID
    getRiderByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM motogp_rider WHERE id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                if(!results.length) {
                    res.send({ 
                        success: false,
                        status: 400, 
                        message: 'Data tidak ditemukan!',
                        data: results
                    });
                } else {
                    res.send({ 
                        success: true,
                        status: 200, 
                        message: 'Berhasil ambil data!',
                        data: results
                    });
                }
            });
            connection.release();
        })
    },
    // Ambil data rider berdasarkan negara
    getRiderByCountry(req,res){
        let negara = req.params.negara;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM motogp_rider WHERE negara = ?;
                `
            , [negara],
            function (error, results) {
                if(error) throw error;  
                if(!results.length) {
                    res.send({ 
                        success: false,
                        status: 400, 
                        message: 'Data tidak ditemukan!',
                        data: results
                    });
                } else {
                    res.send({ 
                        success: true,
                        status: 200, 
                        message: 'Berhasil ambil data!',
                        data: results
                    });
                }
            });
            connection.release();
        })
    },
    // Ambil data rider berdasarkan tim
    getRiderByTeam(req,res){
        let tim = req.params.tim;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM motogp_rider WHERE tim = ?;
                `
            , [tim],
            function (error, results) {
                if(error) throw error;  
                if(!results.length) {
                    res.send({ 
                        success: false,
                        status: 400, 
                        message: 'Data tidak ditemukan!',
                        data: results
                    });
                } else {
                    res.send({ 
                        success: true,
                        status: 200, 
                        message: 'Berhasil ambil data!',
                        data: results
                    });
                }
            });
            connection.release();
        })
    },
    // Simpan data rider
    addRider(req,res){
        let data = {
            nama : req.body.nama,
            tgl_lahir : req.body.tgl_lahir,
            tim : req.body.tim,
            negara : req.body.negara,
            created_at: new Date(),
            updated_at: new Date()
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO motogp_rider SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    status: 200,
                    message: 'Berhasil tambah data!',
                });
            });
            connection.release();
        })
    },
    // Update data rider
    editRider(req,res){
        let dataEdit = {
            nama : req.body.nama,
            tgl_lahir : req.body.tgl_lahir,
            tim : req.body.tim,
            negara : req.body.negara,
            updated_at: new Date()
        }
        let id = req.params.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE motogp_rider SET ? WHERE id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    status: 200,
                    message: 'Berhasil edit data!'
                });
            });
            connection.release();
        })
    },
    // Delete data rider
    deleteRider(req,res){
        let id = req.params.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM motogp_rider WHERE id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                if(!results.affectedRows) {
                    res.send({ 
                        success: false, 
                        status: 400,
                        message: `Data dengan id (${id}) tidak ditemukan!`,
                    });
                } else {
                    res.send({ 
                        success: true, 
                        status: 200,
                        message: `Berhasil hapus data dengan id (${id})!`,
                    });
                }
            });
            connection.release();
        })
    }
}