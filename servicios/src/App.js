// Importaciones 
import './App.css'; 
import { useState } from "react" //para manejar el estado de los componentes
import Axios from "axios"; //para hacer solicitudes HTTP
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // el componente de la libreria de los iconos
import { faSearch } from '@fortawesome/free-solid-svg-icons'; //icono

function App() {
  const [busqueda, setBusqueda]= useState(""); // para la busqueda 
  const [eventosList, setEventos] = useState([]); //Contiene la informacion de la api 

  const getEventos = () => {
    Axios.get("http://localhost:3001/eventos").then((response) => {
      const eventosFormateados = response.data.map(evento => {               
        const fechaCompleta = new Date(evento.Fecha_Evento);     //obtine la fechas de nuestra nuestra data
        const fechaFormateada = fechaCompleta.toISOString().split('T')[0]; // extrae la parte de la fecha qutando lo de T0 0000 000.
        return { ...evento, Fecha_Evento: fechaFormateada }; //Devuelve la fecha formateada
      });
      setEventos(eventosFormateados); //Actualiza  lista de eventos formateados
    });
  }
  
  const buscadornav= e =>{
    setBusqueda(e.target.value); 
    filtrar(e.target.value);     //llama a la funcion filtrar con el valor ingresado
    console.log(e.target.value); // imprime lo que va escribiendo en el buscador 
  }
  

  const filtrar = (terminoBusqueda) => { //parametro terminoBusqueda representa la ciudad
    var resultadosBusqueda = eventosList.filter((elemento) => {
      return elemento.Ciudad.toString().toLowerCase().includes(terminoBusqueda.toLowerCase());      //.toLowerCase() convierte en minusculas   //verifica si una cadena esta dentro de otra
    });
    if (resultadosBusqueda.length > 0) { //comprueba si hay resultados despues del filtrar
      setEventos(resultadosBusqueda);//si no hay muestra de nuevos el resultado
    } else {
      mostrarMensaje("No se encontraron eventos en la ciudad buscada."); //Si no hay eventos llama a la funcion mostrarMensaje
    }
  }

  const mostrarMensaje = (mensaje) => {
    alert(mensaje);
    getEventos();
  }; 
  
  // Lo que ve el Usuario 
  return (  
    <div className="container">
        <div className='filtro'>
        <div className="containerInput">
              <input
                className="form-control inputBuscar"
                value={busqueda}
                onChange={buscadornav}
                placeholder="BUSCAR TU CIUDAD"
              />
              <button className="btn"     
                onClick={getEventos}>
                <FontAwesomeIcon icon={faSearch}/>
              </button> <br/>
              <button className='btn btn-danger' onClick={getEventos}>LISTAR</button>
            </div>
        </div>
          
        <div className="card text-center"> 
        <div className="card-header"> REGISTRO DE LOS EVENTOS </div>
          <table className="table table-striped">
            <thead>
              <tr>
                  <th scope="col">Nombre del Evento</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Hora 24</th>
                  <th scope="col">Ciudad</th>
                  <th scope="col">Lugar</th>
                  <th scope="col">Precio VIP</th>
                  <th scope="col">Cupos personas</th>
              </tr>
            </thead>

            <tbody>
            {
              eventosList.map((val, key)=>{
                  return <tr key={val.id}>
                            <th>{val.Nombre_Evento}</th>
                            <td>{val.Fecha_Evento}</td>
                            <td>{val.Hora_Evento}</td>
                            <td>{val.Ciudad}</td>
                            <td>{val.Lugar_Evento_Direccion}</td>
                            <td>{val.Precio_Entradas}</td>
                            <td>{val.Num_Boletos_Disponibles}</td>
                          </tr>
                  })
            }
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default App;