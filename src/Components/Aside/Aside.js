import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
//css
import './Aside.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faFire, faHome, faPhotoVideo, faMusic, faSyncAlt, faVolleyballBall, faGamepad, faFilm, faFileVideo, faPlusCircle, faCogs, faQuestion, faFlag, faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';
import {faYoutube, faSteam} from '@fortawesome/free-brands-svg-icons'
import {faNewspaper, faLightbulb} from '@fortawesome/free-regular-svg-icons'

function Aside(props){

    return(
        <aside style={{width:`${props.modificarAsideContenedor}`}}>
            <div className='divPrimero'>
            <label><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></label><p style={{display:`${props.desaparecerParrafosAside}`}}>Pagina principal</p>
            <label><FontAwesomeIcon icon={faFire}></FontAwesomeIcon></label><p style={{display:`${props.desaparecerParrafosAside}`}}>Tendencias</p>
            <label><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></label><p style={{display:`${props.desaparecerParrafosAside}`}}>Suscripciones</p>
            </div>

            <div className='divSegundo' style={{display:`${props.desaparecerParrafosAside}`}}>
                <p><label><FontAwesomeIcon icon={faPhotoVideo}></FontAwesomeIcon></label>Biblioteca</p>
                <p><label><FontAwesomeIcon icon={faSyncAlt}></FontAwesomeIcon></label>Historial</p>
            </div>

            {
                props.logueado
                ?
                <div className='divTercero' style={{display:`${props.desaparecerParrafosAside}`}}>
                    <h3>SUSCRIPCIONES</h3>
                </div>
                :
                <div className='divTercero' style={{display:`${props.desaparecerParrafosAside}`}}>
                    <p>Inicia sesión para dar Me gusta a vídeos, 
                    añadir comentarios y suscribirte a canales.</p>
                    <div className='divInicioSesionAside'>
                        <Link to='/login'><button type='button'><FontAwesomeIcon icon={faUser} style={{marginRight:'5%', fontSize:'20px'}}></FontAwesomeIcon>INICIAR SESION</button></Link>
                    </div>                
                </div>
            }
            

            <div className='divCuarto' style={{display:`${props.desaparecerParrafosAside}`}}>
                <h3>LO MEJOR DE VIUTUBE</h3>
                <p><label><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></label>Musica</p>
                <p><label><FontAwesomeIcon icon={faVolleyballBall}></FontAwesomeIcon></label>Deportes</p>
                <p><label><FontAwesomeIcon icon={faGamepad}></FontAwesomeIcon></label>Videojuegos</p>
                <p><label><FontAwesomeIcon icon={faFilm}></FontAwesomeIcon></label>Peliculas</p>
                <p><label><FontAwesomeIcon icon={faNewspaper}></FontAwesomeIcon></label>Noticias</p>
                <p><label><FontAwesomeIcon icon={faSteam}></FontAwesomeIcon></label>En directo</p>
                <p><label><FontAwesomeIcon icon={faLightbulb}></FontAwesomeIcon></label>Aprender</p>
                <p><label><FontAwesomeIcon icon={faFileVideo}></FontAwesomeIcon></label>Video en 360</p>
            </div>

            <div className='divQuinto' style={{display:`${props.desaparecerParrafosAside}`}}>
                <p><label><FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon></label>Explorar canales</p>
            </div>

            <div className='divSexto' style={{display:`${props.desaparecerParrafosAside}`}}>
                <h3>MAS DE VITUBE</h3>
                <p><label><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></label>ViuTube Premium</p>
                <p><label><FontAwesomeIcon icon={faSteam}></FontAwesomeIcon></label>Directo</p>
            </div>

            <div className='divSeptimo' style={{display:`${props.desaparecerParrafosAside}`}}>
                <p><label><FontAwesomeIcon icon={faCogs}></FontAwesomeIcon></label>Configuracion</p>
                <p><label><FontAwesomeIcon icon={faFlag}></FontAwesomeIcon></label>Historial de denuncias</p>
                <p><label><FontAwesomeIcon icon={faQuestion}></FontAwesomeIcon></label>Ayuda</p>
                <p><label><FontAwesomeIcon icon={faEnvelopeOpenText}></FontAwesomeIcon></label>Enviar sugerencias</p>
            </div>

            <div className='divOctavo' style={{display:`${props.desaparecerParrafosAside}`}}>
                <p>InformaciónPrensaDerechos de autor Contacto Creadores Publicidad Desarrolladores</p>
                <p>Términos Privacidad Política y seguridadProbar funciones nuevas</p>
                <p>© 2020 ViuTube, una empresa de CrisLaez</p>
            </div>
        </aside>
    )
}

export default Aside;

