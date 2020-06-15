import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './BotonesSuscripcion.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';
//servicios
import Services from '../../Services/Services';
//alerta
import swal from 'sweetalert';


function BotonesSuscripcion(props){

    const [isSuscribe, setIsSuscribe] = useState(false); //variable para saber si esta suscrito o no
    
    useEffect( () => {
        funcionCopmprobarSeguimiento(props.id_usuario);
    },[props.id_usuario])
    
    //funcion para comprobar si el usuario logueado sigue al usuario del perfil
    const funcionCopmprobarSeguimiento = (data) => {
        if(localStorage.getItem('viewinindice')){
            Services.checkFollow(data,localStorage.getItem('viewinindice'))
            .then(response => {
                console.log(response.data)
                if(response.data.toString()){
                    setIsSuscribe(true)
                }else{
                    setIsSuscribe(false)
                }
            })
            .catch(err => console.log(err))
        }      
    }

    //funcion para suscribirse
    const handleClickSUscribirse = () => {        
        if(localStorage.getItem('viewinindice')){
            // console.log(localStorage.getItem('viewinindice'))
            // console.log(props.id_usuario)
            let data = new URLSearchParams(`id_seguir=${''}&id_usuario_seguido=${props.id_usuario}&id_usuario_seguidor=${localStorage.getItem('viewinindice')}`)
            funcionSuscribirse(data)
        }else{
            swal('Oops','Debes estar logueado','error');
            props.history.push('/login');
        }
    };

    //funcion para desuscribirse
    const handleClickDesuscribirse = () => {        
        if(localStorage.getItem('viewinindice')){
            // console.log(localStorage.getItem('viewinindice'))
            // console.log(props.id_usuario)
            funcionDesuscribirse(props.id_usuario,localStorage.getItem('viewinindice'))
        }else{
            swal('Oops','Debes estar logueado','error');
            props.history.push('/login');
        }        
    };    

    //funcion que que te suscribira al canal
    const funcionSuscribirse = (data) => {
        Services.addFollow(data)
        .then(response => {
            console.log(response)
            if(response.success){
                //llamamos a la funcion que esta en app para recargar las suscripciones del aside
                const funcionConseguirUsuariosSeguidos = props.funcionConseguirUsuariosSeguidos
                funcionConseguirUsuariosSeguidos();
                setIsSuscribe(true)
            }            
        })
        .catch(err => console.log(err))
    };

    //funcion de desuscripcion
    const funcionDesuscribirse = (data, data2) => {
        Services.removeFollow(data, data2)
        .then(response => {
            console.log(response)
            if(response.success){
                //llamamos a la funcion que esta en app para recargar las suscripciones del aside
                const funcionConseguirUsuariosSeguidos = props.funcionConseguirUsuariosSeguidos
                funcionConseguirUsuariosSeguidos();
                setIsSuscribe(false);
            }            
        })
        .catch(err => console.log(err))
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

export default withRouter(BotonesSuscripcion);