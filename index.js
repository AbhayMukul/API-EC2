var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyparser.json());
app.listen('5000', () => {
    console.log('server running at port 5000');
});

var db = mysql.createConnection({
    host: "database-1.cyc2ywmoxfol.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "admin1234",
    database: "myDB"
});

// check db connection
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("database conected");
    }
})


// REST CURD API

app.get('/api', (req, res) => {
    // console.log(req.query);

    res.send("API working")
})

app.get('/api/get/customerAll', (req, res) => {
    let sql = ` SELECT * FROM customers
                `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})

app.get('/api/get/customer', (req, res) => {
    console.log("api id", req.query.id);
    console.log("api name", req.query.name);


    let sql = ` SELECT * FROM customers
                WHERE id = ${req.query.id}
                AND  name = "${req.query.name}"`;


    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    })
})

app.post('/api/create/NewCustomer', (req, res) => {
    console.log(req.body);

    // sql query

    let sql = ` INSERT INTO customers 
                VALUES(default,'${req.body.email}','${req.body.name}',1);
                `;

    // run query
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send("data inserted");
    })
})


app.put('/api/customer/changeName', (req, res) => {
    console.log("change name of id : ", req.body.id);
    console.log("change name to : ", req.body.name);

    let sql = `  UPDATE customers SET name = '${req.body.name}'
                 WHERE id = '${req.body.id}'`;

    db.query(sql,(err,result) => {
        if(err) {
            throw err;
        }

        res.send(result);
    })
})