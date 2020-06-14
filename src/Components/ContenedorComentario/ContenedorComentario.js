import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './ContenedorComentario.css';

function ContenedorComentario(props){

    //funcion para ir al perfil del usuario
    const handleClick = (event) => {
        let idUsuario = event.target.dataset.codigousuario;
        props.history.push(`/perfil/${idUsuario}`)
    }

    return(
        <div className='divContenedorComentario' data-codigomensaje={props.id_comentario} >
            <div className='divLogoCanalVideo'>
                <img src={props.avatar} alt={props.avatar} data-codigousuario={props.id_usuario} onClick={handleClick}></img>
            </div>
            <div className='divComentario'>
                <p><strong>{props.nombre_usuario}</strong></p>
                <label>Escrito el {props.fecha_comentario}</label>
                <p className='pMensaje'>{props.texto_comentario}</p>
            </div>
        </div>
    )
}

export default withRouter(ContenedorComentario);