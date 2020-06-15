import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './SuscripcionesAside.css';

function SuscripcionesAside(props){

    useEffect( () => {
        //llamamos a lña funcion que esta en app para conseguir los usuarios que el usuario sigue
        const funcionConseguirUsuariosSeguidos = props.funcionConseguirUsuariosSeguidos;
        funcionConseguirUsuariosSeguidos();
        
    },[]);

    
    //funcion para redireccionar a perfil del usuario seleccionado
    const handleClick = (event) => {
        let id = event.target.dataset.codigousuario;
        props.history.push(`/perfil/${id}`);
        window.location.reload(true)
    };

    // console.log(props.arrayUsuariosSegudos)
 
    return(
        <div className='divTercero' style={{display:`${props.desaparecerParrafosAside}`}}>
            <h3>SUSCRIPCIONES</h3>
            {
                props.arrayUsuariosSegudos
                ?
                props.arrayUsuariosSegudos.map( (dato, key) =>{
                    return(
                        <div key={key} className='divSuscriocionAside'>
                            <div className='divImagenSuscripciones'>
                                <img src={dato.avatar} alt={dato.avatar} onClick={handleClick} data-codigousuario={dato.id_usuario_seguido}></img>
                            </div>
                            <p onClick={handleClick} data-codigousuario={dato.id_usuario_seguido}>{dato.nombre_usuario}</p>
                        </div>
                    )
                })
                :
                <div style={{display:'none'}}></div>
            }
        </div>
    )
}

export default withRouter(SuscripcionesAside);