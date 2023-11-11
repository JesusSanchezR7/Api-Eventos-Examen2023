const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "eventos2023js"
});

// PUERTO ------------------------------
app.set('port', process.env.PORT || 3001)

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

app.post("/create", (req,res)=>{
    const Nombre_Evento = req.body.Nombre_Evento;
    const Fecha_Evento = req.body.Fecha_Evento;
    const Hora_Evento = req.body.Hora_Evento;
    const Ciudad = req.body.Ciudad;
    const Lugar_Evento_Direccion = req.body.Lugar_Evento_Direccion;
    const Precio_Entradas = req.body.Precio_Entradas;
    const Num_Boletos_Disponibles = req.body.Num_Boletos_Disponibles;


    db.query('INSERT INTO eventosmusicales (Nombre_Evento,Fecha_Evento,Hora_Evento,Ciudad,Lugar_Evento_Direccion,Precio_Entradas,Num_Boletos_Disponibles) VALUES(?,?,?,?,?,?,?)', [Nombre_Evento,Fecha_Evento,Hora_Evento,Ciudad,Lugar_Evento_Direccion,Precio_Entradas,Num_Boletos_Disponibles],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }  
    );
});


app.put("/update", (req,res)=>{
    const ID_Evento = req.body.ID_Evento;
    const Nombre_Evento = req.body.Nombre_Evento;
    const Fecha_Evento = req.body.Fecha_Evento;
    const Hora_Evento = req.body.Hora_Evento;
    const Ciudad = req.body.Ciudad;
    const Lugar_Evento_Direccion = req.body.Lugar_Evento_Direccion;
    const Precio_Entradas = req.body.Precio_Entradas;
    const Num_Boletos_Disponibles = req.body.Num_Boletos_Disponibles;

    db.query('UPDATE eventosmusicales SET  Nombre_Evento = ?, Fecha_Evento = ?, Hora_Evento = ?, Ciudad = ?, Lugar_Evento_Direccion = ?, Precio_Entradas = ?, Num_Boletos_Disponibles = ? WHERE ID_Evento = ?', [Nombre_Evento,Fecha_Evento,Hora_Evento,Ciudad,Lugar_Evento_Direccion,Precio_Entradas,Num_Boletos_Disponibles,ID_Evento],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }  
    );
});

app.delete("/delete/:id", (req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM eventosmusicales WHERE ID_Evento = ?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }  
    );
});


// Corriendo servidor *******************
app.listen(app.get('port'),()=>{
    console.log("Corriendo en el puerto", app.get('port'));
})