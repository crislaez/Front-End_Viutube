import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './Buscador.css';
//servicios
import Services from '../../Services/Services';


function Buscador(props){

    const [isMount, setIsMount] = useState(false);
    const [arrayVideosUsuarioBuscado, setArrayVideosUsuarioBuscado] = useState([]);

    
    useEffect( () => {
        setIsMount(true);
        
        funcionGetYoutubeVideo(window.location.href.split('/')[4])
        return()=> {
            setIsMount(false);
        }
    },[props.arrayDatosBuscador])

    //funcion para cargar los videos del nombre buscado
    const funcionGetYoutubeVideo = (data) => {
        console.log(data);
        Services.getUserByUserName(data)
        .then(response => {
            console.log(response.data[0].id_usuario);
            return Services.getVideosByIdUser(response.data[0].id_usuario)
        })
        .then(response => {
            console.log(response.data)
            setArrayVideosUsuarioBuscado(response.data)
        })
        .catch(err => {console.log(err)});
    };

    const handleClick = (event) => {
        let id = event.target.dataset.codigovideo;
        props.history.push(`/video/${id}`)
    };

    const handleCkickPerfil = (event) => {
        console.log(event.target.dataset.codigousuario);
        let id = event.target.dataset.codigousuario
        props.history.push(`/perfil/${id}`);
        window.location.reload(true)
    }
        
    return(
        <article className='articleBuscador'>
            <div className='ditTituloBuscador'>
                <h2>Videos</h2>
            </div>

            {
                isMount && arrayVideosUsuarioBuscado.toString()
                ?
                arrayVideosUsuarioBuscado.map( (dato, key) => {
                    return(
                        <div key={key} className='divVideoBuscador'>
                            <div className='contenedorVideoBuscador'>
                                <video data-codigovideo={dato.id_video} src={dato.video} onClick={handleClick}></video>
                            </div>
                            <div className='divDerecha'>
                                <p className='pTituloBuscador'>{dato.titulo_video}</p>
                                <p className='pNombreUsuarioBuscador' data-codigousuario={dato.id_usuario} onClick={handleCkickPerfil}>{dato.nombre_usuario}</p>
                                <p className='pFechaBuscador'>{dato.fecha_video}</p>
                                <p className='pDescripcionVideo'>{dato.descripcion_video}</p>
                            </div>
                        </div>
                    )
                })
                :
                <div>No se ha encontrado nada</div>
            }
        </article>
    )
}
   
export default withRouter(Buscador);