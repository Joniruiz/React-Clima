
import React,{useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Header from './components/Header'
import Clima from './components/Clima'
import Error from './components/Error'


function App() {

  const[busqueda,setBusqueda] = useState({
    ciudad: "",
    pais: ""
})

  const [consultar , setConsultar] = useState(false)

  const [resultado, setResultado] = useState({})

  const [ error, setError] = useState(false)

 const {ciudad , pais} = busqueda;

 useEffect(() => {
  const consultarAPI = async () =>{
     if(consultar) {
      const appId = "36d5364e22789215d8e592bf0b7d9a02"
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json()
  
      setResultado(resultado)
      setConsultar(false)

      // Detecta si hubo  resultados correctos en la consulta 

      if(resultado.cod === "404"){
        setError(true)
      }else{
        setError(false)
      }
     }
  }
  consultarAPI();
  //eslint-disable-next-line
 },[consultar]);

 let componente;
  if(error) {
    componente = <Error mensaje = "No hay resultados" />

  }else{
    componente = <Clima resultado={resultado} />
  }
 

  return (
    <>
    <Header 
    titulo = 'clima react App'/>
    <div className = "contenedor-form">
      <div className= "container">
        <div className ="row">
          <div className = "col m6 s12">
            <Formulario
            busqueda = {busqueda}
            setBusqueda= {setBusqueda}
            setConsultar = {setConsultar} />
          </div>
          <div className = "col m6 s12">
           {componente}
          </div>
          
        </div>
        
      </div>
      
    </div>
    </>
   
  );
}

export default App;
