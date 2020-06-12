import React, {useState, useEffect} from 'react';
//css
import './Video.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown, faBell} from '@fortawesome/free-solid-svg-icons';

//servicios
import Services from '../../Services/Services';

function Video(props){

    const [isMount, setIsMount] = useState(false);
    const [arrayDatosVideo, setArrayDatosVideos] = useState([]);
    const [isSuscribe, setIsSuscribe] = useState(true);


    useEffect( () => {
        setIsMount(true);
        funcionVideoPorId(window.location.href.split('/')[4]);

        return() => {
            setIsMount(false);
        }
    },[window.location.href.split('/')[4]])

    const funcionVideoPorId = (data) => {
        Services.getVideoByIdVideo(data)
        .then(response => {
            console.log(response.data[0])
            setArrayDatosVideos(response.data[0])
        })
    }

    // console.log(setArrayDatosVideos.video)

    return(
        <article className='sectionVideo'>
            <div className='contenedorVideoLeft'>
                <div className='divCajaVideo'>
                    <video src={arrayDatosVideo.video} controls ></video>
                </div>

                <div className='divTituloVideo'>
                    <h2>{arrayDatosVideo.titulo_video}</h2>
                </div>

                <div className='divDatosVideo'>
                    <label>0 visualizaciones</label>
                    <label style={{marginLeft:'5%'}}>publicado: {arrayDatosVideo.fecha_video}</label>
                    <label className='likeDIslike' style={{marginLeft:'25%'}}><FontAwesomeIcon style={{marginRight:'1%'}} icon={faThumbsUp}></FontAwesomeIcon>0</label>
                    <label className='likeDIslike' style={{marginLeft:'5%'}}><FontAwesomeIcon style={{marginRight:'1%'}} icon={faThumbsDown}></FontAwesomeIcon>0</label>
                </div>
                
                <div className='divDatosUsuarioCanal'>
                    <div className='divDatosUsuarioVideos'>
                        <div className='divLogoCanalVideo'>
                            <img src={arrayDatosVideo.avatar}></img>
                        </div>

                        <div className='divNombreCanalVideo'>
                            <h3>{arrayDatosVideo.nombre_usuario}</h3>
                            <p>0 suscriptores</p>
                        </div>

                        <div className='divBotonSuscripcion'>
                            {
                                isSuscribe
                                ?
                                <div>
                                    <input className='botonSUscrito' type='button' value='SUSCRITO'></input>
                                    <label><FontAwesomeIcon icon={faBell}></FontAwesomeIcon></label>
                                </div>
                                :
                                <input className='botonSuscribirse' type='button' value='SUSCRIBIRSE'></input>
                            }                            
                        </div>
                    </div>

                    <div className='divDescripcionVideo'>  
                        <p>{arrayDatosVideo.descripcion_video}</p>
                    </div>
                </div>

            </div>

            

            <div className='contenedorVideoRight'>
            </div>
        </article>
    )
}

export default Video;