const config = require('../configs/database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);
const {hashing, compare} = require('../utils/hashing') 

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    // Ambil data semua rider
    getAllUser(req, res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_user;
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
    // Ambil data user berdasarkan ID
    getUserByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_user WHERE id = ?;
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
    // Sign up User
    async register(req,res) {
        let data = {
            username : req.body.username,
            email : req.body.email,
            password : await hashing(req.body.password)
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO table_user SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    status: 200,
                    message: 'Berhasil sign up!',
                });
            });
            connection.release();
        })
    },
    // Login User
    login(req, res) {
        const userPass = req.body.password
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM table_user WHERE email = ?;
                `
            , [req.body.email],
            async function (error, results) {
                if(error) throw error;  
                if(!results.length) {
                    res.send({ 
                        success: false, 
                        status: 401,
                        message: 'Data user tidak ditemukan!',
                    });
                } else {
                    const {password} = results[0]
                    const match = await compare(userPass, password)
                    if(match) {
                        res.send({ 
                            success: true, 
                            status: 200,
                            message: 'Berhasil login!',
                            data: results
                        });
                    } else {
                        res.send({ 
                            success: false, 
                            status: 401,
                            message: 'Email atau password salah!',
                        });
                    }

                }
            });
            connection.release();
        })
    }
}