import React, {useState, useEffect} from 'react';
import {Link,withRouter} from 'react-router-dom';
//css
import './Header.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faSearch, faVideo, faAngleDoubleDown, faEllipsisV, faUser, faBell} from '@fortawesome/free-solid-svg-icons';
//imagen
import logo from '../../Img/LogoMakr_7dFpnR.png';
//componente
import ComponenteOpciones from '../ComponenteOpciones/ComponenteOpciones';

function Header(props){

    const [textoBuscador, setTextoBuscador] = useState('');
    const [margenLeftDivOpciones, setMargenLeftDivOpciones] = useState('');
    const [aparecerdivOpciones, setAparecerdivOpciones] = useState(false);

    // getYoutubeVideo

    useEffect( () => {
        if(props.logueado){
            setMargenLeftDivOpciones('6%');
        }else{
            setMargenLeftDivOpciones('0%');
        }
    },[props.logueado]);


    //evento del campo buscador
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(textoBuscador)
        //llamamos a la funcion que esta en app que nos buscara las videos
        const getYoutubeVideo = props.getYoutubeVideo;
        getYoutubeVideo(textoBuscador);
        //limpiamos el campo
        setTextoBuscador('');
    };

    //recargar la pagina cuando pinchemos el logo del header
    const handleClick = () => {
        props.history.push('/')
    };
    
    //se cargara el componenteOpciones o desaparecera cuando pinchemos en el logo dle usuario
    const handleClickEditar = () => {
        setAparecerdivOpciones(!aparecerdivOpciones)
    };


    return(
        <header>
            <div className='headeLeft'>
                <label onClick={props.funcionMenuAside} className='menu'><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></label>
                <div onClick={handleClick} className='divLogo'>
                    <img src={logo} alt='logo'></img>
                </div>
            </div>

            <form onSubmit={handleSubmit} action='' method=''>
                <input type='text' name='buscador' value={textoBuscador} onChange={params => setTextoBuscador(params.target.value)} placeholder='Buscar'></input>
                <button type='submit'><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
            </form>

            <div className='divOpciones' style={{marginLeft:`${margenLeftDivOpciones}`}}>
                <label style={{marginLeft:'53%'}}><FontAwesomeIcon icon={faVideo}></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faAngleDoubleDown}></FontAwesomeIcon></label>
               {
                props.logueado
                ?
                <label><FontAwesomeIcon icon={faBell}></FontAwesomeIcon></label>
                :
                <label><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon></label>
               }                
            </div>     

            {
                props.logueado
                ?
                <div className='divLogueado' onClick={handleClickEditar}>
                    <img src={props.datosUsuario.avatar} alt='logousuario'></img>
                </div>
                :
                <div className='divInicioSesion'>
                    <Link to='/login'><button type='button'><FontAwesomeIcon icon={faUser} style={{marginRight:'5%', fontSize:'20px'}}></FontAwesomeIcon>INICIAR SESION</button></Link>
                </div>
            }

            {
                aparecerdivOpciones
                ?
                <ComponenteOpciones datosUsuario={props.datosUsuario} funcionDatosUsuarioLogueado={props.funcionDatosUsuarioLogueado}></ComponenteOpciones>
                :
                <div style={{display:'none'}}></div>
            }
               
            
        </header>
    )
}

export default withRouter(Header);