const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

let app = express();
app.use(express.json());
app.use(cors());

async function main() {

    const connection = await mysql2.createConnection({
        'host': process.env.DB_HOST, // host -> ip address of the database server
        'user': process.env.DB_USER,
        'database': process.env.DB_DATABASE,
        'password': process.env.DB_PASSWORD
        })

    app.get('/', function(req,res){
        res.send("Hello world");
    })

    app.get('/artists', async function(req,res){
        const [artists] = await connection.execute("SELECT * from Artist");
        res.json(artists);
        })

        app.get('/genre', async function(req,res){
            const [genre] = await connection.execute("SELECT * from Genre");
            res.json(genre);
            })

            app.get('/track', async function(req,res){
                const [track] = await connection.execute("SELECT * from Track");
                res.json(track);
                })

                app.get('/employees', async function(req,res){
                    // always true query
                    let query = "SELECT * FROM Employee WHERE 1";
                    // for testing
                    console.log("query=", query)
                    const [employees] = await connection.execute(query);
                    res.json(employees);
                    })

                    app.get('/employees', async function(req,res){
                        // always true query
                        let query = "SELECT * FROM Employee WHERE 1";
                        if (req.query.title) {
                        query += ` AND Title LIKE '%${req.query.title}%'`;
                        }
                        // for testing
                        console.log("query=", query)
                        const [employees] = await connection.execute(query);
                        res.json(employees);
                        })

                        app.get('/employees', async function(req,res){
                            // always true query
                            let query = "SELECT * FROM Employee WHERE 1";
                            if (req.query.title) {
                            query += ` AND Title LIKE '${req.query.title}'`;
                            }
                            if (req.query.name) {
                            query += ` AND (FirstName LIKE '%${req.query.name}%' OR LastName
                            LIKE '%${req.query.name}%')`;
                            }
                            // for testing
                            console.log("query=", query)
                            const [employees] = await connection.execute(query);
                            res.json(employees);
                            })
}
main()

app.listen(3000, ()=>{
    console.log("server has started")
})