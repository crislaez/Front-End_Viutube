import React, {useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './ComponenteOpciones.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle, faEuroSign, faCog, faUserFriends, faSignOutAlt, faLightbulb, faLanguage, faGlobe, faCogs, faUserShield, faQuestion, faEnvelopeOpenText, faKeyboard, faArrowRight} from '@fortawesome/free-solid-svg-icons';
//alerta
import swal from 'sweetalert';


function ComponenteOpciones(props){

    //funcion para cerrar sesion
    const handleClickCerrarSesion = () => {
        swal({
            title: "Estas seguro?",
            text: "¿Seguro que quieres cerrar sesion?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
               localStorage.removeItem('viewinindice');
               localStorage.removeItem('viutubeToken');
               props.history.push('/')
               window.location.reload(true)
            }            
        });
        };

        const handleCLickIrPerfil = () => {
            //llamamos a la funcion que esta en Header para cerrar el componente
            const handleClickEditar = props.handleClickEditar
            handleClickEditar();
            props.history.push('/perfil/'+ localStorage.getItem('viewinindice'))
            window.location.reload(true)
        }

    return(
        <div className='divComponenteOpciones'>
            <div className='opcionesUsuario'>
                <div className='divLogoOpcionesUsuario'>
                    <img src={props.datosUsuario.avatar} alt='logoEditarUsuario'></img>
                </div>

                <div className='divNombreOpcionesUsuario'>
                    <p><strong>{props.datosUsuario.nombre_usuario}</strong></p>
                    <p><span>Gestiona tu cuenta de Google</span></p>
                </div>
                
            </div>

            <div className='opcionesUp'>
                <p onClick={handleCLickIrPerfil}><label><FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon></label>Tu canal</p>
                <p><label><FontAwesomeIcon icon={faEuroSign}></FontAwesomeIcon></label>Suscripciones de pago</p>
                <p><label><FontAwesomeIcon icon={faCog}></FontAwesomeIcon></label>ViuTube Studio</p>
                <p><label><FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon></label>Cambio de cuenta<label className='labelRight'><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></label></p>
                <p onClick={handleClickCerrarSesion}><label><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></label>Cerrar sesion</p>
            </div>

            <div className='opcionesCenter'>
                <p><label><FontAwesomeIcon icon={faLightbulb}></FontAwesomeIcon></label>Tema oscuro desactivado<label className='labelRight'><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></label></p>
                <p><label><FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon></label>Idioma: Español<label className='labelRight'><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></label></p>
                <p><label><FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon></label>Ubicacion: España<label className='labelRight'><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></label></p>
                <p><label><FontAwesomeIcon icon={faCogs}></FontAwesomeIcon></label>Configuracion</p>
                <p><label><FontAwesomeIcon icon={faUserShield}></FontAwesomeIcon></label>Tus datos de ViuTube</p>
                <p><label><FontAwesomeIcon icon={faQuestion}></FontAwesomeIcon></label>Ayuda</p>
                <p><label><FontAwesomeIcon icon={faEnvelopeOpenText}></FontAwesomeIcon></label>Enviar sugerencias</p>
                <p><label><FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon></label>Combinaciones de teclas</p>
            </div>

            <div className='opcionesDown'>
                <p>Modo restringido desactivado<label className='labelRight'><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></label></p>
            </div>
        </div>
    )
}

export default withRouter(ComponenteOpciones);