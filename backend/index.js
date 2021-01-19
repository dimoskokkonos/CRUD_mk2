  
const express = require('express'); 
const db = require('./queries');
var cors = require("cors");


const app = express(); 
const Pool = require('pg').Pool; 

const pool = new Pool({ 
    user: 'postgres', 
    host: 'localhost', 
    database: 'backend', 
    password: 'waitforit20', 
    dialect: 'postgres', 
    port: 5432, 
    max: 10,
    idleTimeoutMillis: 30000,
}); 
  
  
const bodyParser = require('body-parser'); 
app.use(cors());

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false })); 
  
  
pool.connect((err, client, release) => { 
    if (err) { 
        return console.error( 
            'Error acquiring client', err.stack) 
    } 
    client.query('SELECT NOW()', (err, result) => { 
        release() 
        if (err) { 
            return console.error( 
                'Error executing query', err.stack) 
        } 
        console.log("Connected to Database !") 
    }) 
}) 
  

app.get('/All', db.getAll, async (req, res) =>{})

app.get('/All', db.getAll, async (req, res) =>{})
app.get('/All/:id', db.getEntryById, async (req, res) =>{})
app.post('/All', db.createEntry, async (req, res) =>{})
app.put('/All/:id', db.updateEntry, async (req, res) =>{})
app.delete('/All/:id', db.deleteEntry, async (req, res) =>{})


app.listen(4000, () => {    
}) 

