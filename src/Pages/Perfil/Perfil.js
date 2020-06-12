import React,{useState, useEffect} from 'react';
//css
import './Perfil.css';
//components
import ComponenteSubirVIdeo from '../../Components/ComponenteSubirVIdeo/ComponenteSubirVIdeo';
import ComponenteVideo from '../../Components/ComponenteVideo/ComponenteVideo';
//servicios
import Services from '../../Services/Services';

function Perfil(props){

    const [isMount, setIsMount] = useState(false)
    const [arrayUsuario, setArrayUsuario] = useState([]);
    const [arrayVideosUsuarios, setArrayVideosUIsuarios] = useState([]); 
    const [aparecerDivSubirVideo, setAparecerDivSubirVideo] = useState(false);

    useEffect( () => {
        setIsMount(true)
        funcionDatosUsuariosPerfil(window.location.href.split('/')[4]);
        funcionDatosVideosUsuario();

        return () => {
            setIsMount(false)
        }        
    },[window.location.href.split('/')[4]]);

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
            console.log(response)
            setArrayVideosUIsuarios(response.data)
        })
        .catch(err => console.log(err))
    }

    //funcion para que aparezca el componente editar
    const handleClick = () => {
        setAparecerDivSubirVideo(!aparecerDivSubirVideo);
    };

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
                    <p>0 cuscriptor</p>
                </div>

                <div className='divBotonesOpciones'>
                    <input style={{marginLeft:'47%'}} type='button' value='Editar'></input>
                    <input type='button' value='Subir video' onClick={handleClick}></input>
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
