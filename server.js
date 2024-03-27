const express = require("express");
const sql = require ("mssql");
const bodyParser = require("body-parser");
const app = express();
const router =  express.Router();


const dbConfig ={
    user: 'sa',
    password: 'Happy1996',
    server: 'LAPTOP-KLF3DVEL',
    database: 'ItemDB',
    synchronize: true,
    trustServerCertificate: true,
    
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

router.get("/", (req,res)=>{
    res.json({message:"Welcome to Node Server API"})
})

router.get("/item", (req,res)=>{
    sql.connect(dbConfig, (err)=>{
        if(err){
            throw err;
        }

        //create request object

        const request = new sql.Request();
        const selectQuery = "Select top 10 * from Item"
        request.query(selectQuery, (err,data)=>{
            if(err){
                throw err;
            }
            res.json(data.recordset)
        })
    })
})

router.post("/item", (req,res)=>{
 var body = req.body;
    sql.connect(dbConfig, (err)=>{
        if(err){
            throw err;

        }
   //create request object
         const request = new sql.Request();

         const insertQuery = `INSERT INTO Item VALUES ('${body.name}')`

         request.query(insertQuery, (err,data)=>{
            if(err){
                throw err;
            }
            res.json(data)
         })

    })
})

router.put("/item/:id", (req, res) => {
    var body = req.body;
    var itemId = req.params.id

    sql.connect(dbConfig, (err)=>{
        if(err){
            throw err;
        }
         //create request object
         const request = new sql.Request();

         const updateQuery = `UPDATE Item
         SET name = '${body.name}'
         Where id = ${itemId}`

         request.query(updateQuery, (err,data)=>{
            if(err){
                throw err;
            }
            res.json(data)
         })

    })
})

router.delete("/item/:id", (req, res)=>{
    var itemId = req.params.id;

    sql.connect(dbConfig, (err)=>{
        if(err){
            throw err;
        }
  //create request object
  const request = new sql.Request();

        const deleteQuery = `Delete from Item Where id=${itemId}`

        request.query(deleteQuery, (err, data) => {
            if(err){
                throw err;
            }

            res.json(data)
        })

    })
})
const PORT = 9700;

app.use("/api", router)

app.listen(PORT, () =>{
    console.log(`Server listening at PORT ${PORT}`)
})