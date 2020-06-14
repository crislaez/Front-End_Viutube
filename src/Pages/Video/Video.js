import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './Video.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown, faBell} from '@fortawesome/free-solid-svg-icons';
//fechas
import moment from 'moment';
//servicios
import Services from '../../Services/Services';
//alerta
import swal from 'sweetalert';
//componente
import ContenedorComentario from '../../Components/ContenedorComentario/ContenedorComentario';
import BotonesSuscripcion from '../../Components/BotonesSuscripcion/BotonesSuscripcion';

function Video(props){

    const [isMount, setIsMount] = useState(false);//si el componente esta montado o no
    const [arrayDatosVideo, setArrayDatosVideos] = useState([]);//array de los videos por el id usuario
    const [arrayMensajesVideo, setArrayMensajesVideo] = useState([]);//array con todos los mensajes del video

    const [isSuscribe, setIsSuscribe] = useState(false); //variable para saber si esta suscrito o no

    const [colorLike, setColorLike] = useState('grey');//color para el like
    const [colorDisLike, setColorDislike] = useState('grey');//color para el dislike

    const [comentario, setComentario] = useState('');//variable donde se guardara el comentario

    const [isLogin, setIslogin] = useState(false)//para saber que este video es nuestro o no y que no aparezca el boton suscribirse

    useEffect( () => {
        setIsMount(true);
        funcionVideoPorId(window.location.href.split('/')[4]);
        funcionMensajesPorVIdeo(window.location.href.split('/')[4]);

        if(arrayDatosVideo.id_usuario != localStorage.getItem('viewinindice')){
            setIslogin(false);
        }else{
            setIslogin(true);
        }

        return() => {
            setIsMount(false);
        }
    },[arrayDatosVideo.id_usuario])

    //funcion para conseguir los datos dle video
    const funcionVideoPorId = (data) => {
        Services.getVideoByIdVideo(data)
        .then(response => {
            console.log(response.data[0])
            setArrayDatosVideos(response.data[0])
        })
    };

    //funcion para conseguir los mensajes del video
    const funcionMensajesPorVIdeo = (data) => {
        Services.getAllComentByIdVideo(data)
        .then(response => {
            console.log(response.data);
            setArrayMensajesVideo(response.data)
        })
        .catch(err => console.log(err));
    }

    //funcion comentar
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(!localStorage.getItem('viewinindice')){
            console.log('aqui')
            swal ( "Oops" ,  "Debes estar logueado" ,  "error" );
        }else if(!comentario){
            swal ( "Oops" ,  "Escribe un comentario" ,  "error" );
        }else{
            let now = moment().format("DD-MM-YYYY") 
            let data = new URLSearchParams(`id_comentario=${''}&id_video=${window.location.href.split('/')[4]}&id_usuario=${localStorage.getItem('viewinindice')}&fecha_comentario=${now}&texto_comentario=${comentario}`);

            Services.addComent(data)
            .then(response => {
                console.log(response)
                if(!response.success && response.message === 'debes estar logueado'){
                    swal ( "Oops" ,  "Debes estar logueado" ,  "error" );
                }else if(!response.success && response.message === 'el token no existe'){
                    swal ( "Oops" ,  "El token a expirado" ,  "error" );
                }
                else{
                    swal ( "Ok" ,  "Video subido correctamente" ,  "success" );  
                    funcionMensajesPorVIdeo(window.location.href.split('/')[4]);                 
                }  
            })
            .catch(err => console.log(err))
        }
        
        setComentario('')
    };

    //funcion que redirecciona al canal del perfil echo click
    const handleClickIrAPerfil = () => {
        props.history.push(`/perfil/${arrayDatosVideo.id_usuario}`)
    };

    //funcion like
    const funcionLike = () => {       
        if(colorLike == 'grey'){
            setColorLike('blue');
            // document.querySelector('#bLike').disabled = true;
            // document.querySelector('#bDislike').disabled = false;
        }else{
            setColorLike('grey');
            // document.querySelector('#bLike').disabled = false;
            // document.querySelector('#bDislike').disabled = true;
        }        
    };

    //funciion dislike
    const funcionDislike = () => {
        if(colorDisLike == 'grey'){
            setColorDislike('blue');
        }else{
            setColorDislike('grey');
        }
    };

    // console.log(arrayDatosVideo.id_usuario)
    // console.log(localStorage.getItem('viewinindice'))
    // console.log(isLogin)
console.log(arrayMensajesVideo)
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
                    <label onClick={funcionLike} className='likeDIslike' style={{marginLeft:'25%'}}><FontAwesomeIcon id='bLike' style={{marginRight:'1%', color:`${colorLike}`}} icon={faThumbsUp}></FontAwesomeIcon>0</label>
                    <label onClick={funcionDislike} className='likeDIslike' style={{marginLeft:'5%'}}><FontAwesomeIcon id='bDislike' style={{marginRight:'1%', color:`${colorDisLike}`}} icon={faThumbsDown}></FontAwesomeIcon>0</label>
                </div>
                
                <div className='divDatosUsuarioCanal'>
                    <div className='divDatosUsuarioVideos'>
                        <div className='divLogoCanalVideo' onClick={handleClickIrAPerfil}>
                            <img src={arrayDatosVideo.avatar}></img>
                        </div>

                        <div className='divNombreCanalVideo'>
                            <h3>{arrayDatosVideo.nombre_usuario}</h3>
                            <p>0 suscriptores</p>
                        </div>

                        {
                            isLogin
                            ?
                            <div style={{display:'none'}}></div>
                            :
                            <div className='divBotonSuscripcion'>
                            
                            <BotonesSuscripcion></BotonesSuscripcion>                           
                            </div>
                        }
                        
                    </div>

                    <div className='divDescripcionVideo'>  
                        <p>{arrayDatosVideo.descripcion_video}</p>
                    </div>
                </div>
                
                <div className='contadorComentarios'>
                    <p>0 comentarios</p>
                </div>
                
                <div className='divFormulario'>
                    <div className='divLogoCanalVideo'>
                        <img src={props.datosUsuario.avatar}></img>
                    </div>

                    <form onSubmit={handleSubmit} action='' method='' encType=''>
                        <input type='text' value={comentario} onChange={params => setComentario(params.target.value)} placeholder='Añade un comentario publico...'></input>
                        <input type='submit' value='COMENTAR'></input>
                    </form>
                </div>
                
                <div className='cajaComentarios'>
                {
                    isMount && arrayMensajesVideo.toString()
                    ?
                    arrayMensajesVideo.map( (dato, key) => {
                        return(
                             <ContenedorComentario 
                             key={key} 
                             id_comentario={dato.id_comentario} 
                             id_usuario={dato.id_usuario} 
                             avatar={dato.avatar} 
                             nombre_usuario={dato.nombre_usuario} 
                             fecha_comentario={dato.fecha_comentario} 
                             texto_comentario={dato.texto_comentario}
                             funcionMensajesPorVIdeo={funcionMensajesPorVIdeo}
                             ></ContenedorComentario>
                        )
                    })
                    :
                    <div>No hay comentarios...</div>
                }
                </div>

            </div>            

            <div className='contenedorVideoRight'>
            </div>
        </article>
    )
}

export default withRouter(Video);