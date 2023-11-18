const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());  //el cors se usa para la seguridad
app.use(express.json()); // analisa la solitudes entrantes del json 

// CONEXION CON BASE DE DATOS ----------
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "eventos2023js"
});

// PUERTO ------------------------------
app.set('port', process.env.PORT || 3001)

// Corriendo servidor *******************
app.listen(app.get('port'),()=>{
    console.log("Corriendo en el puerto", app.get('port'));
})

// RUTAS  ------------------------------
// obtener los eventos
app.get("/eventos", (req,res)=>{
    db.query('SELECT * FROM eventosmusicales',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }  
    );
});