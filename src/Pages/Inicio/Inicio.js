import React, {useState, useEffect} from 'react';
//css
import './Inicio.css';
//servicios
import Services from '../../Services/Services';
//components
import ComponenteRecomendado from '../../Components/ComponenteRecomendado/ComponenteRecomendado';

function Inicio(props){

    const [arrayRecomendados, setArrayRecomendados] = useState([]); 
    const [arrayTendencias, setArrayTendencias] = useState([]); 
    const [arrayProgramacion, setArrayProgramacion] = useState([]); 
    const [arrayDesarrolloWeb, setArrayDesarrolloWeb] = useState([]); 

    useEffect( () => {

        funcionCargarVideosRecomendados('mouredev', setArrayRecomendados);
        funcionCargarVideosRecomendados('eric lostie', setArrayTendencias);
        funcionCargarVideosRecomendados('juan villalvazo', setArrayProgramacion);
        funcionCargarVideosRecomendados('victor robles', setArrayDesarrolloWeb);
    },[])

    //funcion que cargara los 4 videos de recomendados
    const funcionCargarVideosRecomendados = (texto, setArray) => {
        Services.getVideoInicio(texto)
        .then(response => {
            console.log(response)
            if(response.items){
                console.log(response.items)
                setArray(response.items)
            }
            
        })
    };

    return(
        <section className='sectionInicio'>

           <ComponenteRecomendado titulo='Recomendados' arrayRecomendados={arrayRecomendados}></ComponenteRecomendado>

           

        </section>
    )
}

export default Inicio;

// <ComponenteRecomendado titulo='Tendencias' arrayRecomendados={arrayTendencias}></ComponenteRecomendado>

// <ComponenteRecomendado titulo='Programacion' arrayRecomendados={arrayProgramacion}></ComponenteRecomendado>

// <ComponenteRecomendado titulo='Desarrollo web' arrayRecomendados={arrayDesarrolloWeb}></ComponenteRecomendado>