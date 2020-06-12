import React,{useState, useEffect} from 'react';
//css
import './Perfil.css';
//components
import ComponenteSubirVIdeo from '../../Components/ComponenteSubirVIdeo/ComponenteSubirVIdeo';
//servicios
import Services from '../../Services/Services';

function Perfil(props){

    const [isMount, setIsMount] = useState(false)
    const [arrayUsuario, setArrayUsuario] = useState([]);
    const [aparecerDivSubirVideo, setAparecerDivSubirVideo] = useState(false);

    useEffect( () => {
        setIsMount(true)
        funcionDatosUsuariosPerfil(window.location.href.split('/')[4])

        return () => {
            setIsMount(false)
        }        
    },[window.location.href.split('/')[4]]);

    const funcionDatosUsuariosPerfil = (data) => {
        Services.getUserById(data)
        .then(response => {

            if(response.data[0].toString()){
                setArrayUsuario(response.data[0])
            }            
        })
        .catch(err => console.log(err));
    };

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
                <ComponenteSubirVIdeo handleClick={handleClick} modificarAsideContenedor={props.modificarAsideContenedor}></ComponenteSubirVIdeo>
                :
                <div style={{display:'none'}}></div>
            }

            <div className='divVIdeosPerfil'>
            </div>
        </article>
    )
}

export default Perfil;
