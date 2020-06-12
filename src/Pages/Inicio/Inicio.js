import React, {useState, useEffect} from 'react';
//css
import './Inicio.css';
//servicios
import Services from '../../Services/Services';

function Inicio(props){

    // const [arrayRecomendados, setArrayRecomendados] = useState([]); 
    // const [arrayTendencias, setArrayTendencias] = useState([]); 
    // const [arrayProgramacion, setArrayProgramacion] = useState([]); 
    // const [arrayDesarrolloWeb, setArrayDesarrolloWeb] = useState([]); 

    useEffect( () => {

        // funcionCargarVideosRecomendados('mouredev', setArrayRecomendados);
        // funcionCargarVideosRecomendados('eric lostie', setArrayTendencias);
        // funcionCargarVideosRecomendados('juan villalvazo', setArrayProgramacion);
        // funcionCargarVideosRecomendados('victor robles', setArrayDesarrolloWeb);
    },[])

    //funcion que cargara los 4 videos de recomendados
    const funcionCargarVideosRecomendados = (texto, setArray) => {

    };

    return(
        <section className='sectionInicio'>
           INICIO
        </section>
    )
}

export default Inicio;

