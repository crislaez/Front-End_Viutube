import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
//css
import './Header.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faSearch, faVideo, faAngleDoubleDown, faEllipsisV, faUser} from '@fortawesome/free-solid-svg-icons';
//imagen
import logo from '../../Img/LogoMakr_7dFpnR.png';

function Header(props){

    const [textoBuscador, setTextoBuscador] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleClick = () => {
        window.location.reload(true)
    }

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

            <div className='divOpciones'>
                <label style={{marginLeft:'53%'}}><FontAwesomeIcon icon={faVideo}></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faAngleDoubleDown}></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon></label>
            </div>

            <div className='divInicioSesion'>
                <Link to='/login'><button type='button'><FontAwesomeIcon icon={faUser} style={{marginRight:'5%', fontSize:'20px'}}></FontAwesomeIcon>INICIAR SESION</button></Link>
            </div>
        </header>
    )
}

export default Header;