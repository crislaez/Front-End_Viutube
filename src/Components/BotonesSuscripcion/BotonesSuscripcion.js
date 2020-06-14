import React,{useState, useEffect} from 'react';
//css
import './BotonesSuscripcion.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';


function BotonesSuscripcion(props){

    const [isSuscribe, setIsSuscribe] = useState(false)

        //funcion para desuscribirse
    const handleClickDesuscribirse = () => {
        setIsSuscribe(false);
        console.log('dentro')
        // console.log(arrayDatosVideo.id_usuario)
    };

    //funcion para suscribirse
    const handleClickSUscribirse = () => {
        setIsSuscribe(true)
        console.log('fuera')
        // console.log(arrayDatosVideo.id_usuario)
    };

    //funcion para las notificaciones
    const handleClickNotificacion = () => {
        console.log('Notificaciones')
    };

    return(
        <div className='sBotonSus'>
        {
                        
            isSuscribe
            ?
            <div>
                <input className='botonSuscritoPerfil' type='button' value='SUSCRITO' onClick={handleClickDesuscribirse}></input>
                <label onClick={handleClickNotificacion}><FontAwesomeIcon icon={faBell}></FontAwesomeIcon></label>
            </div>
            :
            <input className='botonSuscribirsePerfil' type='button' value='SUSCRIBIRSE' onClick={handleClickSUscribirse}></input>
        
        }
        </div>
    )
}

export default BotonesSuscripcion;