const express = require('express') 
const app = express()
const port = 3000 
const mysql = require('mysql')

// 解决跨域
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'x-requested-with, content-type'); 
    next();
})
//链接数据库
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'logitech'
})

connection.connect()

//路由
app.get('/shopping-g/nothing', (req, res) => {
    connection.query('select * from logitech_shop limit 0,8', function (err, result) {
        const obj={
            status: 200,
            data: result
        }
        res.json(obj) 
    })
}) 
app.get('/shopping-g/something', (req, res) => {
    connection.query('select * from logitech_shop where shopping>0', function (err, result) {
        const obj={
            status: 200,
            data: result
        }
        res.json(obj) 
    })
}) 
app.get('/detail-g', (req, res) => {
    console.log(req.query.id)  
    connection.query("select * from logitech_shop where id='"+req.query.id+"'", function (err, result) {
        const obj={
            status: 200,
            data: result
        }
        res.json(obj)//
    })
})
app.get('/detail-g/add', (req, res) => {
    connection.query("update logitech_shop set shopping='"+req.query.num+"' where id='"+req.query.id+"'", function (err, result) {
        const obj={
            status: 200,
            data: result
        }
        res.json(obj)//
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))