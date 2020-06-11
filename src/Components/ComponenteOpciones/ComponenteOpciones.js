import React, {useState,useEffect} from 'react';
//css
import './ComponenteOpciones.css';

function ComponenteOpciones(props){

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
                <p>Tu canal</p>
                <p>Suscripciones de pago</p>
                <p>ViuTube Studio</p>
                <p>Cambio de cuenta</p>
                <p>Cerrar sesion</p>
            </div>

            <div className='opcionesCenter'>
                <p>Tema oscuro desactivado</p>
                <p>Idioma: Español</p>
                <p>Ubicacion: España</p>
                <p>Configuracion</p>
                <p>Tus datos de ViuTube</p>
                <p>Ayuda</p>
                <p>Enviar sugerencias</p>
                <p>Combinaciones de teclas</p>
            </div>

            <div className='opcionesDown'>
                <p>Modo restringido desactivado</p>
            </div>
        </div>
    )
}

export default ComponenteOpciones;