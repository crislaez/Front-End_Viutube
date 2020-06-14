import React,{useState, useEffect} from 'react';
//css
import './Perfil.css';
//components
import ComponenteSubirVIdeo from '../../Components/ComponenteSubirVIdeo/ComponenteSubirVIdeo';
import ComponenteVideo from '../../Components/ComponenteVideo/ComponenteVideo';
import BotonesSuscripcion from '../../Components/BotonesSuscripcion/BotonesSuscripcion';
//servicios
import Services from '../../Services/Services';
// //font awesome
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faThumbsUp, faThumbsDown, faBell} from '@fortawesome/free-solid-svg-icons';

function Perfil(props){

    const [idUsuarioPerfil, setIdUsuarioPerfil] = useState('')
    const [isMount, setIsMount] = useState(false); //si el componente esta montado
    const [arrayUsuario, setArrayUsuario] = useState([]);//muestra todos los datos del usuario del perfil
    const [arrayVideosUsuarios, setArrayVideosUIsuarios] = useState([]); //muiestra todos los videos del usuario
    const [aparecerDivSubirVideo, setAparecerDivSubirVideo] = useState(false); //variable que cargara unos componentes o otrtos, dependiendo si el usuario del perfil es el logueado

    const [perfilUsuarioEsLogueado, setPerfilUsuarioEsLogueado] = useState(false)
    // const [isSuscribe, setIsSuscribe] = useState(false)
    
    useEffect( () => {
        setIsMount(true)
        setIdUsuarioPerfil(window.location.href.split('/')[4])
        funcionDatosUsuariosPerfil(window.location.href.split('/')[4]);
        funcionDatosVideosUsuario();
        console.log(window.location.href.split('/')[4])

        //si este perfil es del usuario loguado
        if(window.location.href.split('/')[4] == localStorage.getItem('viewinindice')){
            setPerfilUsuarioEsLogueado(true);
        }else{
            setPerfilUsuarioEsLogueado(false);
        }
        console.log(idUsuarioPerfil)
        return () => {
            setIsMount(false)
        }        
    },[idUsuarioPerfil]);

    //funcion para conseguir los datos del usuario seleccionado
    const funcionDatosUsuariosPerfil = (data) => {
        Services.getUserById(data)
        .then(response => {

            if(response.data[0].toString()){
                setArrayUsuario(response.data[0])
            }            
        })
        .catch(err => console.log(err));
    };

    //funcion para conseguir todos los videos del usuario seleccionado
    const funcionDatosVideosUsuario = () => {
        Services.getVideosByIdUser(window.location.href.split('/')[4])
        .then(response => {
            // console.log(response)
            setArrayVideosUIsuarios(response.data)
        })
        .catch(err => console.log(err))
    }

    //funcion para que aparezca el componente editar
    const handleClick = () => {
        setAparecerDivSubirVideo(!aparecerDivSubirVideo);
    };

    // console.log(arrayUsuario)
    return(
        <article className='sectionPerfil'>
            <div className='divBanner'>
                <img src={arrayUsuario.banner} alt='banner'></img>
            </div>

            <div className='divMitad'>
                <div className='divImagenLogo'>
                    <img src={arrayUsuario.avatar} alt='logo'></img>
                </div>

                <div className='divNombreCanal'>
                    <h2>{arrayUsuario.nombre_usuario}</h2>
                    <p>0 suscriptor</p>
                </div>

                <div className='divBotonesOpcionesPerfil'>
                {
                    perfilUsuarioEsLogueado
                    ?
                    <div>
                        <input className='bLogueado' style={{marginLeft:'20%'}} type='button' value='Editar'></input>
                        <input className='bLogueado' type='button' value='Subir video' onClick={handleClick}></input>
                    </div>
                    :
                    <div className='divSuscripcionPerfil'>
                    
                    <BotonesSuscripcion id_usuario={arrayUsuario.id_usuario}></BotonesSuscripcion>
                    </div>
                }
                    
                </div>
            </div>

            <div className='divAbajo'>
                <input type='button' value='INICIO'></input>
                <input type='button' value='VIDEOS'></input>
                <input type='button' value='LISTA DE REPRODUCCION'></input>
                <input type='button' value='CANALES'></input>
                <input type='button' value='COMENTARIOS'></input>
                <input type='button' value='MAS INFORMACION'></input>
            </div>

            {
                aparecerDivSubirVideo
                ?
                <ComponenteSubirVIdeo handleClick={handleClick} modificarAsideContenedor={props.modificarAsideContenedor} funcionDatosVideosUsuario={funcionDatosVideosUsuario}></ComponenteSubirVIdeo>
                :
                <div style={{display:'none'}}></div>
            }

            <div className='divVIdeosPerfil'>
                {
                    isMount && arrayVideosUsuarios.toString()
                    ?
                    arrayVideosUsuarios.map( (dato, key) => {
                        return(
                            
                            <ComponenteVideo key={key} id_usuario={dato.id_usuario} id_video={dato.id_video} video={dato.video} titulo_video={dato.titulo_video} descripcion_video={dato.descripcion_video} fecha_video={dato.fecha_video}></ComponenteVideo>
                        )
                    })
                    :
                    <div>No tienes ningun video subido aun</div>
                }
            </div>
        </article>
    )
}

export default Perfil;
