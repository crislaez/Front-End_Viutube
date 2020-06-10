import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
//css
import './Registro.css';
//imagen
import logo from '../../Img/LogoMakr_7dFpnR.png';
//alerta
import swal from 'sweetalert';
//encriptar clave
import encrypt from 'crypto-js/md5';
//servicios
import Services from '../../Services/Services';

function Registro(props){

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [nombreUsuario, setNoMbreUsuario] = useState('');
    const [fecha, setFecha] = useState('');
    const [avatar, setAvatar] = useState('');
    const [banner, setBanner] = useState('');
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState(''); 

    useEffect( () => {
        //llamamos a la funcion que esta en app apra ocuiltar el header,aside y footer
        const funcionOcultarHAF = props.funcionOcultarHAF;
        funcionOcultarHAF();

        //llamamos a la funcion que esta en app para modificar el tamaño del contenedor
        const funcionModificarContenedorLogin = props.funcionModificarContenedorLogin;
        funcionModificarContenedorLogin();
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!nombreCompleto){
            swal ( "Oops" ,  "Rellene el nombre completo correctamente" ,  "error" );
        }
        else if(!nombreUsuario){
            swal ( "Oops" ,  "Rellene el nombre de usuario correctamente" ,  "error" );
        }
        else if(!fecha){
            swal ( "Oops" ,  "Rellene la fecha correctamente" ,  "error" );
        }
        else if(!avatar){
            swal ( "Oops" ,  "Rellene el avatar correctamente" ,  "error" );
        }
        else if(!banner){
            swal ( "Oops" ,  "Rellene el banner correctamente" ,  "error" );
        }
        else if(!correo){
            swal ( "Oops" ,  "Rellene el correo correctamente" ,  "error" );
        }else if(!clave){
            swal ( "Oops" ,  "Rellene la clave correctamente" ,  "error" );
        }
        else{
            let md5 = encrypt(clave)

            let formData = new FormData();
            formData.append('nombre_completo',nombreCompleto);
            formData.append('nombre_usuario',nombreUsuario);
            formData.append('fecha',fecha);
            formData.append('avatar',avatar);
            formData.append('banner',banner);
            formData.append('correo',correo);
            formData.append('clave',JSON.stringify(md5));
   
            Services.addUser(formData)
            .then(response => {
                if(response.success){
                    swal("Registrado!", "Registrado correctamente", "success");
                    props.history.push('/login');
                }
            })
            .catch(err => console.log(err))            
        }
        
        //limpiamos los campos
        setNombreCompleto('');
        setNoMbreUsuario('');
        setFecha('');
        document.querySelector('#fileAvatar').value = '';
        document.querySelector('#fileBanner').value = ''
        setCorreo('');
        setClave('');        
    }
    
    return(
        <div className='divRegistro'>
        <div className='contenedorRegistroCentro'>

            <div className='tituloRegistro'>
                <div>
                    <img src={logo} alt={logo}></img>
                </div>
            </div>

           <form onSubmit={handleSubmit} action='' method='' encType=''>
                <input type='text' name='nombre-completo' value={nombreCompleto} onChange={params => setNombreCompleto(params.target.value)} placeholder='nombre completo...'></input>
                <br></br>
                <input type='text' name='nombre-usuario' value={nombreUsuario} onChange={params => setNoMbreUsuario(params.target.value)} placeholder='nombre usuario...'></input>
                <br></br>
                <input type='date' name='fecha' value={fecha} onChange={params => setFecha(params.target.value)} ></input>
                <br></br>
                <div className='divLabelRegistro'><label>Avatar:</label></div>
                <input id='fileAvatar' type='file' name='avatar' onChange={params => setAvatar(params.target.files[0])} ></input>
                <br></br>
                <div className='divLabelRegistro'><label>Banner:</label></div>
                <input id='fileBanner' type='file' name='banner' onChange={params => setBanner(params.target.files[0])} ></input>
                <br></br>
                <input type='email' name='correo' value={correo} onChange={params => setCorreo(params.target.value)} placeholder='correo...'></input>
                <br></br>
                <input type='password' name='clave' value={clave} onChange={params => setClave(params.target.value)} placeholder='clave...'></input>
                <br></br>
                <input type='submit' value='Registrarse'></input>
           </form>

           <div className='divRedireccionRegistro'>
                <p>Estas registrado? <Link to='/login' className='link'>Login</Link></p>
           </div>
        </div>
        
    </div>
    )
}

export default withRouter(Registro);