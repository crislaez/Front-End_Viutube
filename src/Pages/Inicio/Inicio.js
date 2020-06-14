import React, {useState, useEffect} from 'react';
//css
import './Inicio.css';
//components
import ComponenteVideo from '../../Components/ComponenteVideo/ComponenteVideo';
//servicios
import Services from '../../Services/Services';

function Inicio(props){
    const [isMount, setIsMount] = useState(false);
    const [arrayVideos, setArrayVideos] = useState([]); 

    useEffect( () => {
        funcionCargarVideosRecomendados();
        setIsMount(true);
        return() => {
            setIsMount(false);
        }
    },[])

    //funcion que cargara los 4 videos de recomendados
    const funcionCargarVideosRecomendados = () => {
        Services.getAllVideo()
        .then(response => {
            console.log(response.data)
            setArrayVideos(response.data)
        })
    };

// console.log(arrayVideos)

    return(
        <section className='sectionInicio'>
            <div className='divTituloInicio'>
                <h2>Recomendados</h2>
            </div>

           <div className='contenedorInicioVideos'>
            {
                isMount && arrayVideos.toString()
                ?
                arrayVideos.map( (dato, key) => {
                    return(
                        <ComponenteVideo 
                        key={key} 
                        id_usuario={dato.id_usuario} 
                        avatar={dato.avatar} 
                        id_video={dato.id_video} 
                        video={dato.video} 
                        titulo_video={dato.titulo_video} 
                        descripcion_video={dato.descripcion_video} 
                        fecha_video={dato.fecha_video}
                        nombre_usuario={dato.nombre_usuario}
                        ></ComponenteVideo>
                    )
                })
                :
                <div>Cargando Videos...</div>
            }
           </div>
        </section>
    )
}

export default Inicio;

