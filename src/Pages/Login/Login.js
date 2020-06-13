import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
//css
import './Login.css';
//imagen
import logo from '../../Img/LogoMakr_7dFpnR.png';
//alerta
import swal from 'sweetalert';
//encriptar clave
import encrypt from 'crypto-js/md5';
//servicios
import Services from '../../Services/Services';

function Login(props){

    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState(''); 

    useEffect( () => {
        //llamamos a la funcion que esta en app apra OCULTAR el header,aside y footer
        const funcionOcultarHAF = props.funcionOcultarHAF;
        funcionOcultarHAF();

        //llamamos a la funcion que esta en app para modificar el tamaño del contenedor
        const funcionModificarContenedorLogin = props.funcionModificarContenedorLogin;
        funcionModificarContenedorLogin();
    },[]);

    //funcion que al hacer click llama a 2 funciones que estan en app para que aparezca header,aside y footer
    const handleClick = () => {
        //llamamos a la funcion que esta en app para cambiar el tamaño del div contenedor
        const funcionMenuAside = props.funcionMenuAside;
        funcionMenuAside();

        //llamamos a la funcion que esta en app para MOSTRAR el header,aside y footer
        const funcionMostrarHAF = props.funcionMostrarHAF;
        funcionMostrarHAF();
        props.history.push('/')
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!correo){
            swal ( "Oops" ,  "Rellene el correo correctamente" ,  "error" );
        }else if(!clave){
            swal ( "Oops" ,  "Rellene la clave completo correctamente" ,  "error" );
        }else{

            let md5 = encrypt(clave);
            let data = new URLSearchParams(`correo=${correo}&clave=${JSON.stringify(md5)}`);

            Services.login(data)
            .then(response => {
                console.log()
                if(response.data[0]){
                    swal("Logueado!", "Logueado correctamente", "success");
                    //guardamos el id del usuario en el locakStorage
                    localStorage.setItem('viewinindice',response.data[0].id_usuario);
                    //guardamos el token en el localStorage
                    localStorage.setItem('viutubeToken',response.viutubeToken)
                    //llamamos a la funcion que esta arriba
                    handleClick();
                    props.history.push('/');
                }else{
                    swal ( "Oops" ,  "Error en el correo o la clave" ,  "error" );
                }
            })
            .catch(err => console.log(err))
        }
        setCorreo('');
        setClave('');
    };

    return(
        <div className='divLogin'>
            <div className='contenedorLoginCentro'>

                <div className='tituloLogin'>
                    <div>
                        <img src={logo} alt={logo}></img>
                    </div>
                </div>

               <form onSubmit={handleSubmit} action='' method='' encType=''>
                    <input type='email' name='correo' value={correo} onChange={params => setCorreo(params.target.value)} placeholder='correo...'></input>
                    <br></br>
                    <input type='password' name='clave' value={clave} onChange={params => setClave(params.target.value)} placeholder='clave...'></input>
                    <br></br>
                    <input type='submit' value='Iniciar sesion'></input>
               </form>

               <div className='divRedireccionLogin'>
                    <p>No estas registrado? <Link to='/registro' className='link'>Registrate</Link></p>
                    <p>volver a  <label className='link' onClick={handleClick}>Inicio</label></p>
               </div>
            </div>
            
        </div>
    )
}

export default withRouter(Login);